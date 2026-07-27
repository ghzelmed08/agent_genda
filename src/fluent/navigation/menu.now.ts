import "@servicenow/sdk/global";
import { ApplicationMenu, Record } from "@servicenow/sdk/core";

// Application Menu: HR Meeting Scheduler
const hrMeetingMenu = ApplicationMenu({
  $id: Now.ID["hr_meeting_menu"],
  title: "HR Meeting Scheduler",
  hint: "Schedule and manage HR meetings between employees and agents",
  description: "HR Meeting Scheduler1 application navigation",
  active: true,
  order: 500,
});

// Module: My Agenda (for HR Agents - filtered appointments list)
Record({
  $id: Now.ID["module_my_agenda"],
  table: "sys_app_module",
  data: {
    title: "My Agenda",
    application: hrMeetingMenu,
    link_type: "LIST",
    name: "u_hr_mtg_appointment",
    filter:
      "hr_agent=javascript:gs.getUserID()^status!=cancelled^ORDERBYdate^ORDERBYstart_time",
    hint: "View your upcoming appointments",
    roles: ["sn_hr_core.basic", "global.hr_mtg_admin"],
    active: true,
    order: 100,
  },
});

// Module: All Appointments (for admins)
Record({
  $id: Now.ID["module_all_appointments"],
  table: "sys_app_module",
  data: {
    title: "All Appointments",
    application: hrMeetingMenu,
    link_type: "LIST",
    name: "u_hr_mtg_appointment",
    hint: "View all scheduled appointments",
    roles: ["global.hr_mtg_admin"],
    active: true,
    order: 200,
  },
});

// Module: Manage Availability (for agents to manage their slots)
Record({
  $id: Now.ID["module_manage_availability"],
  table: "sys_app_module",
  data: {
    title: "Manage Availability",
    application: hrMeetingMenu,
    link_type: "LIST",
    name: "u_hr_mtg_availability",
    filter: "agent=javascript:gs.getUserID()",
    hint: "Manage your availability slots",
    roles: ["sn_hr_core.basic", "global.hr_mtg_admin"],
    active: true,
    order: 300,
  },
});

// Module: Book a Meeting (link to the UI Page for employees)
Record({
  $id: Now.ID["module_book_meeting"],
  table: "sys_app_module",
  data: {
    title: "Book a Meeting",
    application: hrMeetingMenu,
    link_type: "DIRECT",
    query: "hr_meeting_scheduler.do",
    hint: "Book a meeting with your HR agent",
    roles: ["sn_hr_sp.hrsp_employee", "sn_hr_core.basic", "global.hr_mtg_admin"],
    active: true,
    order: 400,
  },
});

// Module: Administration -- a SEPARATOR (non-navigable header), not a real link. sys_app_module
// has no parent/category field, so a bold section header followed by its "child" modules
// (ordered right after it) is the standard ServiceNow way to visually group modules -- there is
// no true nested-module mechanism in the classic Application Navigator.
Record({
  $id: Now.ID["module_admin_separator"],
  table: "sys_app_module",
  data: {
    title: "Administration",
    application: hrMeetingMenu,
    link_type: "SEPARATOR",
    roles: ["global.hr_mtg_admin"],
    active: true,
    order: 500,
  },
});

// Module: Availability Schedule (singleton configuration for default schedule) -- under Administration
Record({
  $id: Now.ID["module_availability_schedule"],
  table: "sys_app_module",
  data: {
    title: "Availability Schedule",
    application: hrMeetingMenu,
    link_type: "LIST",
    name: "u_hr_mtg_config",
    hint: "Manage the default fallback availability schedule used when an agent has no manual availability records",
    roles: ["global.hr_mtg_admin"],
    active: true,
    order: 510,
  },
});

// Module: Properties -- under Administration, links to the System Property Page defined in
// administration/properties.now.ts
Record({
  $id: Now.ID["module_properties"],
  table: "sys_app_module",
  data: {
    title: "Properties",
    application: hrMeetingMenu,
    link_type: "DIRECT",
    query: "system_properties_ui.do?sysparm_title=HR Meeting Scheduler Properties&sysparm_category=HR Meeting Scheduler Properties",
    hint: "Manage HR Meeting Scheduler system properties",
    roles: ["global.hr_mtg_admin"],
    active: true,
    order: 520,
  },
});
