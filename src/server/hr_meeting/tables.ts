// Allowlist of tables this feature is enabled for: the base HR Case table plus any
// COE child table that extends it (sn_hr_core_case_payroll, etc.).
//
// Why an allowlist instead of dynamically walking table inheritance: ServiceNow does expose
// a runtime inheritance check (GlideDBObjectManager.get().isInstanceOf(table, 'sn_hr_core_case')),
// but it lives under the `global.` namespace and isn't typed in @servicenow/glide, so it can't be
// verified at build time the way the rest of this module is. The allowlist is a explicit,
// type-checked, zero-surprise alternative -- extending support to a new COE table is a one-line
// change here, nothing else in the request path needs to know about it.
export const ALLOWED_HR_CASE_TABLES = [
    'sn_hr_core_case',
    'sn_hr_core_case_payroll',
    'sn_hr_core_case_workforce_admin',
    'sn_hr_core_case_talent_management',
    'sn_hr_core_case_operations',
    'sn_hr_core_case_total_rewards',
]

export function isAllowedHrCaseTable(tableName: string): boolean {
    return !!tableName && ALLOWED_HR_CASE_TABLES.indexOf(tableName) !== -1
}
