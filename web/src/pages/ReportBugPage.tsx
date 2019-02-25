import React from "react"
import { Link } from "react-router-dom"
import { api } from "../api"
import { AppContext } from "../AppContext"

export function ReportBugPage() {
  const [bugReport, setBugReport] = React.useState("")
  const [response, setResponse] = React.useState("")
  const app = React.useContext(AppContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const submit = await api.bugReport(bugReport, app.authToken!)
    setBugReport("")
    setResponse("Bug Report Submitted")
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <Link
          className="button"
          to="/"
          style={{ display: "flex", margin: 20, padding: 15 }}
        >
          Return
        </Link>
      </div>
      <div
        style={{
          height: window.innerHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Report Bug</h1>
        <form
          id={"bugReportForm"}
          onSubmit={handleSubmit}
          style={{ flexDirection: "row" }}
        >
          <textarea
            id={"bugReportText"}
            value={bugReport}
            onChange={e => setBugReport(e.target.value)}
            wrap="true"
            style={{ height: 200, width: 570, resize: "none" }}
          />
        </form>
        <input
          form={"bugReportForm"}
          style={{ margin: 8 }}
          type="submit"
          value="Submit"
        />
        {response}
      </div>
      <div style={{ flex: 1 }} />
    </div>
  )
}
