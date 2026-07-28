// Self-contained ES5 script wired via Now.include() in rest_api.now.ts -- NOT a `script:`
// function reference. Any function reference the Fluent SDK binds to a REST route gets wrapped
// in generated glue code (`const { name } = require(...)` for a named export, or
// `const name = require(...).default` for a default export) to link the separately-bundled
// module at runtime. Both forms use ES6 syntax (destructuring, or a reserved word after a dot)
// that this instance's script engine rejects -- this app's scope is "global", where the
// ECMAScript 2021 engine mode isn't available (scoped apps only; confirmed via ServiceNow's own
// docs and community). So this script is fully self-contained: no requires, no imports, no
// exports, pure ES5.1 (no let/const, arrow functions, template literals, destructuring, for-of,
// classes, default params, or post-ES5 Array/String methods).
//
// This duplicates logic also in agendaService.ts/slotEngine.ts/tables.ts (kept as TS for local
// testing via the Node simulation harness) -- book-slot.server.js has its own copy of the same
// shared pieces for the same reason: neither can require() the other at runtime here.
;(function () {
    var ALLOWED_HR_CASE_TABLES = [
        'sn_hr_core_case',
        'sn_hr_core_case_payroll',
        'sn_hr_core_case_workforce_admin',
        'sn_hr_core_case_talent_management',
        'sn_hr_core_case_operations',
        'sn_hr_core_case_total_rewards',
    ]

    function isAllowedHrCaseTable(tableName) {
        return !!tableName && ALLOWED_HR_CASE_TABLES.indexOf(tableName) !== -1
    }

    var DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    function padTwo(n) {
        return n < 10 ? '0' + n : String(n)
    }

    function formatDate(date) {
        return date.getFullYear() + '-' + padTwo(date.getMonth() + 1) + '-' + padTwo(date.getDate())
    }

    function addDays(date, amount) {
        var result = new Date(date.getTime())
        result.setDate(result.getDate() + amount)
        return result
    }

    function dayOfWeekName(date) {
        return DAY_NAMES[date.getDay()]
    }

    function timeToMinutes(time) {
        var parts = time.split(':')
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
    }

    function minutesToTime(minutes) {
        var h = Math.floor(minutes / 60)
        var m = minutes % 60
        return padTwo(h) + ':' + padTwo(m) + ':00'
    }

    function buildSlotsForWindow(startTime, endTime, durationMinutes) {
        var slots = []
        var cursor = timeToMinutes(startTime)
        var end = timeToMinutes(endTime)
        while (cursor + durationMinutes <= end) {
            slots.push({ start: minutesToTime(cursor), end: minutesToTime(cursor + durationMinutes) })
            cursor += durationMinutes
        }
        return slots
    }

    function slotKey(date, start, end) {
        return date + '|' + start + '|' + end
    }

    var AVAILABILITY_TABLE = 'u_hr_mtg_availability'
    var APPOINTMENT_TABLE = 'u_hr_mtg_appointment'
    var CONFIG_TABLE = 'u_hr_mtg_config'
    var SCHEDULE_SPAN_TABLE = 'cmn_schedule_span'

    var SLOT_DURATION_MINUTES = parseInt(gs.getProperty('u_hr_mtg.slot_duration_minutes', '30'), 10) || 30
    var AGENDA_WINDOW_DAYS = 90

    var EXCLUDED_CASE_STATE_KEYWORDS = ['cancel', 'closed', 'resolved']
    var AGENT_ROLES = ['sn_hr_core.basic', 'global.hr_mtg_admin']
    var EMPLOYEE_ROLES = ['sn_hr_sp.hrsp_employee']

    var REPEAT_TYPE_DAYS = {
        weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        weekends: ['saturday', 'sunday'],
        daily: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        weekMWF: ['monday', 'wednesday', 'friday'],
        weekTT: ['tuesday', 'thursday'],
    }

    function isCaseStateExcluded(stateLabel) {
        var normalized = (stateLabel || '').toLowerCase()
        var excluded = false
        EXCLUDED_CASE_STATE_KEYWORDS.forEach(function (needle) {
            if (normalized.indexOf(needle) !== -1) excluded = true
        })
        return excluded
    }

    function hasAgentAccess() {
        var has = false
        AGENT_ROLES.forEach(function (role) {
            if (gs.hasRole(role)) has = true
        })
        return has
    }

    function hasEmployeeAccess() {
        var has = false
        EMPLOYEE_ROLES.forEach(function (role) {
            if (gs.hasRole(role)) has = true
        })
        return has
    }

    function canAccessCase(caseGr, userId) {
        if (hasAgentAccess()) return true
        if (hasEmployeeAccess()) {
            var requesterForEmployee = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
            if (requesterForEmployee === userId) return true
        }
        var assignedTo = caseGr.getValue('assigned_to')
        if (assignedTo === userId) return true
        var requester = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
        return requester === userId
    }

    function findActiveAppointment(caseId) {
        var gr = new GlideRecord(APPOINTMENT_TABLE)
        gr.addQuery('hr_case', caseId)
        gr.addQuery('status', 'booked')
        gr.setLimit(1)
        gr.query()
        if (!gr.next()) return null
        return {
            sysId: gr.getUniqueValue(),
            date: gr.getValue('date'),
            start: gr.getValue('start_time'),
            end: gr.getValue('end_time'),
            meetingType: gr.getValue('meeting_type'),
            status: gr.getValue('status'),
        }
    }

    function extractTime(dateTimeStr) {
        if (!dateTimeStr) return ''
        var parts = dateTimeStr.split(' ')
        return parts.length > 1 ? parts[1] : dateTimeStr
    }

    // Reads the single u_hr_mtg_config record's default_schedule_span (mandatory, and filtered
    // on the form to schedule=default_schedule AND show_as=free) and expands it into recurring
    // windows. availability_source is checked first: "outlook" is a reserved placeholder for a
    // future integration and isn't implemented yet, so it currently yields no windows (safer
    // than silently falling through to the schedule) rather than "schedule".
    //
    // The re-checks of show_as/schedule below are defensive: the reference qualifier on the
    // form only constrains what a user can newly pick in the UI, it does not stop a script or
    // direct API call from writing a non-conforming value, so this does not trust the stored
    // reference blindly.
    function getDefaultAvailabilityWindows() {
        var configGr = new GlideRecord(CONFIG_TABLE)
        configGr.setLimit(1)
        configGr.query()
        if (!configGr.next()) return []

        var source = configGr.getValue('availability_source') || 'schedule'
        if (source !== 'schedule') return []

        var spanId = configGr.getValue('default_schedule_span')
        if (!spanId) return []
        var scheduleId = configGr.getValue('default_schedule')

        var spanGr = new GlideRecord(SCHEDULE_SPAN_TABLE)
        if (!spanGr.get(spanId)) return []
        if (spanGr.getValue('show_as') !== 'free') return []
        if (scheduleId && spanGr.getValue('schedule') !== scheduleId) return []

        var repeatType = spanGr.getValue('repeat_type') || ''
        var startTime = extractTime(spanGr.getValue('start_date_time') || spanGr.getValue('start') || '')
        var endTime = extractTime(spanGr.getValue('end_date_time') || spanGr.getValue('end') || '')
        if (!startTime || !endTime) return []

        var windows = []
        var days = REPEAT_TYPE_DAYS[repeatType]
        if (days) {
            days.forEach(function (day) {
                windows.push({ dayOfWeek: day, start: startTime, end: endTime })
            })
        } else if (repeatType === 'weekly') {
            var daysOfWeek = spanGr.getValue('days_of_week') || ''
            var dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            for (var i = 0; i < daysOfWeek.length; i++) {
                var digit = parseInt(daysOfWeek.charAt(i), 10)
                if (digit >= 1 && digit <= 7) {
                    windows.push({ dayOfWeek: dayNames[digit - 1], start: startTime, end: endTime })
                }
            }
        }
        return windows
    }

    function buildAgendaDays(agentId) {
        var today = new Date()
        var rangeStart = formatDate(today)
        var rangeEnd = formatDate(addDays(today, AGENDA_WINDOW_DAYS - 1))

        var bookedKeys = {}
        var bookedGr = new GlideRecord(APPOINTMENT_TABLE)
        bookedGr.addQuery('hr_agent', agentId)
        bookedGr.addQuery('status', 'booked')
        bookedGr.addQuery('date', '>=', rangeStart)
        bookedGr.addQuery('date', '<=', rangeEnd)
        bookedGr.query()
        while (bookedGr.next()) {
            bookedKeys[slotKey(bookedGr.getValue('date'), bookedGr.getValue('start_time'), bookedGr.getValue('end_time'))] = true
        }

        var recurringWindows = []
        var oneOffWindows = {}

        var availGr = new GlideRecord(AVAILABILITY_TABLE)
        availGr.addQuery('agent', agentId)
        availGr.addActiveQuery()
        availGr.query()

        var hasExplicitAvailability = false
        while (availGr.next()) {
            hasExplicitAvailability = true
            var start = availGr.getValue('start_time')
            var end = availGr.getValue('end_time')
            var recurringValue = String(availGr.getValue('recurring'))
            if (recurringValue === 'true' || recurringValue === '1') {
                recurringWindows.push({ dayOfWeek: availGr.getValue('day_of_week'), start: start, end: end })
            } else {
                var date = availGr.getValue('date')
                if (!date) continue
                var list = oneOffWindows[date] || []
                list.push({ start: start, end: end })
                oneOffWindows[date] = list
            }
        }

        if (!hasExplicitAvailability) {
            getDefaultAvailabilityWindows().forEach(function (w) {
                recurringWindows.push(w)
            })
        }

        var days = []
        for (var i = 0; i < AGENDA_WINDOW_DAYS; i++) {
            var day = addDays(today, i)
            var dateStr = formatDate(day)
            var dow = dayOfWeekName(day)

            var windows = recurringWindows
                .filter(function (w) {
                    return w.dayOfWeek === dow
                })
                .map(function (w) {
                    return { start: w.start, end: w.end }
                })
                .concat(oneOffWindows[dateStr] || [])

            var slotMap = {}
            var slotOrder = []
            windows.forEach(function (window) {
                buildSlotsForWindow(window.start, window.end, SLOT_DURATION_MINUTES).forEach(function (slot) {
                    var key = slotKey(dateStr, slot.start, slot.end)
                    if (!slotMap[key]) {
                        slotMap[key] = { start: slot.start, end: slot.end, available: !bookedKeys[key] }
                        slotOrder.push(key)
                    }
                })
            })

            var slots = slotOrder
                .map(function (key) {
                    return slotMap[key]
                })
                .sort(function (a, b) {
                    return a.start < b.start ? -1 : 1
                })
            var hasAvailability = false
            slots.forEach(function (s) {
                if (s.available) hasAvailability = true
            })
            days.push({ date: dateStr, hasAvailability: hasAvailability, slots: slots })
        }

        return days
    }

    function getAgendaForCase(tableName, caseId, userId) {
        if (!isAllowedHrCaseTable(tableName)) {
            return { eligible: false, reason: 'invalid_table' }
        }

        var caseGr = new GlideRecord(tableName)
        if (!caseGr.get(caseId)) {
            return { eligible: false, reason: 'case_not_found' }
        }
        if (!canAccessCase(caseGr, userId)) {
            return { eligible: false, reason: 'not_authorized' }
        }

        var agentId = caseGr.getValue('assigned_to')
        var stateLabel = caseGr.getDisplayValue('state')

        if (!agentId) {
            return { eligible: false, reason: 'no_agent_assigned' }
        }
        if (isCaseStateExcluded(stateLabel)) {
            return { eligible: false, reason: 'case_closed' }
        }

        var agentGr = new GlideRecord('sys_user')
        var agentName = agentGr.get(agentId) ? agentGr.getDisplayValue('name') : ''

        return {
            eligible: true,
            agent: { sysId: agentId, name: agentName },
            existingAppointment: findActiveAppointment(caseId),
            days: buildAgendaDays(agentId),
        }
    }

    function statusForReason(reason) {
        if (reason === 'invalid_table') return 400
        if (reason === 'case_not_found') return 404
        if (reason === 'not_authorized') return 403
        if (reason === 'invalid_slot' || reason === 'slot_unavailable' || reason === 'case_not_eligible') return 409
        return 200
    }

    try {
        var table = request.pathParams.table
        var caseId = request.pathParams.case_id
        var result = getAgendaForCase(table, caseId, gs.getUserID())
        if (!result.eligible) {
            response.setStatus(statusForReason(result.reason))
        }
        response.setBody(result)
    } catch (e) {
        gs.error('HR Agent Agenda getAgenda error: ' + (e.message || e))
        response.setStatus(500)
        response.setBody({ eligible: false, reason: 'server_error', message: String(e.message || e) })
    }
})()
