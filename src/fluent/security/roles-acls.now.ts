import "@servicenow/sdk/global";
import { Role, Acl } from "@servicenow/sdk/core";

// ──────────────────────────────────────────────
// ROLES
// ──────────────────────────────────────────────

// Baseline access is granted through standard, out-of-box ServiceNow HRSD roles instead of
// app-specific ones, so any HR agent/employee already provisioned for HRSD can use this app
// without a separate role assignment:
//   - sn_hr_core.basic: the minimum role for HR agents. Out of the box, any holder can read/write
//     all HR cases (except ER/Lifecycle Events, which use separate roles) -- so any HR agent can
//     manage their own availability and view/update appointments without needing an app role.
//   - sn_hr_sp.hrsp_employee: grants portal access to Employee Center (ESC) for employees. This is
//     the role ServiceNow itself uses to gate ESC access, so it's sufficient on its own for an
//     employee to view availability and book/view their own appointments.
const HR_AGENT_BASIC_ROLE = "sn_hr_core.basic";
const EMPLOYEE_CENTER_ROLE = "sn_hr_sp.hrsp_employee";

// HR Admin: the only role this app still defines itself, reserved for genuinely admin-only
// actions (deleting records, application configuration). Contains the two standard roles above,
// so an admin automatically has agent- and employee-level access too.
export const hr_mtg_admin = Role({
  name: "global.hr_mtg_admin",
  description:
    "HR Meeting Scheduler - Admin: full access to availability and appointment records, and application configuration.",
  containsRoles: [HR_AGENT_BASIC_ROLE, EMPLOYEE_CENTER_ROLE],
});

// ──────────────────────────────────────────────
// ACLs — Availability table
// ──────────────────────────────────────────────

// Read availability: any HR agent, any employee (ESC), or admin
Acl({
  $id: Now.ID["acl_avail_read"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "read",
  roles: [EMPLOYEE_CENTER_ROLE, HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, HR agents, and admins to read availability slots.",
});

// Create availability: any HR agent (managing their own slots), or admin
Acl({
  $id: Now.ID["acl_avail_create"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "create",
  roles: [HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow any HR agent to create their own availability slots; admins can create for anyone.",
});

// Write availability: any HR agent, or admin
Acl({
  $id: Now.ID["acl_avail_write"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "write",
  roles: [HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow any HR agent to update their own availability slots; admins can update any.",
});

// Delete availability: admin only
Acl({
  $id: Now.ID["acl_avail_delete"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "delete",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to delete availability slots.",
});

// ──────────────────────────────────────────────
// ACLs — Appointment table
// ──────────────────────────────────────────────

// Read appointment: any HR agent, any employee (ESC), or admin
Acl({
  $id: Now.ID["acl_appt_read"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "read",
  roles: [EMPLOYEE_CENTER_ROLE, HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, HR agents, and admins to read appointments.",
});

// Create appointment: any employee (booking their own meeting), any HR agent, or admin
Acl({
  $id: Now.ID["acl_appt_create"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "create",
  roles: [EMPLOYEE_CENTER_ROLE, HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, HR agents, and admins to create appointments.",
});

// Write appointment: any HR agent, or admin
Acl({
  $id: Now.ID["acl_appt_write"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "write",
  roles: [HR_AGENT_BASIC_ROLE, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow any HR agent to update appointments; admins can update any.",
});

// Delete appointment: admin only
Acl({
  $id: Now.ID["acl_appt_delete"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "delete",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to delete appointments.",
});
