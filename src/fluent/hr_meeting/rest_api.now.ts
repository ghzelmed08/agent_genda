import { RestApi, Acl } from '@servicenow/sdk/core'
import { getAgenda, bookSlot } from '../../server/hr_meeting/restHandlers'

// Allow any authenticated user to reach the endpoint. The REST handlers enforce finer-grained
// per-case authorization server-side (canAccessCase checks opened_for/caller_id or agent/admin role).
const hrMtgSchedulerAccess = Acl({
    $id: Now.ID['hr-mtg-scheduler-acl'],
    type: 'rest_endpoint',
    name: 'hr_mtg_scheduler_access',
    script: `answer = gs.isLoggedIn()`,
    operation: 'execute',
})

RestApi({
    $id: Now.ID['hr-mtg-scheduler-api'],
    name: 'HR Meeting Scheduler API',
    serviceId: 'hr_mtg_scheduler',
    consumes: 'application/json',
    produces: 'application/json',
    enforceAcl: [hrMtgSchedulerAccess],
    routes: [
        {
            $id: Now.ID['hr-mtg-agenda-get'],
            name: 'getAgenda',
            method: 'GET',
            path: '/cases/{table}/{case_id}/agenda',
            script: getAgenda,
            internalRole: false,
            shortDescription:
                '90-day availability grid + any active appointment for the case. {table} must be sn_hr_core_case or a table that extends it.',
        },
        {
            $id: Now.ID['hr-mtg-agenda-book'],
            name: 'bookSlot',
            method: 'POST',
            path: '/cases/{table}/{case_id}/book',
            script: bookSlot,
            internalRole: false,
            shortDescription: 'Book a slot for the case, cancelling any previous active appointment',
        },
    ],
})
