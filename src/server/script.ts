import { gs, type GlideRecord } from '@servicenow/glide'

// Default export, not named: see src/server/hr_meeting/getAgenda.ts for why (avoids the SDK's
// destructured require() glue code, which ServiceNow's script engine rejects).
export default function showStateUpdate(current: GlideRecord, previous: GlideRecord) {
    const currentState = current.getValue('state')
    const previousState = previous.getValue('state')

    gs.addInfoMessage(`state updated from "${previousState}" to "${currentState}"`)
}
