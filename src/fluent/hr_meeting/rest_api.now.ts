import { RestApi, Acl } from '@servicenow/sdk/core'

// Gate the endpoint to HR-context users via standard ServiceNow HRSD roles (basic HR agent,
// Employee Center employee) or the app's own admin role -- not "any logged in user". The REST
// handlers still enforce finer-grained per-case authorization server-side (canAccessCase checks
// opened_for/caller_id or agent/admin role).
const hrMtgSchedulerAccess = Acl({
    $id: Now.ID['hr-mtg-scheduler-acl'],
    type: 'rest_endpoint',
    name: 'hr_mtg_scheduler_access',
    script: `answer = gs.hasRole('sn_hr_core.basic') || gs.hasRole('sn_hr_sp.hrsp_employee') || gs.hasRole('global.hr_mtg_admin')`,
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
            script: Now.include('../../server/hr_meeting/get-agenda.server.js'),
            internalRole: false,
            shortDescription:
                '90-day availability grid + any active appointment for the case. {table} must be sn_hr_core_case or a table that extends it.',
        },
        {
            $id: Now.ID['hr-mtg-agenda-book'],
            name: 'bookSlot',
            method: 'POST',
            path: '/cases/{table}/{case_id}/book',
            script: Now.include('../../server/hr_meeting/book-slot.server.js'),
            internalRole: false,
            shortDescription: 'Book a slot for the case, cancelling any previous active appointment',
        },
    ],
})
