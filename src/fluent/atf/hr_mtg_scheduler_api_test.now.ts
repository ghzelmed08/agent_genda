import { Test } from '@servicenow/sdk/core'

// DISABLED (active: false): the UI-flow step below (atf.uiTestScript.runTest) required the
// `uiTestScript` ATF category, added to the Fluent SDK in @servicenow/sdk 4.9.0. The actual
// build/install target for this app is pinned to @servicenow/sdk 4.8.0 (see package.json),
// whose Test() builder only exposes: applicationNavigator, email, reporting,
// responsiveDashboard, rest, server, catalog, form -- no uiTestScript, no generic client-script
// step. Confirmed against node_modules/@servicenow/sdk-core/dist/app/Test.d.ts at 4.8.0.
//
// A rewrite using the native atf.rest.sendRestRequest/assertStatusCode/
// assertJsonResponsePayloadElement steps (both exist in 4.8.0) is possible for the REST-only
// parts of this test, but those steps only support static, pre-known expected values -- they
// can't read a response and decide the next request from it, which this test needs (it must
// discover *which* slot is available "today" before booking it). That in turn needs a way to
// compute "today" at ATF run time and feed it into a later REST step, which needs verifying
// against a live instance to get the exact step-output/GEM-interpolation syntax right -- not
// something to guess at without access to the instance. Left in place (not deleted) with only
// the incompatible step removed, so the user/case/seeding setup and intent are preserved for a
// future rewrite once verified live.
export const hrMtgSchedulerApiTest = Test(
    {
        $id: Now.ID['atf-scheduler-api-test'],
        name: 'HR Meeting Scheduler API: table allowlist and booking flow',
        description:
            "Calls the hr_mtg_scheduler REST API from an authenticated browser session (same auth path the real widget/portal uses), impersonating the case's own employee. Asserts a table outside ALLOWED_HR_CASE_TABLES (incident) is rejected with 400/invalid_table -- the negative case of the table allowlist in tables.ts. Then, on a sn_hr_core_case_payroll case (a COE child table, not the base table), books an available slot and asserts the agenda's existingAppointment reflects it; books a second different slot on the same case and asserts existingAppointment now reflects the second slot instead of the first -- the positive case proving bookSlotForCase cancels the prior active appointment on rebooking. DISABLED pending a rewrite compatible with @servicenow/sdk 4.8.0 (see comment above).",
        failOnServerError: true,
        active: false,
    },
    (atf) => {
        // Role granted below via GlideRecord in the seeding script, not through createUser's
        // `roles` array -- an array element built from another step's output (e.g. a recordQuery
        // result) isn't a shape the build's TestPlugin can serialize.
        const agentUser = atf.server.createUser({
            $id: Now.ID['atf-create-agent-user-a'],
            firstName: 'ATF',
            lastName: 'HrMtgAgentApi',
            fieldValues: { user_name: 'atf_hr_mtg_agent_api' },
            groups: [],
            roles: [],
            impersonate: false,
        })

        const employeeUser = atf.server.createUser({
            $id: Now.ID['atf-create-employee-user-a'],
            firstName: 'ATF',
            lastName: 'HrMtgEmployeeApi',
            fieldValues: { user_name: 'atf_hr_mtg_employee_api' },
            groups: [],
            roles: [],
            impersonate: false,
        })

        atf.server.recordInsert({
            $id: Now.ID['atf-insert-payroll-case-a'],
            table: 'sn_hr_core_case_payroll',
            fieldValues: {
                assigned_to: agentUser.user,
                opened_for: employeeUser.user,
                short_description: 'ATF hr_mtg_scheduler API test case',
            },
        })

        // Grants the sn_hr_core.basic role to the ATF agent user, then seeds a recurring 08:00-17:00
        // window on every weekday so the 90-day grid always has an available slot for "today",
        // whatever day this test happens to run on.
        atf.server.runServerSideScript({
            $id: Now.ID['atf-seed-availability-a'],
            jasmineVersion: '3.1',
            script: `
                (function (outputs, steps, params, stepResult, assertEqual) {
                    var roleGr = new GlideRecord('sys_user_role')
                    roleGr.addQuery('name', 'sn_hr_core.basic')
                    roleGr.query()
                    if (roleGr.next()) {
                        var hasRole = new GlideRecord('sys_user_has_role')
                        hasRole.initialize()
                        hasRole.setValue('user', '${agentUser.user}')
                        hasRole.setValue('role', roleGr.getUniqueValue())
                        hasRole.insert()
                    }

                    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
                    days.forEach(function (day) {
                        var avail = new GlideRecord('u_hr_mtg_availability')
                        avail.initialize()
                        avail.setValue('agent', '${agentUser.user}')
                        avail.setValue('day_of_week', day)
                        avail.setValue('recurring', true)
                        avail.setValue('start_time', '08:00:00')
                        avail.setValue('end_time', '17:00:00')
                        avail.setValue('active', true)
                        avail.insert()
                    })
                    stepResult.setOutputMessage('Granted sn_hr_core.basic role and seeded an 08:00-17:00 window for every weekday')
                })(outputs, steps, params, stepResult, assertEqual)
            `,
        })

        // Removed: atf.uiTestScript.runTest(...) -- not available in @servicenow/sdk 4.8.0.
        // See the DISABLED comment on the Test() config above for why and what a compatible
        // rewrite would need.
    }
)
