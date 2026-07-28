;(function () {
    try {
        var result = new HrMtgAgendaTabAutomation().run()
        gs.info('HR Agent Agenda tab automation (daily job) completed: ' + JSON.stringify(result))
    } catch (e) {
        gs.error('HR Agent Agenda tab automation (daily job) failed: ' + e.message)
    }
})()
