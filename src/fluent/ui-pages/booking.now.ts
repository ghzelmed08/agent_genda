import "@servicenow/sdk/global";
import { UiPage } from "@servicenow/sdk/core";
import page from "../../client/index.html";

export const hr_meeting_scheduler = UiPage({
  $id: Now.ID["hr_meeting_scheduler_page"],
  endpoint: "hr_meeting_scheduler.do",
  html: page,
  direct: true,
});
