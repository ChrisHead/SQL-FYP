import * as React from "react"
import { NavLink } from "react-router-dom"

export function AdminControls() {
  return (
    <div
      className="admin-sidebar"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <NavLink to="/users">Manage Users</NavLink>
      <NavLink to="/questions">Manage Questions</NavLink>
      <NavLink to="/labs">Manage Labs</NavLink>
    </div>
  )
}
