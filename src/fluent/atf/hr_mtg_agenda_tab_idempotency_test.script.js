(function (outputs, steps, params, stepResult, assertEqual) {
    var WIDGET_SYS_ID = '70badff0a1f849e3885fae70c7305a72' // sp_widget "HR Agent Agenda"

    // Isolated temporary config on a COE child table with no existing ticket_configuration
    // (confirmed via query: sn_hr_core_case_compensation has none). A table that already has
    // an active config (e.g. sn_hr_core_case_payroll) gets this insert silently aborted by the
    // OOB "Unique configuration for a Table" business rule -- confirmed by an earlier failed
    // run of this test, which left configId empty and made every assertion meaningless.
    var config = new GlideRecord('ticket_configuration')
    config.initialize()
    config.setValue('table', 'sn_hr_core_case_compensation')
    config.setValue('active', true)
    var configId = config.insert()
    if (!configId) {
        throw new Error('Failed to insert the temporary ticket_configuration for this test (aborted by a business rule?)')
    }

    function countAgendaTabs() {
        var count = 0
        var gr = new GlideRecord('ticket_tab_configuration')
        gr.addQuery('parent', configId)
        gr.addQuery('widget', WIDGET_SYS_ID)
        gr.query()
        while (gr.next()) {
            count++
        }
        return count
    }

    try {
        var automation = new HrMtgAgendaTabAutomation()

        automation.run()
        assertEqual({ name: 'exactly one tab after first run', shouldbe: 1, value: countAgendaTabs() })

        automation.run()
        assertEqual({ name: 'still exactly one tab after second run (no duplicate)', shouldbe: 1, value: countAgendaTabs() })

        stepResult.setOutputMessage('Idempotency verified: run() created exactly one tab; a second run created no duplicate.')
    } finally {
        var cleanupTabs = new GlideRecord('ticket_tab_configuration')
        cleanupTabs.addQuery('parent', configId)
        cleanupTabs.query()
        while (cleanupTabs.next()) {
            cleanupTabs.deleteRecord()
        }
        var cleanupConfig = new GlideRecord('ticket_configuration')
        if (cleanupConfig.get(configId)) {
            cleanupConfig.deleteRecord()
        }
    }
})(outputs, steps, params, stepResult, assertEqual)
