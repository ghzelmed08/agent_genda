// Self-contained ES5 script wired via Now.include() -- see
// src/server/hr_meeting/get-agenda.server.js for why.
;(function () {
    var employee = current.getValue('employee')
    var hrCase = current.getValue('hr_case')
    var agent = current.getValue('hr_agent')

    var gr = new GlideRecord('sn_hr_core_case')
    gr.addQuery('sys_id', hrCase)
    gr.addQuery('active', true)
    gr.addQuery('opened_for', employee)
    gr.addQuery('assigned_to', agent)
    gr.query()

    if (!gr.hasNext()) {
        gs.addErrorMessage('Appointment cannot be created: the employee does not have an active HR case assigned to the selected agent.')
        current.setAbortAction(true)
    }
})()
