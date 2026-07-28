(function (outputs, steps, params, stepResult, assertEqual) {
    var WIDGET_SYS_ID = '70badff0a1f849e3885fae70c7305a72' // sp_widget "HR Agent Agenda"
    var SEED_WIDGET_SYS_ID = 'ffffffffffffffffffffffffffffffff' // dummy, distinct from the real widget

    // A table with no existing ticket_configuration (confirmed via query). A table that
    // already has an active config (e.g. sn_hr_core_case_payroll) gets this insert silently
    // aborted by the OOB "Unique configuration for a Table" business rule -- confirmed by an
    // earlier failed run of this test, which left configId empty and made every assertion
    // meaningless. Uses a different unused table than the idempotency test
    // (sn_hr_core_case_compensation) so the two can never collide if run concurrently.
    var config = new GlideRecord('ticket_configuration')
    config.initialize()
    config.setValue('table', 'sn_hr_core_case_corporate_communication')
    config.setValue('active', true)
    var configId = config.insert()
    if (!configId) {
        throw new Error('Failed to insert the temporary ticket_configuration for this test (aborted by a business rule?)')
    }

    try {
        // Seed a couple of extra tabs with known orders (10 and 25) so we can assert the new
        // tab's order is (max order + 10). type: 'custom' (not 'activity'/'attachments'):
        // ServiceNow auto-creates default Activity/Attachments tabs on every new
        // ticket_configuration (via an OOB business rule) and another OOB rule -- "Allow only
        // one Activity,Attachment & Var" -- rejects a second tab of those native types, which
        // silently aborted these seed inserts in an earlier run of this test. 'custom' tabs
        // (what real widget-backed tabs use) don't have that restriction.
        var seedOrders = [10, 25]
        seedOrders.forEach(function (order) {
            var seedTab = new GlideRecord('ticket_tab_configuration')
            seedTab.initialize()
            seedTab.setValue('parent', configId)
            seedTab.setValue('tab_name', 'Seed Tab ' + order)
            seedTab.setValue('type', 'custom')
            seedTab.setValue('widget', SEED_WIDGET_SYS_ID)
            seedTab.setValue('order', order)
            seedTab.insert()
        })

        // Measure the actual max order right before running the automation -- this also
        // accounts for whatever default tabs (e.g. Activity/Attachments) the platform may have
        // auto-created on this config, rather than assuming only the two seeds above exist.
        var maxOrder = 0
        var maxOrderGr = new GlideRecord('ticket_tab_configuration')
        maxOrderGr.addQuery('parent', configId)
        maxOrderGr.orderByDesc('order')
        maxOrderGr.setLimit(1)
        maxOrderGr.query()
        if (maxOrderGr.next()) {
            maxOrder = parseInt(maxOrderGr.getValue('order'), 10) || 0
        }

        new HrMtgAgendaTabAutomation().run()

        var tab = new GlideRecord('ticket_tab_configuration')
        tab.addQuery('parent', configId)
        tab.addQuery('widget', WIDGET_SYS_ID)
        tab.query()
        assertEqual({ name: 'HR Agent Agenda tab was created', shouldbe: true, value: tab.next() })
        assertEqual({
            name: 'order equals the measured previous max order (' + maxOrder + ') + 10',
            shouldbe: maxOrder + 10,
            value: parseInt(tab.getValue('order'), 10),
        })

        stepResult.setOutputMessage('Confirmed the created tab order equals the previous max order + 10.')
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
