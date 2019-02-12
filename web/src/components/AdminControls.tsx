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
  currentControl(id: string) {
    this.props.db!.currentControl = id
    const div = document.getElementById(this.props.db!.currentControl)
    div!.style.backgroundColor = "rgba(211, 211, 211, 0.13)"
    const controls = ["students", "labs", "questions", "database", "stats"]
    controls.forEach((control, i) => {
      if (control !== this.props.db!.currentControl) {
        const tempDiv = document.getElementById(control)
        tempDiv!.style.background = "#30434d"
      }
    })
    console.log("Current Control: " + this.props.db!.currentControl)
  }
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
        {/* <div
          className="control-div"
          id="students"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          onClick={() => this.currentControl("students")}
        >
          Manage Students
        </div> */}
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
