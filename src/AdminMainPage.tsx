import * as React from "react"
import { Topbar } from "./components/Topbar"
import { AdminEditor } from "./components/AdminEditor"

export class AdminMainPage extends React.Component {
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
        <AdminEditor />
      </div>
    )
  }
}
