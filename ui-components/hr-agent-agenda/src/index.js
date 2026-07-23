import { createCustomElement } from '@servicenow/ui-core'
import snabbdomRenderer from '@servicenow/ui-renderer-snabbdom'
import styles from './styles.scss'
import view from './view'
import actionHandlers from './actionHandlers'

createCustomElement('x-1879266-agent-agenda-hr-agent-agenda', {
    renderer: { type: snabbdomRenderer },
    view,
    styles,
    actionHandlers,
    initialState: {
        loading: false,
        error: null,
        eligible: false,
        showAgenda: false,
        agentName: '',
        existingAppointment: null,
        days: [],
        selectedDate: null,
        selectedSlot: null,
        booking: false,
        bookError: null,
    },
})
