import "@servicenow/sdk/global";
import { Property, Record } from "@servicenow/sdk/core";

// Application-wide system properties, grouped under a System Property Page (accessible via the
// "Properties" navigation module -- see navigation/menu.now.ts).

export const slotDurationMinutes = Property({
  $id: Now.ID["prop_slot_duration_minutes"],
  name: "u_hr_mtg.slot_duration_minutes",
  type: "integer",
  value: "30",
  description: "Length, in minutes, of each bookable slot shown in the HR Agent Agenda widget.",
  ignoreCache: true,
  roles: {
    read: ["global.hr_mtg_admin"],
    write: ["global.hr_mtg_admin"],
  },
});

// The System Property Page (category) that groups our properties in a dedicated admin page,
// linked from the "Properties" navigation module via system_properties_ui.do?sysparm_category=...
const propertyCategory = Record({
  $id: Now.ID["hr_mtg_properties_category"],
  table: "sys_properties_category",
  data: {
    name: "HR Meeting Scheduler Properties",
    title: "HR Meeting Scheduler Properties",
  },
});

// Links the property above to the category page.
Record({
  $id: Now.ID["hr_mtg_properties_category_m2m_slot_duration"],
  table: "sys_properties_category_m2m",
  data: {
    category: propertyCategory,
    property: slotDurationMinutes,
    order: 100,
  },
});
