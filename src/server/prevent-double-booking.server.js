// Self-contained ES5 script wired via Now.include() -- see
// src/server/hr_meeting/get-agenda.server.js for why.
;(function () {
    var agent = current.getValue('hr_agent')
    var date = current.getValue('date')
    var startTime = current.getValue('start_time')
    var endTime = current.getValue('end_time')

    var gr = new GlideRecord('u_hr_mtg_appointment')
    gr.addQuery('hr_agent', agent)
    gr.addQuery('date', date)
    gr.addQuery('status', '!=', 'cancelled')
    gr.addQuery('sys_id', '!=', current.getUniqueValue())
    gr.addQuery('start_time', '<', endTime)
    gr.addQuery('end_time', '>', startTime)
    gr.query()

    if (gr.hasNext()) {
        gs.addErrorMessage('This time slot is already booked for the selected agent. Please choose a different time.')
        current.setAbortAction(true)
    }
})()
