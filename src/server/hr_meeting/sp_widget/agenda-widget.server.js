;(function () {
    // hrm_ticket_page (and Employee Center HR case pages generally) carries the record
    // being viewed as ?table=...&sys_id=... on the URL -- read both off directly.
    data.table = $sp.getParameter('table') || ''
    data.caseId = $sp.getParameter('sys_id') || ''
})()
