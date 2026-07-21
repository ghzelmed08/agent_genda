import "@servicenow/sdk/global";
import { Role, Acl } from "@servicenow/sdk/core";

// ──────────────────────────────────────────────
// ROLES
// ──────────────────────────────────────────────

// Employee: can view availability and create/view their own appointments
const hr_mtg_employee = Role({
  name: "global.hr_mtg_employee",
  description:
    "HR Meeting Scheduler - Employee: can view agent availability and book appointments linked to their HR case.",
});

// HR Agent: can manage their own availability and view/update appointments
const hr_mtg_agent = Role({
  name: "global.hr_mtg_agent",
  description:
    "HR Meeting Scheduler - Agent: can manage availability slots and view/update appointments.",
  containsRoles: [hr_mtg_employee],
});

// HR Admin: full CRUD on both tables; contains agent role
export const hr_mtg_admin = Role({
  name: "global.hr_mtg_admin",
  description:
    "HR Meeting Scheduler - Admin: full access to availability and appointment records.",
  containsRoles: [hr_mtg_agent],
});

// ──────────────────────────────────────────────
// ACLs — Availability table
// ──────────────────────────────────────────────

// Read availability: employee, agent, admin
Acl({
  $id: Now.ID["acl_avail_read"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "read",
  roles: [hr_mtg_employee, hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, agents, and admins to read availability slots.",
});

// Create availability: agent, admin
Acl({
  $id: Now.ID["acl_avail_create"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "create",
  roles: [hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow agents and admins to create availability slots.",
});

// Write availability: agent, admin
Acl({
  $id: Now.ID["acl_avail_write"],
  type: "record",
  table: "u_hr_mtg_availability",
  operation: "write",
  roles: [hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow agents and admins to update availability slots.",
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

// Read appointment: employee, agent, admin
Acl({
  $id: Now.ID["acl_appt_read"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "read",
  roles: [hr_mtg_employee, hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, agents, and admins to read appointments.",
});

// Create appointment: employee, agent, admin
Acl({
  $id: Now.ID["acl_appt_create"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "create",
  roles: [hr_mtg_employee, hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow employees, agents, and admins to create appointments.",
});

// Write appointment: agent, admin
Acl({
  $id: Now.ID["acl_appt_write"],
  type: "record",
  table: "u_hr_mtg_appointment",
  operation: "write",
  roles: [hr_mtg_agent, hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow agents and admins to update appointments.",
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
