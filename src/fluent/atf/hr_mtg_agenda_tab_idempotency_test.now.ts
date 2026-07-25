import { Test } from '@servicenow/sdk/core'

export const hrMtgAgendaTabIdempotencyTest = Test(
    {
        $id: Now.ID['atf-tab-idempotency-test'],
        name: 'HR Agent Agenda Tab Automation: idempotency',
        description:
            'Runs HrMtgAgendaTabAutomation.run() twice against a temporary ticket_configuration with no existing agenda tab. Asserts exactly one ticket_tab_configuration referencing the HR Agent Agenda widget exists after the first run, and that the count is unchanged after the second run -- proving the automation never creates a duplicate tab on repeat execution.',
        failOnServerError: true,
        active: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-tab-idempotency-run'],
            jasmineVersion: '3.1',
            script: Now.include('./hr_mtg_agenda_tab_idempotency_test.script.js'),
        })
    }
)
