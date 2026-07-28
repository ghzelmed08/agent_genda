(function (outputs, steps, params, stepResult, assertEqual) {
    var WIDGET_SYS_ID = '70badff0a1f849e3885fae70c7305a72' // sp_widget "HR Agent Agenda"

    var erConfig = new GlideRecord('ticket_configuration')
    erConfig.addQuery('table', 'sn_hr_er_case')
    erConfig.addQuery('active', true)
    erConfig.query()
    if (!erConfig.next()) {
        throw new Error('Expected an active ticket_configuration for sn_hr_er_case to exist for this test to be meaningful')
    }
    var erConfigId = erConfig.getUniqueValue()

    new HrMtgAgendaTabAutomation().run()

    var tabs = new GlideRecord('ticket_tab_configuration')
    tabs.addQuery('parent', erConfigId)
    tabs.addQuery('widget', WIDGET_SYS_ID)
    tabs.query()
    assertEqual({ name: 'no HR Agent Agenda tab was created on the sn_hr_er_case config', shouldbe: false, value: tabs.next() })

    stepResult.setOutputMessage('Confirmed sn_hr_er_case (Employee Relations) is excluded from the tab automation.')
})(outputs, steps, params, stepResult, assertEqual)
