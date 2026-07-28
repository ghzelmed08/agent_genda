import { Test } from '@servicenow/sdk/core'

export const hrMtgAgendaTabCoverageTest = Test(
    {
        $id: Now.ID['atf-tab-coverage-test'],
        name: 'HR Agent Agenda Tab Automation: COE child table coverage',
        description:
            'Runs HrMtgAgendaTabAutomation.run() and asserts an HR Agent Agenda ticket_tab_configuration exists on the active sn_hr_core_case_payroll ticket_configuration -- proving the automation covers COE child tables (via GlideTableHierarchy), not only the base sn_hr_core_case table.',
        failOnServerError: true,
        active: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-tab-coverage-run'],
            jasmineVersion: '3.1',
            script: Now.include('./hr_mtg_agenda_tab_coverage_test.script.js'),
        })
    }
)
