import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

export const HrMtgAgendaTabAutomation = ScriptInclude({
    $id: Now.ID['hr-mtg-agenda-tab-automation'],
    name: 'HrMtgAgendaTabAutomation',
    script: Now.include('../../server/hr_meeting/script-includes/hr-mtg-agenda-tab-automation.js'),
    description:
        'Adds an "HR Agent Agenda" custom tab (ticket_tab_configuration) to every active Standard Ticket Configuration (ticket_configuration) whose table is sn_hr_core_case or a table that extends it (via GlideTableHierarchy), excluding sn_hr_er_case. Idempotent: a config that already has a tab referencing the HR Agent Agenda widget is skipped.',
    // Accessible from any application scope (not just this one), with the more restrictive
    // caller-access mode: a calling scope is denied by default until an admin explicitly
    // approves access for that scope (vs. 'tracking', which allows any scope and only logs usage).
    accessibleFrom: 'public',
    callerAccess: 'restriction',
})
