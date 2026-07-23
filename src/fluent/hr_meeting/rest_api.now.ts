import { RestApi, Acl } from '@servicenow/sdk/core'
import { getAgenda, bookSlot } from '../../server/hr_meeting/restHandlers'

// Any of the HR Meeting Scheduler roles may call the API; the handlers do the finer-grained
// per-case authorization (the requesting employee, or an hr_mtg agent/admin).
const hrMtgSchedulerAccess = Acl({
    $id: Now.ID['hr-mtg-scheduler-acl'],
    type: 'rest_endpoint',
    name: 'hr_mtg_scheduler_access',
    script: `answer = gs.hasRole('global.hr_mtg_employee') || gs.hasRole('global.hr_mtg_agent') || gs.hasRole('global.hr_mtg_admin')`,
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
            shortDescription:
                '90-day availability grid + any active appointment for the case. {table} must be sn_hr_core_case or a table that extends it.',
        },
        {
            $id: Now.ID['hr-mtg-agenda-book'],
            name: 'bookSlot',
            method: 'POST',
            path: '/cases/{table}/{case_id}/book',
            script: bookSlot,
            shortDescription: 'Book a slot for the case, cancelling any previous active appointment',
        },
    ],
})
