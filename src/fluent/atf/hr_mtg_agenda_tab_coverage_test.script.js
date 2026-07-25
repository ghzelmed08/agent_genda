(function (outputs, steps, params, stepResult, assertEqual) {
    var WIDGET_SYS_ID = '70badff0a1f849e3885fae70c7305a72' // sp_widget "HR Agent Agenda"

    var config = new GlideRecord('ticket_configuration')
    config.addQuery('table', 'sn_hr_core_case_payroll')
    config.addQuery('active', true)
    config.query()
    if (!config.next()) {
        throw new Error('Expected an active ticket_configuration for sn_hr_core_case_payroll (a COE child table) to exist for this test to be meaningful')
    }
    var configId = config.getUniqueValue()

    new HrMtgAgendaTabAutomation().run()

    var tab = new GlideRecord('ticket_tab_configuration')
    tab.addQuery('parent', configId)
    tab.addQuery('widget', WIDGET_SYS_ID)
    tab.query()
    assertEqual({
        name: 'HR Agent Agenda tab exists on the sn_hr_core_case_payroll (COE child table) config',
        shouldbe: true,
        value: tab.next(),
    })

    stepResult.setOutputMessage('Confirmed the tab automation covers a COE child table (sn_hr_core_case_payroll), not just the base sn_hr_core_case table.')
})(outputs, steps, params, stepResult, assertEqual)
