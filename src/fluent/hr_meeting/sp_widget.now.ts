import { SPWidget } from '@servicenow/sdk/core'

// Employee Center / Service Portal widget for the hrm_ticket_page (e.g. /esc?id=hrm_ticket_page&
// table=sn_hr_core_case_payroll&sys_id=...). Reads table + sys_id from the page URL and talks to
// the hr_mtg_scheduler REST API for the availability grid and booking.
SPWidget({
    $id: Now.ID['hr-mtg-agenda-widget'],
    name: 'HR Agent Agenda',
    id: 'hr_mtg_agenda_widget',
    htmlTemplate: Now.include('../../server/hr_meeting/sp_widget/agenda-widget.html'),
    serverScript: Now.include('../../server/hr_meeting/sp_widget/agenda-widget.server.js'),
    clientScript: Now.include('../../server/hr_meeting/sp_widget/agenda-widget.client.js'),
    customCss: Now.include('../../server/hr_meeting/sp_widget/agenda-widget.scss'),
    hasPreview: false,
    // Must be public: this widget is embedded directly on the Employee Center HR case page via
    // ticket_tab_configuration, where the viewer is the case's own "opened for" employee -- who
    // typically holds no special role. A non-public sp_widget fails to load for such users
    // (surfaces as "Unable to load widget" on the tab), even though an hr_mtg agent/admin loads it
    // fine. Actual data authorization is still enforced server-side in agendaService.canAccessCase
    // (opened_for === current user, or an hr_mtg agent/admin role) on every /agenda and /book call,
    // so making the widget shell public does not expose case data to anyone else.
    public: true,
})
