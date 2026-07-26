export function statusForReason(reason: string | undefined): number {
    if (reason === 'invalid_table') return 400
    if (reason === 'case_not_found') return 404
    if (reason === 'not_authorized') return 403
    if (reason === 'invalid_slot' || reason === 'slot_unavailable' || reason === 'case_not_eligible') return 409
    return 200
}
