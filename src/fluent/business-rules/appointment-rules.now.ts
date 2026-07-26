import "@servicenow/sdk/global";
import { BusinessRule } from "@servicenow/sdk/core";
import { preventDoubleBooking } from "../../server/preventDoubleBooking";
import { checkEligibility } from "../../server/checkEligibility";

// Prevent double-booking: abort if the agent already has an appointment at that time
BusinessRule({
  $id: Now.ID["br_prevent_double_booking"],
  name: "Prevent Double Booking",
  table: "u_hr_mtg_appointment",
  when: "before",
  action: ["insert"],
  order: 100,
  active: true,
  description:
    "Prevents creating an appointment if the HR agent already has a non-cancelled appointment at the same date/time.",
  script: preventDoubleBooking,
});

// Eligibility check: abort if employee has no active case with the agent
BusinessRule({
  $id: Now.ID["br_check_eligibility"],
  name: "Check Employee Eligibility",
  table: "u_hr_mtg_appointment",
  when: "before",
  action: ["insert"],
  order: 50,
  active: true,
  description:
    "Verifies the employee has an active HR case assigned to the selected agent before allowing appointment creation.",
  script: checkEligibility,
});
