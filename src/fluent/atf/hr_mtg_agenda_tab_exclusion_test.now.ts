import { Test } from '@servicenow/sdk/core'

export const hrMtgAgendaTabExclusionTest = Test(
    {
        $id: Now.ID['atf-tab-exclusion-test'],
        name: 'HR Agent Agenda Tab Automation: sn_hr_er_case exclusion',
        description:
            'Runs HrMtgAgendaTabAutomation.run() and asserts no ticket_tab_configuration referencing the HR Agent Agenda widget is ever created on the active sn_hr_er_case (Employee Relations) ticket_configuration -- the explicit exclusion rule.',
        failOnServerError: true,
        active: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-tab-exclusion-run'],
            jasmineVersion: '3.1',
            script: Now.include('./hr_mtg_agenda_tab_exclusion_test.script.js'),
        })
    }
)
