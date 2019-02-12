import * as React from "react"
import { AdminPanel } from "./AdminPanel"
import SplitPane from "react-split-pane"
import { AdminControls } from "./AdminControls"
import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"
import { observable } from "mobx"
import { AppStore } from "../stores/AppStore"
import { withRouter } from "react-router"

interface IProps {
  db?: DbStore
  app?: AppStore
}

@(withRouter as any)
@inject("db", "app")
@observer
export class AdminEditor extends React.Component<IProps> {
  resultsSection = React.createRef<HTMLDivElement>()
  @observable
  contentWidth = 1000
  handleChange = () => {
    this.updateContentWidth()
  }
  componentDidMount() {
    this.updateContentWidth()
  }
  updateContentWidth() {
    if (!this.resultsSection.current) {
      return
    }
    this.contentWidth = this.resultsSection.current.getBoundingClientRect().width
  }

  render() {
    const { app } = this.props
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
          onChange={this.handleChange}
        >
          <AdminControls />
          <AdminPanel />
        </SplitPane>
      </div>
    )
  }
}
