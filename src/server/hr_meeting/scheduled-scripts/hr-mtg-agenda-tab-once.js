;(function () {
    try {
        var result = new HrMtgAgendaTabAutomation().run()
        gs.info('HR Agent Agenda tab automation (run-once-at-install job) completed: ' + JSON.stringify(result))
    } catch (e) {
        gs.error('HR Agent Agenda tab automation (run-once-at-install job) failed: ' + e.message)
    }
})()
