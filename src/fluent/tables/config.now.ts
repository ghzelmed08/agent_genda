import "@servicenow/sdk/global";
import { Table, ReferenceColumn, ChoiceColumn, Acl } from "@servicenow/sdk/core";
import { hr_mtg_admin } from "../security/roles-acls.now";

/**
 * Singleton configuration table for the HR Agent Agenda application.
 * Holds application-wide settings such as the default fallback schedule.
 *
 * Availability priority (unchanged): u_hr_mtg_availability (manual, per-agent) is always
 * checked first; this config's default_schedule_span is only a fallback for agents with no
 * manual availability records. It is never used to materialize u_hr_mtg_availability rows --
 * computed on the fly on every request instead, so a future availability_source switch (e.g.
 * to an Outlook-backed source) doesn't leave stale generated records behind.
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
    // Mandatory and filtered to spans of the selected default_schedule with show_as=free --
    // there is no way to save a config pointing at a busy/tentative span, or a span that
    // belongs to a different schedule. A client script clears this field whenever
    // default_schedule changes (see forms.now.ts), since a previously-selected span would
    // otherwise silently belong to the old schedule.
    default_schedule_span: ReferenceColumn({
      label: "Default Schedule Span",
      referenceTable: "cmn_schedule_span",
      mandatory: true,
      useReferenceQualifier: "advanced",
      referenceQual: "javascript:'schedule=' + current.default_schedule + '^show_as=free'",
    }),
    // Anchor point for a future availability source (e.g. Outlook Calendar). Only "schedule"
    // is implemented today; "outlook" is a reserved placeholder.
    availability_source: ChoiceColumn({
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
