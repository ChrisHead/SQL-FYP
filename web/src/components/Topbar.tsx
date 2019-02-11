import * as React from "react"
import { AppStore } from "../stores/AppStore"
import { inject } from "mobx-react"
import { Link } from "react-router-dom"
export const Topbar = inject("app")(({ app }: { app?: AppStore }) => {
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
        <Link className="button" to="/Feedback" style={{ width: 100, marginRight: 8 }}>
          Feedback
        </Link>
        <Link className="button" to="/Report_Bug" style={{ width: 100, marginRight: 8 }}>
          Report Bug
        </Link>
        <button style={{ width: 100, marginRight: 8 }} onClick={() => app!.logout()}>
          Logout
        </button>
      </div>
    </div>
  )
})
