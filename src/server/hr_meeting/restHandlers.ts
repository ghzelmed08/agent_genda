import { gs } from '@servicenow/glide'
import { getAgendaForCase, bookSlotForCase } from './agendaService'

function statusForReason(reason: string | undefined): number {
    if (reason === 'invalid_table') return 400
    if (reason === 'case_not_found') return 404
    if (reason === 'not_authorized') return 403
    if (reason === 'invalid_slot' || reason === 'slot_unavailable' || reason === 'case_not_eligible') return 409
    return 200
}

export function getAgenda(request: any, response: any) {
    try {
        const table = request.pathParams.table
        const caseId = request.pathParams.case_id
        const result = getAgendaForCase(table, caseId, gs.getUserID())
        if (!result.eligible) {
            response.setStatus(statusForReason(result.reason))
        }
        response.setBody(result)
    } catch (e: any) {
        gs.error('HR Agent Agenda getAgenda error: ' + (e.message || e))
        response.setStatus(500)
        response.setBody({ eligible: false, reason: 'server_error', message: String(e.message || e) })
    }
}

export function bookSlot(request: any, response: any) {
    try {
        const table = request.pathParams.table
        const caseId = request.pathParams.case_id
        const body = request.body && request.body.data ? request.body.data : {}
        const result = bookSlotForCase(table, caseId, gs.getUserID(), body.date, body.start, body.end, body.meetingType)
        if (!result.success) {
            response.setStatus(statusForReason(result.reason))
        }
        response.setBody(result)
    } catch (e: any) {
        gs.error('HR Agent Agenda bookSlot error: ' + (e.message || e))
        response.setStatus(500)
        response.setBody({ success: false, reason: 'server_error', message: String(e.message || e) })
    }
}
