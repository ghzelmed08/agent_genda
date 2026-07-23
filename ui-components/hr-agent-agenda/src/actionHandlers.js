import { actionTypes } from '@servicenow/ui-core'
import { API_BASE } from './constants'

const { COMPONENT_CONNECTED } = actionTypes

async function fetchJson(url, options) {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-UserToken': (window.g_ck || '') },
        ...options,
    })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
        throw Object.assign(new Error(body.reason || 'request_failed'), { body })
    }
    return body
}

export default {
    [COMPONENT_CONNECTED]: ({ dispatch }) => {
        dispatch('FETCH_AGENDA')
    },

    FETCH_AGENDA: async ({ properties, updateState }) => {
        if (!properties.caseId) return
        updateState({ loading: true, error: null })
        try {
            const result = await fetchJson(`${API_BASE}/cases/${properties.caseId}/agenda`)
            updateState({
                loading: false,
                eligible: !!result.eligible,
                agentName: (result.agent && result.agent.name) || '',
                existingAppointment: result.existingAppointment || null,
                days: result.days || [],
            })
        } catch (err) {
            updateState({ loading: false, error: 'Unable to load the agent agenda right now.' })
        }
    },

    TOGGLE_SHOW_AGENDA: ({ state, updateState }) => {
        updateState({ showAgenda: !state.showAgenda })
    },

    // Selecting the already-selected day toggles it closed again.
    SELECT_DAY: ({ action, state, updateState }) => {
        const day = state.days.find((d) => d.date === action.payload.date)
        if (!day || !day.hasAvailability) return
        updateState({
            selectedDate: state.selectedDate === action.payload.date ? null : action.payload.date,
            selectedSlot: null,
        })
    },

    // Only one slot can ever be selected at a time -- this replaces, never appends.
    SELECT_SLOT: ({ action, updateState }) => {
        if (!action.payload.slot.available) return
        updateState({ selectedSlot: action.payload.slot })
    },

    // "No" on the confirm bar: clear the selection, the slot renders green again automatically.
    CANCEL_SELECTION: ({ updateState }) => {
        updateState({ selectedSlot: null })
    },

    CONFIRM_BOOKING: async ({ state, properties, updateState, dispatch }) => {
        if (!state.selectedSlot || !state.selectedDate) return
        updateState({ booking: true, bookError: null })
        try {
            const result = await fetchJson(`${API_BASE}/cases/${properties.caseId}/book`, {
                method: 'POST',
                body: JSON.stringify({
                    date: state.selectedDate,
                    start: state.selectedSlot.start,
                    end: state.selectedSlot.end,
                }),
            })
            if (!result.success) {
                throw Object.assign(new Error(result.reason || 'booking_failed'), { body: result })
            }
            updateState({ booking: false, selectedSlot: null, selectedDate: null })
            dispatch('FETCH_AGENDA')
        } catch (err) {
            // Someone may have taken the slot first, or the case state changed -- refresh to reconcile.
            updateState({ booking: false, bookError: 'That slot is no longer available. Refreshing the agenda.', selectedSlot: null })
            dispatch('FETCH_AGENDA')
        }
    },
}
