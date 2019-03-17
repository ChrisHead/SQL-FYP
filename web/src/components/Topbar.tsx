import * as React from "react"
import { Link } from "react-router-dom"
import { AppContext } from "src/AppContext"

interface IProps {
  addActivity(activity: string)
}
export function Topbar({ addActivity }) {
  const app = React.useContext(AppContext)

  function updateActivity(val) {
    addActivity(val)
  }
  return (
    <div
      style={{
        borderBottom: "1px solid #30434d",
        backgroundColor: "#30434d",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        Welcome {app!.currentUser!.username}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Link
          className="button"
          to="/Feedback"
          style={{ width: 100, marginRight: 8 }}
          onClick={() => {
            updateActivity("Feedback")
          }}
        >
          Feedback
        </Link>
        <Link
          className="button"
          to="/Report_Bug"
          style={{ width: 100, marginRight: 8 }}
          onClick={() => {
            updateActivity("Report Bug")
          }}
        >
          Report Bug
        </Link>
        <button
          style={{ width: 100, marginRight: 8 }}
          onClick={() => {
            updateActivity("Logout")
            app!.logout()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
