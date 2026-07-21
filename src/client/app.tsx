import React, { useState, useEffect } from "react";
import { NowRecordListConnected } from "@servicenow/react-components/NowRecordListConnected";
import { RecordProvider } from "@servicenow/react-components/RecordContext";
import { FormActionBar } from "@servicenow/react-components/FormActionBar";
import { FormColumnLayout } from "@servicenow/react-components/FormColumnLayout";
import { Button } from "@servicenow/react-components/Button";
import "./app.css";

function getParams() {
  return new URLSearchParams(window.location.search);
}

function navigateToView(view: string, params?: Record<string, string>) {
  const sp = new URLSearchParams();
  sp.set("view", view);
  if (params) {
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
  }
  const path = window.location.pathname + "?" + sp.toString();
  if (window.self !== window.top) {
    (window as any).CustomEvent.fireTop("magellanNavigator.permalink.set", {
      relativePath: path,
      title: "HR Meeting Scheduler",
    });
  } else {
    window.history.pushState({}, "", path);
    document.title = "HR Meeting Scheduler";
  }
  window.dispatchEvent(new Event("popstate"));
}

export default function App() {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const handler = () => setUpdate((n) => n + 1);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const params = getParams();
  const view = params.get("view") || "cases";

  if (view === "book") {
    return <BookView params={params} />;
  }
  if (view === "slots") {
    return <SlotsView params={params} />;
  }
  return <CasesView />;
}

function CasesView() {
  return (
    <div className="hr-mtg-page">
      <div className="hr-mtg-header">
        <h1 className="hr-mtg-title">Book a Meeting with Your HR Agent</h1>
        <p className="hr-mtg-subtitle">
          Select one of your active HR cases to view available meeting times.
        </p>
      </div>
      <NowRecordListConnected
        table="sn_hr_core_case"
        listTitle="My Active HR Cases"
        columns="number,short_description,assigned_to,state"
        key="active=true^opened_for=javascript:gs.getUserID()"
        onRowClicked={(e: any) => {
          const sysId = e.detail.payload.sys_id;
          navigateToView("slots", { case_id: sysId });
        }}
        hideHeader={false}
        onNewActionClicked={() => navigateToView("cases")}
      />
    </div>
  );
}

function SlotsView({ params }: { params: URLSearchParams }) {
  const caseId = params.get("case_id") || "";

  return (
    <div className="hr-mtg-page">
      <div className="hr-mtg-header">
        <Button
          label="← Back to Cases"
          variant="secondary"
          onClicked={() => navigateToView("cases")}
        />
        <h1 className="hr-mtg-title">Available Time Slots</h1>
        <p className="hr-mtg-subtitle">
          Select an available time slot to book your meeting.
        </p>
      </div>
      <NowRecordListConnected
        table="u_hr_mtg_availability"
        listTitle="Available Slots"
        columns="agent,date,start_time,end_time,day_of_week"
        key="active=true"
        onRowClicked={(e: any) => {
          const slotId = e.detail.payload.sys_id;
          navigateToView("book", { case_id: caseId, slot_id: slotId });
        }}
        hideHeader={false}
        onNewActionClicked={() => navigateToView("slots", { case_id: caseId })}
      />
    </div>
  );
}

function BookView({ params }: { params: URLSearchParams }) {
  const caseId = params.get("case_id") || "";

  return (
    <div className="hr-mtg-page">
      <div className="hr-mtg-header">
        <Button
          label="← Back to Slots"
          variant="secondary"
          onClicked={() => navigateToView("slots", { case_id: caseId })}
        />
        <h1 className="hr-mtg-title">Book Your Appointment</h1>
        <p className="hr-mtg-subtitle">
          Fill in the details below to confirm your meeting.
        </p>
      </div>
      <RecordProvider table="u_hr_mtg_appointment" sysId="-1" isReadOnly={false}>
        <FormActionBar />
        <FormColumnLayout />
      </RecordProvider>
    </div>
  );
}
