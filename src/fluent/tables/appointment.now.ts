import "@servicenow/sdk/global";
import {
  Table,
  ReferenceColumn,
  DateColumn,
  TimeColumn,
  ChoiceColumn,
  StringColumn,
} from "@servicenow/sdk/core";

// Appointment: booked meetings between employees and HR agents
export const u_hr_mtg_appointment = Table({
  name: "u_hr_mtg_appointment",
  label: "HR Meeting Appointment",
  display: "employee",
  accessible_from: "public",
  allow_web_service_access: true,
  actions: ["create", "read", "update", "delete"],
  auto_number: {
    prefix: "APPT",
    number: 1000,
    number_of_digits: 7,
  },
  schema: {
    employee: ReferenceColumn({
      label: "Employee",
      referenceTable: "sys_user",
      mandatory: true,
      referenceQual: "active=true",
    }),
    hr_agent: ReferenceColumn({
      label: "HR Agent",
      referenceTable: "sys_user",
      mandatory: true,
      referenceQual: "active=true",
    }),
    hr_case: ReferenceColumn({
      label: "HR Case",
      referenceTable: "sn_hr_core_case",
      mandatory: true,
    }),
    date: DateColumn({
      label: "Appointment Date",
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
    meeting_type: ChoiceColumn({
      label: "Meeting Type",
      mandatory: true,
      dropdown: "dropdown_without_none",
      default: "video",
      choices: {
        call: { label: "Phone Call", sequence: 0 },
        video: { label: "Video Conference", sequence: 1 },
        in_person: { label: "In-Person", sequence: 2 },
      },
    }),
    status: ChoiceColumn({
      label: "Status",
      mandatory: true,
      dropdown: "dropdown_without_none",
      default: "booked",
      choices: {
        booked: { label: "Booked", sequence: 0 },
        completed: { label: "Completed", sequence: 1 },
        cancelled: { label: "Cancelled", sequence: 2 },
        no_show: { label: "No Show", sequence: 3 },
      },
    }),
    notes: StringColumn({
      label: "Notes",
      maxLength: 500,
    }),
    cancellation_reason: StringColumn({
      label: "Cancellation Reason",
      maxLength: 255,
    }),
  },
});
