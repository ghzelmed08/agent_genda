import { ScheduledScript } from '@servicenow/sdk/core'

// Artifact C, corrected: frequency: 'once' with an omitted (build-time-computed)
// executionStart turned out to never fire at all. Confirmed empirically on the instance:
// the resulting sysauto_script's run_start (12:10:27, build time) was already before its
// own sys_created_on (12:13:18, actual install time), and unlike the daily job below, it
// never got a sys_trigger created for it -- ServiceNow does not schedule a 'once' job whose
// start time has already passed at record-creation time. Recurring frequencies don't have
// this problem: they always compute the next future occurrence from "now", which is exactly
// why the daily job's trigger was correctly scheduled despite the same build->deploy lag.
//
// Fix: use frequency: 'periodically' (recurring, so it recomputes from "now" and reliably
// gets a trigger) with a short interval, bounded by executionEnd so it stops repeating once
// the catch-up window has passed -- it only exists to close the gap until the daily job's
// first run, not to run forever.
//
// executionEnd is a fixed literal date, not computed: Fluent .now.ts files are a restricted
// declarative DSL, not executable code -- confirmed by build errors when this file tried to
// declare a function / use `new Date()` / annotate types ("Node kind ... is not allowed in
// Fluent files", "Unsupported statement in Fluent source file"). There is no supported way to
// compute "now + N hours" here (only `executionStart`, when omitted, is auto-populated by
// Fluent itself at build time). Set to a week after this was written (2026-07-22); if this
// project is rebuilt long after that date, bump it -- the daily job below remains correct
// regardless, since recurring frequencies always reschedule from "now".
export const HrMtgAgendaTabInstallJob = ScheduledScript({
    $id: Now.ID['hr-mtg-agenda-tab-install-job'],
    name: 'HR Agent Agenda Tab Automation - Catch-up (bounded, periodic)',
    script: Now.include('../../server/hr_meeting/scheduled-scripts/hr-mtg-agenda-tab-once.js'),
    frequency: 'periodically',
    executionInterval: { minutes: 15 },
    executionEnd: '2026-07-29 00:00:00',
    advanced: true,
})

// Artifact B: recurring safety net. Idempotent, so running alongside the once-at-install
// job above never creates duplicate tabs -- it only matters if a new Standard Ticket
// Configuration or COE child table shows up after install.
// Daily safety net: ensures the "HR Agent Agenda" tab exists on every active Standard
// Ticket Configuration for sn_hr_core_case and its non-excluded COE child tables.
// Idempotent -- creates nothing when already in place.
export const HrMtgAgendaTabDailyJob = ScheduledScript({
    $id: Now.ID['hr-mtg-agenda-tab-daily-job'],
    name: 'HR Agent Agenda Tab Automation - Daily',
    script: Now.include('../../server/hr_meeting/scheduled-scripts/hr-mtg-agenda-tab-daily.js'),
    frequency: 'daily',
    executionTime: { hours: 2, minutes: 0 },
})
