import { Test } from '@servicenow/sdk/core'

export const hrMtgAgendaTabOrderTest = Test(
    {
        $id: Now.ID['atf-tab-order-test'],
        name: 'HR Agent Agenda Tab Automation: order = previous max + 10',
        description:
            'Seeds a temporary ticket_configuration with existing tabs at order 10 and 25, runs HrMtgAgendaTabAutomation.run(), and asserts the newly created HR Agent Agenda tab has order 35 -- proving the automation computes order as (previous max order + 10) rather than a fixed value.',
        failOnServerError: true,
        active: true,
    },
    (atf) => {
        atf.server.runServerSideScript({
            $id: Now.ID['atf-tab-order-run'],
            jasmineVersion: '3.1',
            script: Now.include('./hr_mtg_agenda_tab_order_test.script.js'),
        })
    }
)
