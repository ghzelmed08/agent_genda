import "@servicenow/sdk/global";
import {
  Table,
  ReferenceColumn,
  DateColumn,
  TimeColumn,
  BooleanColumn,
  ChoiceColumn,
} from "@servicenow/sdk/core";

// Agent Availability: defines time slots when HR agents are free for meetings
export const u_hr_mtg_availability = Table({
  name: "u_hr_mtg_availability",
  label: "HR Meeting Availability",
  display: "agent",
  accessible_from: "public",
  allow_web_service_access: true,
  actions: ["create", "read", "update", "delete"],
  auto_number: {
    prefix: "AVAIL",
    number: 1000,
    number_of_digits: 7,
  },
  schema: {
    agent: ReferenceColumn({
      label: "HR Agent",
      referenceTable: "sys_user",
      mandatory: true,
      referenceQual: "active=true",
    }),
    date: DateColumn({
      label: "Date",
      mandatory: true,
    }),
    start_time: TimeColumn({
      label: "Start Time",
      mandatory: true,
    }),
    end_time: TimeColumn({
      label: "End Time",
      mandatory: true,
    }),
    day_of_week: ChoiceColumn({
      label: "Day of Week",
      dropdown: "dropdown_with_none",
      choices: {
        monday: { label: "Monday", sequence: 0 },
        tuesday: { label: "Tuesday", sequence: 1 },
        wednesday: { label: "Wednesday", sequence: 2 },
        thursday: { label: "Thursday", sequence: 3 },
        friday: { label: "Friday", sequence: 4 },
        saturday: { label: "Saturday", sequence: 5 },
        sunday: { label: "Sunday", sequence: 6 },
      },
    }),
    recurring: BooleanColumn({
      label: "Recurring Weekly",
      default: false,
    }),
    active: BooleanColumn({
      label: "Active",
      default: true,
    }),
  },
});
