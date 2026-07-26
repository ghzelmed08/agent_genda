import { gs } from '@servicenow/glide'
import { getAgendaForCase } from './agendaService'
import { statusForReason } from './restStatus'

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
