import "@servicenow/sdk/global";
import { Table, ReferenceColumn, Acl } from "@servicenow/sdk/core";
import { hr_mtg_admin } from "../security/roles-acls.now";

/**
 * Singleton configuration table for the HR Agent Agenda application.
 * Holds application-wide settings such as the default fallback schedule.
 */
export const u_hr_mtg_config = Table({
  name: "u_hr_mtg_config",
  label: "HR Meeting Scheduler Configuration",
  display: "default_schedule",
  accessible_from: "public",
  allow_web_service_access: true,
  actions: ["create", "read", "update", "delete"],
  schema: {
    default_schedule: ReferenceColumn({
      label: "Default Schedule",
      referenceTable: "cmn_schedule",
      mandatory: false,
    }),
  },
});

// ACLs — Configuration table: admin only
Acl({
  $id: Now.ID["acl_config_read"],
  type: "record",
  table: "u_hr_mtg_config",
  operation: "read",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to read HR Meeting Scheduler configuration.",
});

Acl({
  $id: Now.ID["acl_config_write"],
  type: "record",
  table: "u_hr_mtg_config",
  operation: "write",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to update HR Meeting Scheduler configuration.",
});

Acl({
  $id: Now.ID["acl_config_create"],
  type: "record",
  table: "u_hr_mtg_config",
  operation: "create",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to create HR Meeting Scheduler configuration.",
});

Acl({
  $id: Now.ID["acl_config_delete"],
  type: "record",
  table: "u_hr_mtg_config",
  operation: "delete",
  roles: [hr_mtg_admin],
  active: true,
  adminOverrides: true,
  description: "Allow only admins to delete HR Meeting Scheduler configuration.",
});
