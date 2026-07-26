import { gs, GlideRecord } from "@servicenow/glide";

/**
 * Eligibility gate: verifies the employee has an active HR case
 * with the specified agent before allowing an appointment to be created.
 *
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
