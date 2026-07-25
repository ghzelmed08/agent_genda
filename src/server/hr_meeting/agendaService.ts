import { gs, GlideRecord } from '@servicenow/glide'
import { addDays, buildSlotsForWindow, dayOfWeekName, formatDate, slotKey, TimeSlot } from './slotEngine'
import { isAllowedHrCaseTable } from './tables'

const AVAILABILITY_TABLE = 'u_hr_mtg_availability'
const APPOINTMENT_TABLE = 'u_hr_mtg_appointment'
const CONFIG_TABLE = 'u_hr_mtg_config'
const SCHEDULE_SPAN_TABLE = 'cmn_schedule_span'

const SLOT_DURATION_MINUTES = 30
const AGENDA_WINDOW_DAYS = 90
const DEFAULT_MEETING_TYPE = 'in_person'

const EXCLUDED_CASE_STATE_KEYWORDS = ['cancel', 'closed', 'resolved']

const AGENT_ROLES = ['global.hr_mtg_agent', 'global.hr_mtg_admin']
const EMPLOYEE_ROLES = ['sn_hr_sp.hrsp_employee']

/** Maps cmn_schedule_span repeat_type values to corresponding day-of-week names. */
const REPEAT_TYPE_DAYS: Record<string, string[]> = {
    weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    weekends: ['saturday', 'sunday'],
    daily: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    weekMWF: ['monday', 'wednesday', 'friday'],
    weekTT: ['tuesday', 'thursday'],
}

export interface DaySlot extends TimeSlot {
    available: boolean
}

export interface DaySlots {
    date: string
    hasAvailability: boolean
    slots: DaySlot[]
}

export interface AppointmentSummary {
    sysId: string
    date: string
    start: string
    end: string
    meetingType: string
    status: string
}

export interface AgendaResult {
    eligible: boolean
    reason?: string
    agent?: { sysId: string; name: string }
    existingAppointment?: AppointmentSummary | null
    days?: DaySlots[]
}

export interface BookResult {
    success: boolean
    reason?: string
    appointment?: AppointmentSummary
}

function isCaseStateExcluded(stateLabel: string): boolean {
    const normalized = (stateLabel || '').toLowerCase()
    return EXCLUDED_CASE_STATE_KEYWORDS.some((needle) => normalized.indexOf(needle) !== -1)
}

function hasAgentAccess(): boolean {
    return AGENT_ROLES.some((role) => gs.hasRole(role))
}

function hasEmployeeAccess(): boolean {
    return EMPLOYEE_ROLES.some((role) => gs.hasRole(role))
}

// Only the employee the case is for, the assigned agent, or users with hr_mtg/hr_sp roles may view/book against a case.
function canAccessCase(caseGr: GlideRecord<string>, userId: string): boolean {
    if (hasAgentAccess()) return true
    if (hasEmployeeAccess()) {
        const requester = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
        if (requester === userId) return true
    }
    // Also allow the assigned agent to view the agenda for their case
    const assignedTo = caseGr.getValue('assigned_to')
    if (assignedTo === userId) return true
    // Fallback: check opened_for/caller_id directly
    const requester = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
    return requester === userId
}

function findActiveAppointment(caseId: string): AppointmentSummary | null {
    const gr = new GlideRecord(APPOINTMENT_TABLE)
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

/**
 * Extracts the time portion (HH:mm:ss) from a datetime string like "2000-01-03 09:00:00".
 * Falls back to the raw value if no space is found.
 */
function extractTime(dateTimeStr: string): string {
    if (!dateTimeStr) return ''
    const parts = dateTimeStr.split(' ')
    return parts.length > 1 ? parts[1] : dateTimeStr
}

/**
 * Retrieves the default schedule sys_id from the application configuration table.
 * Returns null if no configuration exists or default_schedule is empty.
 */
function getDefaultScheduleSysId(): string | null {
    const configGr = new GlideRecord(CONFIG_TABLE)
    configGr.setLimit(1)
    configGr.query()
    if (!configGr.next()) return null
    const scheduleSysId = configGr.getValue('default_schedule')
    return scheduleSysId || null
}

/**
 * Loads cmn_schedule_span entries for the given schedule and converts them into
 * recurring availability windows compatible with the existing slot-building logic.
 * Only considers spans where show_as != 'busy' (i.e. free or tentative represent availability).
 */
function getScheduleWindows(scheduleSysId: string): { dayOfWeek: string; start: string; end: string }[] {
    const windows: { dayOfWeek: string; start: string; end: string }[] = []

    const spanGr = new GlideRecord(SCHEDULE_SPAN_TABLE)
    spanGr.addQuery('schedule', scheduleSysId)
    spanGr.query()

    while (spanGr.next()) {
        const showAs = spanGr.getValue('show_as') || ''
        // Skip spans marked as busy — we only use free/tentative as available windows
        if (showAs === 'busy') continue

        const repeatType = spanGr.getValue('repeat_type') || ''
        const startTime = extractTime(spanGr.getValue('start_date_time') || spanGr.getValue('start') || '')
        const endTime = extractTime(spanGr.getValue('end_date_time') || spanGr.getValue('end') || '')

        if (!startTime || !endTime) continue

        // Determine which days this span applies to
        const days = REPEAT_TYPE_DAYS[repeatType]
        if (days) {
            // Standard repeat types: map to known day sets
            for (const day of days) {
                windows.push({ dayOfWeek: day, start: startTime, end: endTime })
            }
        } else if (repeatType === 'weekly') {
            // Weekly repeat: uses days_of_week field (concatenated digits 1=Mon..7=Sun)
            const daysOfWeek = spanGr.getValue('days_of_week') || ''
            const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            for (let i = 0; i < daysOfWeek.length; i++) {
                const digit = parseInt(daysOfWeek.charAt(i), 10)
                if (digit >= 1 && digit <= 7) {
                    windows.push({ dayOfWeek: dayNames[digit - 1], start: startTime, end: endTime })
                }
            }
        }
        // Other repeat types (monthly, yearly, specific) are ignored for agenda purposes
    }

    return windows
}

function buildAgendaDays(agentId: string): DaySlots[] {
    const today = new Date()
    const rangeStart = formatDate(today)
    const rangeEnd = formatDate(addDays(today, AGENDA_WINDOW_DAYS - 1))

    const bookedKeys = new Set<string>()
    const bookedGr = new GlideRecord(APPOINTMENT_TABLE)
    bookedGr.addQuery('hr_agent', agentId)
    bookedGr.addQuery('status', 'booked')
    bookedGr.addQuery('date', '>=', rangeStart)
    bookedGr.addQuery('date', '<=', rangeEnd)
    bookedGr.query()
    while (bookedGr.next()) {
        bookedKeys.add(slotKey(bookedGr.getValue('date'), bookedGr.getValue('start_time'), bookedGr.getValue('end_time')))
    }

    const recurringWindows: { dayOfWeek: string; start: string; end: string }[] = []
    const oneOffWindows = new Map<string, TimeSlot[]>()

    const availGr = new GlideRecord(AVAILABILITY_TABLE)
    availGr.addQuery('agent', agentId)
    availGr.addActiveQuery()
    availGr.query()

    let hasExplicitAvailability = false
    while (availGr.next()) {
        hasExplicitAvailability = true
        const start = availGr.getValue('start_time')
        const end = availGr.getValue('end_time')
        const recurringValue = String(availGr.getValue('recurring'))
        if (recurringValue === 'true' || recurringValue === '1') {
            recurringWindows.push({ dayOfWeek: availGr.getValue('day_of_week'), start, end })
        } else {
            const date = availGr.getValue('date')
            if (!date) continue
            const list = oneOffWindows.get(date) || []
            list.push({ start, end })
            oneOffWindows.set(date, list)
        }
    }

    // Fallback: if no explicit availability records exist, use the default schedule
    if (!hasExplicitAvailability) {
        const scheduleSysId = getDefaultScheduleSysId()
        if (scheduleSysId) {
            const scheduleWindows = getScheduleWindows(scheduleSysId)
            for (const w of scheduleWindows) {
                recurringWindows.push(w)
            }
        }
    }

    const days: DaySlots[] = []
    for (let i = 0; i < AGENDA_WINDOW_DAYS; i++) {
        const day = addDays(today, i)
        const dateStr = formatDate(day)
        const dow = dayOfWeekName(day)

        const windows: TimeSlot[] = recurringWindows
            .filter((w) => w.dayOfWeek === dow)
            .map((w) => ({ start: w.start, end: w.end }))
            .concat(oneOffWindows.get(dateStr) || [])

        const slotMap = new Map<string, DaySlot>()
        windows.forEach((window) => {
            buildSlotsForWindow(window.start, window.end, SLOT_DURATION_MINUTES).forEach((slot) => {
                const key = slotKey(dateStr, slot.start, slot.end)
                if (!slotMap.has(key)) {
                    slotMap.set(key, { start: slot.start, end: slot.end, available: !bookedKeys.has(key) })
                }
            })
        })

        const slots = Array.from(slotMap.values()).sort((a, b) => (a.start < b.start ? -1 : 1))
        days.push({ date: dateStr, hasAvailability: slots.some((s) => s.available), slots })
    }

    return days
}

export function getAgendaForCase(tableName: string, caseId: string, userId: string): AgendaResult {
    if (!isAllowedHrCaseTable(tableName)) {
        return { eligible: false, reason: 'invalid_table' }
    }

    const caseGr = new GlideRecord(tableName)
    if (!caseGr.get(caseId)) {
        return { eligible: false, reason: 'case_not_found' }
    }
    if (!canAccessCase(caseGr, userId)) {
        return { eligible: false, reason: 'not_authorized' }
    }

    const agentId = caseGr.getValue('assigned_to')
    const stateLabel = caseGr.getDisplayValue('state')

    if (!agentId) {
        return { eligible: false, reason: 'no_agent_assigned' }
    }
    if (isCaseStateExcluded(stateLabel)) {
        return { eligible: false, reason: 'case_closed' }
    }

    const agentGr = new GlideRecord('sys_user')
    const agentName = agentGr.get(agentId) ? agentGr.getDisplayValue('name') : ''

    return {
        eligible: true,
        agent: { sysId: agentId, name: agentName },
        existingAppointment: findActiveAppointment(caseId),
        days: buildAgendaDays(agentId),
    }
}

export function bookSlotForCase(
    tableName: string,
    caseId: string,
    userId: string,
    date: string,
    start: string,
    end: string,
    meetingType?: string
): BookResult {
    if (!isAllowedHrCaseTable(tableName)) {
        return { success: false, reason: 'invalid_table' }
    }
    if (!date || !start || !end) {
        return { success: false, reason: 'invalid_slot' }
    }

    const caseGr = new GlideRecord(tableName)
    if (!caseGr.get(caseId)) {
        return { success: false, reason: 'case_not_found' }
    }
    if (!canAccessCase(caseGr, userId)) {
        return { success: false, reason: 'not_authorized' }
    }

    const agentId = caseGr.getValue('assigned_to')
    const stateLabel = caseGr.getDisplayValue('state')
    if (!agentId || isCaseStateExcluded(stateLabel)) {
        return { success: false, reason: 'case_not_eligible' }
    }

    const days = buildAgendaDays(agentId)
    const day = days.find((d) => d.date === date)
    const slot = day && day.slots.find((s) => s.start === start && s.end === end)
    if (!slot || !slot.available) {
        return { success: false, reason: 'slot_unavailable' }
    }

    const employeeId = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
    const resolvedMeetingType = meetingType || DEFAULT_MEETING_TYPE

    const existing = new GlideRecord(APPOINTMENT_TABLE)
    existing.addQuery('hr_case', caseId)
    existing.addQuery('status', 'booked')
    existing.query()
    while (existing.next()) {
        existing.setValue('status', 'cancelled')
        existing.setValue('cancellation_reason', 'Rescheduled by employee')
        existing.update()
    }

    const appt = new GlideRecord(APPOINTMENT_TABLE)
    appt.initialize()
    appt.setValue('hr_case', caseId)
    appt.setValue('employee', employeeId)
    appt.setValue('hr_agent', agentId)
    appt.setValue('date', date)
    appt.setValue('start_time', start)
    appt.setValue('end_time', end)
    appt.setValue('meeting_type', resolvedMeetingType)
    appt.setValue('status', 'booked')
    const sysId = appt.insert()

    return {
        success: true,
        appointment: {
            sysId: sysId || '',
            date,
            start,
            end,
            meetingType: resolvedMeetingType,
            status: 'booked',
        },
    }
}
