import { gs, GlideRecord } from "@servicenow/glide";

/**
 * Prevents double-booking: ensures no other non-cancelled appointment exists
 * for the same agent on the same date with overlapping time.
 */
export function preventDoubleBooking(current: any) {
  var agent = current.getValue("hr_agent");
  var date = current.getValue("date");
  var startTime = current.getValue("start_time");
  var endTime = current.getValue("end_time");

  var gr = new GlideRecord("u_hr_mtg_appointment");
  gr.addQuery("hr_agent", agent);
  gr.addQuery("date", date);
  gr.addQuery("status", "!=", "cancelled");
  gr.addQuery("sys_id", "!=", current.getUniqueValue());
  // Check for time overlap: existing.start < new.end AND existing.end > new.start
  gr.addQuery("start_time", "<", endTime);
  gr.addQuery("end_time", ">", startTime);
  gr.query();

  if (gr.hasNext()) {
    gs.addErrorMessage(
      "This time slot is already booked for the selected agent. Please choose a different time."
    );
    current.setAbortAction(true);
  }
}

/**
 * Eligibility gate: verifies the employee has an active HR case 
 * with the specified agent before allowing an appointment to be created.
 */
export function checkEligibility(current: any) {
  var employee = current.getValue("employee");
  var hrCase = current.getValue("hr_case");
  var agent = current.getValue("hr_agent");

  // Verify the HR case exists, is active, and involves the specified employee and agent
  var gr = new GlideRecord("sn_hr_core_case");
  gr.addQuery("sys_id", hrCase);
  gr.addQuery("active", true);
  gr.addQuery("opened_for", employee);
  gr.addQuery("assigned_to", agent);
  gr.query();

  if (!gr.hasNext()) {
    gs.addErrorMessage(
      "Appointment cannot be created: the employee does not have an active HR case assigned to the selected agent."
    );
    current.setAbortAction(true);
  }
}
