import { Test } from '@servicenow/sdk/core'

// Now.include() cannot be used for the uiTestScript step below because it interpolates
// hrCase.record_id (a prior step's output) via GEM substitution -- that only works with an
// inline template literal, per the scripted-rest-api/atf guides.
export const hrMtgSchedulerApiTest = Test(
    {
        $id: Now.ID['atf-scheduler-api-test'],
        name: 'HR Meeting Scheduler API: table allowlist and booking flow',
        description:
            "Calls the hr_mtg_scheduler REST API from an authenticated browser session (same auth path the real widget/portal uses), impersonating the case's own employee. Asserts a table outside ALLOWED_HR_CASE_TABLES (incident) is rejected with 400/invalid_table -- the negative case of the table allowlist in tables.ts. Then, on a sn_hr_core_case_payroll case (a COE child table, not the base table), books an available slot and asserts the agenda's existingAppointment reflects it; books a second different slot on the same case and asserts existingAppointment now reflects the second slot instead of the first -- the positive case proving bookSlotForCase cancels the prior active appointment on rebooking.",
        failOnServerError: true,
        active: true,
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

        const hrCase = atf.server.recordInsert({
            $id: Now.ID['atf-insert-payroll-case-a'],
            table: 'sn_hr_core_case_payroll',
            fieldValues: {
                assigned_to: agentUser.user,
                opened_for: employeeUser.user,
                short_description: 'ATF hr_mtg_scheduler API test case',
            },
        })

        // Grants the hr_mtg_agent role to the ATF agent user, then seeds a recurring 08:00-17:00
        // window on every weekday so the 90-day grid always has an available slot for "today",
        // whatever day this test happens to run on.
        atf.server.runServerSideScript({
            $id: Now.ID['atf-seed-availability-a'],
            jasmineVersion: '3.1',
            script: `
                (function (outputs, steps, params, stepResult, assertEqual) {
                    var roleGr = new GlideRecord('sys_user_role')
                    roleGr.addQuery('name', 'global.hr_mtg_agent')
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
                    stepResult.setOutputMessage('Granted hr_mtg_agent role and seeded an 08:00-17:00 window for every weekday')
                })(outputs, steps, params, stepResult, assertEqual)
            `,
        })

        atf.uiTestScript.runTest({
            $id: Now.ID['atf-run-scheduler-flow-a'],
            script: `
                await sn_atf.impersonate('atf_hr_mtg_employee_api')

                const caseId = '${hrCase.record_id}'
                await sn_atf.navigate('/esc?id=hrm_ticket_page&table=sn_hr_core_case_payroll&sys_id=' + caseId)

                const base = '/api/global/hr_mtg_scheduler'

                const call = (method, path, body) =>
                    sn_atf.evaluate(
                        async (args) => {
                            const response = await fetch(args.path, {
                                method: args.method,
                                headers: { 'Content-Type': 'application/json', 'X-UserToken': window.g_ck },
                                body: args.body ? JSON.stringify(args.body) : undefined,
                            })
                            return { status: response.status, body: await response.json() }
                        },
                        { method, path, body }
                    )

                // Negative case: a table outside the HR Case allowlist is rejected before case lookup.
                const rejected = await call('GET', base + '/cases/incident/' + caseId + '/agenda')
                expect(rejected.status).toBe(400)
                expect(rejected.body.reason).toBe('invalid_table')

                // Happy path on a COE child table.
                const agenda = await call('GET', base + '/cases/sn_hr_core_case_payroll/' + caseId + '/agenda')
                expect(agenda.body.eligible).toBe(true)

                const today = agenda.body.days[0]
                const slot1 = today.slots.find((s) => s.available)
                if (!slot1) throw new Error('Expected at least one available slot for today')

                const booking1 = await call('POST', base + '/cases/sn_hr_core_case_payroll/' + caseId + '/book', {
                    date: today.date,
                    start: slot1.start,
                    end: slot1.end,
                })
                expect(booking1.body.success).toBe(true)

                const agendaAfterFirst = await call('GET', base + '/cases/sn_hr_core_case_payroll/' + caseId + '/agenda')
                expect(agendaAfterFirst.body.existingAppointment.start).toBe(slot1.start)

                // Book a second, different slot on the same case -- this must cancel the first.
                const todayAfterFirst = agendaAfterFirst.body.days.find((d) => d.date === today.date)
                const slot2 = todayAfterFirst.slots.find((s) => s.available && s.start !== slot1.start)
                if (!slot2) throw new Error('Expected a second available slot on the same day')

                const booking2 = await call('POST', base + '/cases/sn_hr_core_case_payroll/' + caseId + '/book', {
                    date: today.date,
                    start: slot2.start,
                    end: slot2.end,
                })
                expect(booking2.body.success).toBe(true)

                const agendaAfterSecond = await call('GET', base + '/cases/sn_hr_core_case_payroll/' + caseId + '/agenda')
                expect(agendaAfterSecond.body.existingAppointment.start).toBe(slot2.start)
                expect(agendaAfterSecond.body.existingAppointment.start).not.toBe(slot1.start)
            `,
        })
    }
)
