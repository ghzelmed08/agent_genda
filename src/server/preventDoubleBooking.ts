import { gs, GlideRecord } from "@servicenow/glide";

/**
 * Prevents double-booking: ensures no other non-cancelled appointment exists
 * for the same agent on the same date with overlapping time.
 *
 * Default export, not named: see the comment in server/hr_meeting/getAgenda.ts -- the Fluent
 * SDK generates a destructured require() wrapper for a named export used as a business rule's
 * `script:`, and that destructuring isn't supported by ServiceNow's script engine. A default
 * export avoids it.
 */
export default function preventDoubleBooking(current: any) {
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
