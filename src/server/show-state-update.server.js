// Self-contained ES5 script wired via Now.include() -- see
// src/server/hr_meeting/get-agenda.server.js for why.
;(function () {
    var currentState = current.getValue('state')
    var previousState = previous.getValue('state')
    gs.addInfoMessage('state updated from "' + previousState + '" to "' + currentState + '"')
})()
