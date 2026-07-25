api.controller = function ($scope, $http) {
    var c = this

    // This app is scope "global" (now.config.json), confirmed by the built sys_ws_definition's
    // base_uri (/api/global/hr_mtg_scheduler) -- not a custom x_..._... scope.
    var API_BASE = '/api/global/hr_mtg_scheduler'

    var table = c.data.table
    var caseId = c.data.caseId

    c.loading = true
    c.error = table && caseId ? null : 'Missing table or sys_id in the page URL.'
    c.eligible = false
    c.showAgenda = false
    c.agentName = ''
    c.existingAppointment = null
    c.days = []
    c.selectedDate = null
    c.selectedDay = null
    c.selectedSlot = null
    c.booking = false
    c.bookError = null

    function headers() {
        return { 'X-UserToken': g_ck }
    }

    function postHeaders() {
        return { 'X-UserToken': g_ck, 'Content-Type': 'application/json' }
    }

    c.formatDate = function (dateStr) {
        var d = new Date(dateStr + 'T00:00:00')
        return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
    }

    c.formatTime = function (time) {
        return time ? time.slice(0, 5) : ''
    }

    c.isSelectedSlot = function (slot) {
        return !!c.selectedSlot && c.selectedSlot.start === slot.start && c.selectedSlot.end === slot.end
    }

    c.loadAgenda = function () {
        if (!table || !caseId) {
            c.loading = false
            return
        }
        c.loading = true
        c.error = null
        $http
            .get(API_BASE + '/cases/' + table + '/' + caseId + '/agenda', { headers: headers() })
            .then(function (res) {
                var result = res.data
                c.eligible = !!result.eligible
                c.agentName = (result.agent && result.agent.name) || ''
                c.existingAppointment = result.existingAppointment || null
                c.days = result.days || []
                c.loading = false
            })
            .catch(function () {
                c.loading = false
                c.error = 'Unable to load the agent agenda right now.'
            })
    }

    // Selecting the already-selected day toggles it closed again.
    c.selectDay = function (day) {
        if (!day.hasAvailability) return
        if (c.selectedDate === day.date) {
            c.selectedDate = null
            c.selectedDay = null
        } else {
            c.selectedDate = day.date
            c.selectedDay = day
        }
        c.selectedSlot = null
    }

    // Only one slot can ever be selected at a time -- this replaces, never appends.
    c.selectSlot = function (slot) {
        if (!slot.available) return
        c.selectedSlot = slot
    }

    // "No" on the confirm bar: clear the selection, the slot renders green again automatically.
    c.cancelSelection = function () {
        c.selectedSlot = null
    }

    c.confirmBooking = function () {
        if (!c.selectedSlot || !c.selectedDate) return
        c.booking = true
        c.bookError = null
        $http
            .post(
                API_BASE + '/cases/' + table + '/' + caseId + '/book',
                { date: c.selectedDate, start: c.selectedSlot.start, end: c.selectedSlot.end },
                { headers: postHeaders() }
            )
            .then(function (res) {
                c.booking = false
                if (!res.data.success) {
                    c.bookError = 'That slot is no longer available. Refreshing the agenda.'
                }
                c.selectedSlot = null
                c.selectedDate = null
                c.selectedDay = null
                c.loadAgenda()
            })
            .catch(function () {
                // Someone may have taken the slot first, or the case state changed -- refresh to reconcile.
                c.booking = false
                c.bookError = 'That slot is no longer available. Refreshing the agenda.'
                c.selectedSlot = null
                c.loadAgenda()
            })
    }

    c.loadAgenda()
}
