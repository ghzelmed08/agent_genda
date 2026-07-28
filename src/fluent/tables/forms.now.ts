import "@servicenow/sdk/global";
import { Form, default_view, ClientScript } from "@servicenow/sdk/core";

// Default form view for Availability table
Form({
  table: "u_hr_mtg_availability",
  view: default_view,
  sections: [
    {
      caption: "General",
      content: [
        {
          layout: "two-column",
          leftElements: [
            { field: "agent", type: "table_field" },
            { field: "date", type: "table_field" },
            { field: "day_of_week", type: "table_field" },
          ],
          rightElements: [
            { field: "start_time", type: "table_field" },
            { field: "end_time", type: "table_field" },
            { field: "recurring", type: "table_field" },
          ],
        },
        {
          layout: "one-column",
          elements: [{ field: "active", type: "table_field" }],
        },
      ],
    },
  ],
});

// Default form view for Appointment table
Form({
  table: "u_hr_mtg_appointment",
  view: default_view,
  sections: [
    {
      caption: "General",
      content: [
        {
          layout: "two-column",
          leftElements: [
            { field: "employee", type: "table_field" },
            { field: "hr_agent", type: "table_field" },
            { field: "hr_case", type: "table_field" },
            { field: "meeting_type", type: "table_field" },
          ],
          rightElements: [
            { field: "date", type: "table_field" },
            { field: "start_time", type: "table_field" },
            { field: "end_time", type: "table_field" },
            { field: "status", type: "table_field" },
          ],
        },
        {
          layout: "one-column",
          elements: [
            { field: "notes", type: "table_field" },
            { field: "cancellation_reason", type: "table_field" },
          ],
        },
      ],
    },
  ],
});

// Default form view for the Configuration (singleton) table
Form({
  table: "u_hr_mtg_config",
  view: default_view,
  sections: [
    {
      caption: "Default Availability Schedule",
      content: [
        {
          layout: "one-column",
          elements: [
            { field: "u_default_schedule", type: "table_field" },
            { field: "u_default_schedule_span", type: "table_field" },
            { field: "u_availability_source", type: "table_field" },
          ],
        },
      ],
    },
  ],
});

// Clears the previously-selected span whenever the schedule changes, since a span from the
// old schedule would otherwise remain selected (and fail the u_default_schedule_span reference
// qualifier, which requires schedule = the currently selected u_default_schedule).
ClientScript({
  $id: Now.ID["cs_config_clear_span_on_schedule_change"],
  name: "Clear Default Schedule Span on Schedule Change",
  table: "u_hr_mtg_config",
  type: "onChange",
  field: "u_default_schedule",
  uiType: "all",
  active: true,
  isolateScript: false,
  appliesExtended: false,
  description: "Clears u_default_schedule_span whenever u_default_schedule changes, since it would otherwise still reference a span from the previous schedule.",
  script: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
        if (isLoading || newValue === oldValue) {
            return;
        }
        g_form.setValue('u_default_schedule_span', '');
    }`,
});
