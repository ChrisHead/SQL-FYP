import * as React from "react"
import { AdminPanel } from "./AdminPanel"
import SplitPane from "react-split-pane"
import { AdminControls } from "./AdminControls"
// import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"
import { observable } from "mobx"
import { AppStore } from "../stores/AppStore"
import { withRouter } from "react-router"
import { AppContext } from "src/AppContext"

// interface IProps {
//   // db?: DbStore
//   // app?: AppStore
// }
export function AdminEditor() {
  const resultsSection = React.createRef<HTMLDivElement>()

  const app = React.useContext(AppContext)

  let contentWidth = 1000
  function handleChange() {
    updateContentWidth()
  }
  function componentDidMount() {
    updateContentWidth()
  }
  function updateContentWidth() {
    if (!resultsSection.current) {
      return
    }
    contentWidth = resultsSection.current.getBoundingClientRect().width
  }

  // const { app } = this.props

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        position: "relative",
      }}
    >
      <SplitPane
        split="vertical"
        minSize={0.1 * app!.windowWidth}
        defaultSize={0.2 * app!.windowWidth}
        maxSize={0.5 * app!.windowWidth}
        onChange={handleChange}
      >
        <AdminControls />
        <AdminPanel />
      </SplitPane>
    </div>
  )
}
