import "@servicenow/sdk/global";
import { EmailNotification } from "@servicenow/sdk/core";

// Notify the HR agent when an employee books a new appointment
EmailNotification({
  $id: Now.ID["notify_agent_new_booking"],
  table: "u_hr_mtg_appointment",
  name: "New Appointment Booked - Agent Notification",
  description:
    "Sends an email to the HR agent when a new appointment is created, including date, time, type, employee, and case details.",
  active: true,
  mandatory: true,
  triggerConditions: {
    generationType: "engine",
    onRecordInsert: true,
    onRecordUpdate: false,
  },
  recipientDetails: {
    recipientFields: ["hr_agent"],
    sendToCreator: false,
  },
  emailContent: {
    contentType: "text/html",
    subject:
      "New Meeting Booked: ${meeting_type} on ${date} at ${start_time}",
    messageHtml: `<h2>New Appointment Scheduled</h2>
<p>A new meeting has been booked with you.</p>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Employee</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${employee}</td>
  </tr>
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Date</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${date}</td>
  </tr>
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Time</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${start_time} - \${end_time}</td>
  </tr>
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Meeting Type</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${meeting_type}</td>
  </tr>
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">HR Case</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${hr_case}</td>
  </tr>
  <tr>
    <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Notes</td>
    <td style="padding: 8px; border-bottom: 1px solid #ddd;">\${notes}</td>
  </tr>
</table>
<p style="margin-top: 16px;">Please review and prepare for this meeting.</p>`,
    importance: "high",
  },
});
