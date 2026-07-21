import "@servicenow/sdk/global";
import { Form, default_view } from "@servicenow/sdk/core";

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
