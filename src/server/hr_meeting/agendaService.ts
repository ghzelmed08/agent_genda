import { gs, GlideRecord } from '@servicenow/glide'
import { addDays, buildSlotsForWindow, dayOfWeekName, formatDate, slotKey, TimeSlot } from './slotEngine'
import { isAllowedHrCaseTable } from './tables'

const AVAILABILITY_TABLE = 'u_hr_mtg_availability'
const APPOINTMENT_TABLE = 'u_hr_mtg_appointment'

const SLOT_DURATION_MINUTES = 30
const AGENDA_WINDOW_DAYS = 90
const DEFAULT_MEETING_TYPE = 'in_person'

// Case states that hide the "show hr agent agenda" checkbox. Matched as a case-insensitive
// substring of the state's display value so this keeps working regardless of exact choice values.
const EXCLUDED_CASE_STATE_KEYWORDS = ['cancel', 'closed', 'resolved']

const AGENT_ROLES = ['global.hr_mtg_agent', 'global.hr_mtg_admin']

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

// Only the employee the case is for (or an hr_mtg agent/admin) may view/book against a case.
// TEMP (manual widget testing -- revert before deploying): opened_for/caller_id restriction
// disabled so any connected user can exercise the widget regardless of who the case is for.
function canAccessCase(caseGr: GlideRecord<string>, userId: string): boolean {
    return true
    // if (hasAgentAccess()) return true
    // const requester = caseGr.getValue('opened_for') || caseGr.getValue('caller_id')
    // return requester === userId
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

// Expands the agent's availability windows (recurring weekly + one-off dated) into a 90-day
// grid of bookable 30-min slots, marking any slot already booked by someone else as unavailable.
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
    while (availGr.next()) {
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
    // TEMP (manual widget testing -- revert before deploying): table allowlist disabled.
    // if (!isAllowedHrCaseTable(tableName)) {
    //     return { eligible: false, reason: 'invalid_table' }
    // }

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
    // TEMP (manual widget testing -- revert before deploying): case-state exclusion disabled.
    // if (isCaseStateExcluded(stateLabel)) {
    //     return { eligible: false, reason: 'case_closed' }
    // }

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
    // TEMP (manual widget testing -- revert before deploying): table allowlist disabled.
    // if (!isAllowedHrCaseTable(tableName)) {
    //     return { success: false, reason: 'invalid_table' }
    // }
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
    // TEMP (manual widget testing -- revert before deploying): case-state exclusion disabled.
    if (!agentId) {
        return { success: false, reason: 'case_not_eligible' }
    }

    // Re-validate against a fresh slot grid so a slot someone else just took can't be double-booked.
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
