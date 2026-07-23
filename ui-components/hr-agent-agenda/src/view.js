import { t } from '@servicenow/ui-renderer-snabbdom'

function formatDateLabel(dateStr) {
    const d = new Date(`${dateStr}T00:00:00`)
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTimeLabel(time) {
    return time.slice(0, 5)
}

export default (state, { dispatch }) => {
    const { loading, error, eligible, showAgenda, agentName, existingAppointment, days, selectedDate, selectedSlot, booking, bookError } = state

    if (loading) {
        return t`<div class="hr-agenda"><span class="hr-agenda-loading">Loading agent agenda...</span></div>`
    }

    if (error) {
        return t`<div class="hr-agenda"><span class="hr-agenda-error">${error}</span></div>`
    }

    // Not eligible (no agent assigned, or case is cancelled/closed/resolved): render nothing.
    if (!eligible) {
        return t`<div class="hr-agenda"></div>`
    }

    const selectedDay = days.find((d) => d.date === selectedDate)

    return t`
        <div class="hr-agenda">
            <label class="hr-agenda-checkbox-label">
                <input
                    type="checkbox"
                    checked=${showAgenda}
                    on-change=${() => dispatch('TOGGLE_SHOW_AGENDA')}
                />
                <span>Show HR agent agenda${agentName ? ` (${agentName})` : ''}</span>
            </label>

            ${showAgenda
                ? t`<div class="hr-agenda-panel">
                    ${existingAppointment
                        ? t`<div class="hr-agenda-existing">
                            Confirmed meeting: ${existingAppointment.date} · ${formatTimeLabel(existingAppointment.start)}-${formatTimeLabel(existingAppointment.end)}
                        </div>`
                        : ''}
                    ${bookError ? t`<div class="hr-agenda-error">${bookError}</div>` : ''}

                    <div class="hr-agenda-calendar">
                        ${days.map(
                            (day) => t`
                            <button
                                type="button"
                                class="hr-agenda-day ${
                                    day.hasAvailability ? 'hr-agenda-day--available' : 'hr-agenda-day--unavailable'
                                } ${selectedDate === day.date ? 'hr-agenda-day--selected' : ''}"
                                disabled=${!day.hasAvailability}
                                on-click=${() => dispatch('SELECT_DAY', { date: day.date })}
                            >${formatDateLabel(day.date)}</button>
                        `
                        )}
                    </div>

                    ${selectedDay
                        ? t`<div class="hr-agenda-slots">
                            ${selectedDay.slots.map(
                                (slot) => t`
                                <button
                                    type="button"
                                    class="hr-agenda-slot ${
                                        selectedSlot && selectedSlot.start === slot.start && selectedSlot.end === slot.end
                                            ? 'hr-agenda-slot--selected'
                                            : slot.available
                                            ? 'hr-agenda-slot--available'
                                            : 'hr-agenda-slot--unavailable'
                                    }"
                                    disabled=${!slot.available}
                                    on-click=${() => dispatch('SELECT_SLOT', { slot })}
                                >${formatTimeLabel(slot.start)} - ${formatTimeLabel(slot.end)}</button>
                            `
                            )}
                        </div>`
                        : ''}

                    ${selectedSlot
                        ? t`<div class="hr-agenda-confirm-bar">
                            <span>Confirm slot: ${selectedDate} · ${formatTimeLabel(selectedSlot.start)}-${formatTimeLabel(selectedSlot.end)}?</span>
                            <button type="button" class="hr-agenda-confirm-yes" disabled=${booking} on-click=${() => dispatch('CONFIRM_BOOKING')}>Yes</button>
                            <button type="button" class="hr-agenda-confirm-no" disabled=${booking} on-click=${() => dispatch('CANCEL_SELECTION')}>No</button>
                        </div>`
                        : ''}
                </div>`
                : ''}
        </div>
    `
}
