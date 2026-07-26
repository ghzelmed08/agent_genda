import { gs } from '@servicenow/glide'
import { getAgendaForCase } from './agendaService'
import { statusForReason } from './restStatus'

// Default export, not named: the Fluent SDK generates a `const { name } = require(...)` glue-code
// wrapper around a REST route's `script:` function when it's a named export -- that destructuring
// assignment isn't supported by ServiceNow's server-side script engine and fails at evaluation
// time for every call, regardless of what this function itself does. A default export makes the
// SDK generate `const name = require(...).default` instead (no destructuring).
export default function getAgenda(request: any, response: any) {
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
