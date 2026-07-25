import { ScheduledScript } from '@servicenow/sdk/core'

// Idempotent installation job: creates the default cmn_schedule, cmn_schedule_span,
// and u_hr_mtg_config records if they don't already exist.
// Uses the same bounded periodic pattern as the tab automation install job to work
// around the platform limitation where 'once' jobs with a past run_start never fire.
export const HrMtgDefaultScheduleInstallJob = ScheduledScript({
    $id: Now.ID['hr-mtg-default-schedule-install-job'],
    name: 'HR Agent Agenda Default Schedule - Init (bounded, periodic)',
    script: Now.include('../../server/hr_meeting/scheduled-scripts/hr-mtg-default-schedule-init.js'),
    frequency: 'periodically',
    executionInterval: { minutes: 15 },
    executionEnd: '2026-07-29 00:00:00',
    advanced: true,
})
