import { Test } from '@servicenow/sdk/core'

// Inline template literal (not Now.include()) because the script interpolates hrCase.record_id,
// a prior step's output, via GEM substitution -- see the atf-ui-test-script-guide.
export const hrMtgEmployeeCenterTest = Test(
    {
        $id: Now.ID['atf-ec-test'],
        name: 'Employee Center: HR Agent Agenda widget on hrm_ticket_page',
        description:
            'Navigates to /esc?id=hrm_ticket_page for a sn_hr_core_case with an assigned agent, as the case\'s own employee. Checks the "Show HR agent agenda" checkbox, selects an available day and slot (turns selected), clicks "No" on the confirm bar and asserts the bar disappears and the slot is re-selectable (the reject-and-reselect conditional state), then re-selects the same slot and clicks "Yes", asserting the "Confirmed meeting" banner renders and a u_hr_mtg_appointment with status=booked is persisted server-side for the case.',
        failOnServerError: true,
        active: true,
    },
    (atf) => {
        // Role granted below via GlideRecord in the seeding script, not through createUser's
        // `roles` array -- an array element built from another step's output isn't a shape the
        // build's TestPlugin can serialize.
        const agentUser = atf.server.createUser({
            $id: Now.ID['atf-ec-create-agent-user'],
            firstName: 'ATF',
            lastName: 'HrMtgAgentEc',
            fieldValues: { user_name: 'atf_hr_mtg_agent_ec' },
            groups: [],
            roles: [],
            impersonate: false,
        })

        const employeeUser = atf.server.createUser({
            $id: Now.ID['atf-ec-create-employee-user'],
            firstName: 'ATF',
            lastName: 'HrMtgEmployeeEc',
            fieldValues: { user_name: 'atf_hr_mtg_employee_ec' },
            groups: [],
            roles: [],
            impersonate: false,
        })

        const hrCase = atf.server.recordInsert({
            $id: Now.ID['atf-ec-insert-case'],
            table: 'sn_hr_core_case',
            fieldValues: {
                assigned_to: agentUser.user,
                opened_for: employeeUser.user,
                short_description: 'ATF Employee Center hr_mtg_scheduler test case',
            },
        })

        // Grants the hr_mtg_agent role, then seeds the same deterministic every-weekday
        // availability as the API test so the 90-day grid always has a pickable day/slot.
        atf.server.runServerSideScript({
            $id: Now.ID['atf-ec-seed-availability'],
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
            $id: Now.ID['atf-ec-run-ui-flow'],
            script: `
                await sn_atf.impersonate('atf_hr_mtg_employee_ec')

                const caseId = '${hrCase.record_id}'
                await sn_atf.navigate('/esc?id=hrm_ticket_page&table=sn_hr_core_case&sys_id=' + caseId)

                const checkbox = await screen.findByLabelText(/Show HR agent agenda/i, { timeout: 20000 })
                await user.click(checkbox)

                const dayButtons = await screen.findAllByRole('button', { timeout: 15000 })
                const availableDay = dayButtons.find((b) => !b.disabled)
                if (!availableDay) throw new Error('Expected at least one available day in the 90-day grid')
                await user.click(availableDay)

                const slotsContainer = await screen.findBySelector('.hr-agenda-slots', { timeout: 15000 })
                const slotButtons = await within(slotsContainer).findAllByRole('button')
                const availableSlot = slotButtons.find((b) => !b.disabled)
                if (!availableSlot) throw new Error('Expected at least one available slot on the selected day')
                const slotLabel = availableSlot.textContent.trim()
                await user.click(availableSlot)

                const confirmBar = await screen.findByText(/Confirm slot/i, { timeout: 10000 })
                await waitFor(() => expect(confirmBar).toBeVisible())

                // "No" must clear the selection: the confirm bar disappears and the slot is
                // pickable again (it never turns permanently unavailable from being selected).
                const noButton = await screen.findByRole('button', { name: 'No' })
                await user.click(noButton)
                await waitFor(() => expect(screen.queryByText(/Confirm slot/i)).toBeNull())

                const slotsContainerAgain = await screen.findBySelector('.hr-agenda-slots')
                const slotButtonsAgain = await within(slotsContainerAgain).findAllByRole('button')
                const sameSlot = slotButtonsAgain.find((b) => b.textContent.trim() === slotLabel)
                if (!sameSlot || sameSlot.disabled) throw new Error('Expected the slot to be selectable again after clicking No')
                await user.click(sameSlot)

                const yesButton = await screen.findByRole('button', { name: 'Yes' })
                await user.click(yesButton)

                const confirmedBanner = await screen.findByText(/Confirmed meeting/i, { timeout: 20000 })
                await waitFor(() => expect(confirmedBanner).toBeVisible())
            `,
        })

        // A recordQuery/recordValidation pair can't take an encoded query built from a prior
        // step's sys_id (fieldValues isn't a `script` field, so it doesn't get GEM substitution) --
        // do the server-side DB assertion in a script instead, where interpolation is supported.
        atf.server.runServerSideScript({
            $id: Now.ID['atf-ec-validate-booked-appt'],
            jasmineVersion: '3.1',
            script: `
                (function (outputs, steps, params, stepResult, assertEqual) {
                    var gr = new GlideRecord('u_hr_mtg_appointment')
                    gr.addQuery('hr_case', '${hrCase.record_id}')
                    gr.addQuery('status', 'booked')
                    gr.query()
                    assertEqual({ name: 'booked appointment exists for the case', shouldbe: true, value: gr.next() })
                    stepResult.setOutputMessage('Confirmed a u_hr_mtg_appointment with status=booked exists for the case')
                })(outputs, steps, params, stepResult, assertEqual)
            `,
        })
    }
)
