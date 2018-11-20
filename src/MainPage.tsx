import * as React from "react"
import { Topbar } from "./components/Topbar"
import { Editor } from "./components/Editor"

export class MainPage extends React.Component {
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
        <Editor />
      </div>
    )
  }
}
