// Pure date/slot math shared by the HR meeting agenda service. No Glide APIs here on purpose,
// so this stays unit-testable outside the platform runtime.

export const DAY_NAMES = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export interface TimeSlot {
    start: string
    end: string
}

export function formatDate(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

export function addDays(date: Date, amount: number): Date {
    const result = new Date(date.getTime())
    result.setDate(result.getDate() + amount)
    return result
}

export function dayOfWeekName(date: Date): string {
    return DAY_NAMES[date.getDay()]
}

export function timeToMinutes(time: string): number {
    // No array destructuring: ServiceNow's server-side script engine rejects it at evaluation
    // time ("destructuring assignment is an ECMAScript 6 feature - not supported"), even though
    // arrow functions/let/const/template literals are fine.
    const parts = time.split(':').map(Number)
    const h = parts[0]
    const m = parts[1]
    return h * 60 + m
}

export function minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`
}

// Chops an availability window (e.g. 09:00:00-12:00:00) into fixed-size bookable slots.
// A window shorter than durationMinutes yields no slots.
export function buildSlotsForWindow(startTime: string, endTime: string, durationMinutes: number): TimeSlot[] {
    const slots: TimeSlot[] = []
    let cursor = timeToMinutes(startTime)
    const end = timeToMinutes(endTime)
    while (cursor + durationMinutes <= end) {
        slots.push({ start: minutesToTime(cursor), end: minutesToTime(cursor + durationMinutes) })
        cursor += durationMinutes
    }
    return slots
}

export function slotKey(date: string, start: string, end: string): string {
    return `${date}|${start}|${end}`
}
