import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"

interface IProps {
  db?: DbStore
}

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
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <div
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
        </div>
        <div
          className="control-div"
          id="labs"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          onClick={() => this.currentControl("labs")}
        >
          Manage Labs
        </div>
        <div
          className="control-div"
          id="questions"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          onClick={() => this.currentControl("questions")}
        >
          Manage Questions
        </div>
        <div
          className="control-div"
          id="database"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          onClick={() => this.currentControl("database")}
        >
          Manage Databases
        </div>
        <div
          className="control-div"
          id="stats"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          onClick={() => this.currentControl("stats")}
        >
          Live Statistics
        </div>
        <div
          className="control-div"
          id="stats"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          // onClick={() => this.currentControl("stats")}
        >
          Gaming Info
        </div>
        <div
          className="control-div"
          id="stats"
          style={{
            padding: 8,
            margin: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#30434d",
          }}
          // onClick={() => this.currentControl("stats")}
        >
          Problems Info
        </div>
      </div>
    )
  }
}
