import "@servicenow/sdk/global";
import { Table, ReferenceColumn, ChoiceColumn, Acl } from "@servicenow/sdk/core";
import { hr_mtg_admin } from "../security/roles-acls.now";

/**
 * Singleton configuration table for the HR Agent Agenda application.
 * Holds application-wide settings such as the default fallback schedule.
 *
 * Availability priority (unchanged): u_hr_mtg_availability (manual, per-agent) is always
 * checked first; this config's u_default_schedule_span is only a fallback for agents with no
 * manual availability records. It is never used to materialize u_hr_mtg_availability rows --
 * computed on the fly on every request instead, so a future u_availability_source switch (e.g.
 * to an Outlook-backed source) doesn't leave stale generated records behind.
 *
 * Field names carry a u_ prefix because the Fluent-managed schema for this table was never
 * applied by install/reinstall on this instance (unresolved platform limitation); the 3 fields
 * were created manually via the table's Column editor, which enforces the u_ prefix on custom
 * columns added through the UI. Kept here to document the live schema even though this
 * definition itself has no effect on the instance.
 */
export const u_hr_mtg_config = Table({
  name: "u_hr_mtg_config",
  label: "HR Meeting Scheduler Configuration",
  display: "u_default_schedule",
  accessible_from: "public",
  allow_web_service_access: true,
  actions: ["create", "read", "update", "delete"],
  schema: {
    u_default_schedule: ReferenceColumn({
      label: "Default Schedule",
      referenceTable: "cmn_schedule",
      mandatory: false,
    }),
    // TEMP DIAGNOSTIC: advanced javascript: referenceQual stripped out to test whether it is
    // what silently prevents this whole table's schema from being applied on install. Revert to
    // the advanced qualifier once confirmed/denied.
    u_default_schedule_span: ReferenceColumn({
      label: "Default Schedule Span",
      referenceTable: "cmn_schedule_span",
      mandatory: true,
    }),
    // Anchor point for a future availability source (e.g. Outlook Calendar). Only "schedule"
    // is implemented today; "outlook" is a reserved placeholder.
    u_availability_source: ChoiceColumn({
      label: "Availability Source",
      dropdown: "dropdown_without_none",
      default: "schedule",
      choices: {
        schedule: { label: "Schedule (default_schedule_span)", sequence: 0 },
        outlook: { label: "Outlook Calendar (not yet implemented)", sequence: 1 },
      },
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
