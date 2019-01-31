import * as React from "react"
import { Topbar } from "./components/Topbar"
import { StudentEditor } from "./components/StudentEditor"

export class StudentMainPage extends React.Component {
  public render() {
    return (
      <div
        style={{ display: "flex", height: "100vh", flexDirection: "column" }}
      >
        <style>
          {`
            *{box-sizing: border-box;}
          `}
        </style>
        <Topbar />
        <StudentEditor />
      </div>
    )
  }
}
