import { gs } from '@servicenow/glide'
import { bookSlotForCase } from './agendaService'
import { statusForReason } from './restStatus'

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
