import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"
import { NavLink, withRouter } from "react-router-dom"

interface IProps {
  db?: DbStore
}

@(withRouter as any)
@inject("db")
@observer
export class AdminControls extends React.Component<IProps> {
  render() {
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
        <NavLink to="/students">Manage Students</NavLink>
        <NavLink to="/labs">Manage Labs</NavLink>
        <NavLink to="/questions">Manage Questions</NavLink>
        <NavLink to="/database">Manage Databases</NavLink>
        <NavLink to="/stats">Live Statistics</NavLink>
        <NavLink to={"#"}>Gaming Info</NavLink>
        <NavLink to={"#"}>Problems Info</NavLink>
      </div>
    )
  }
}
