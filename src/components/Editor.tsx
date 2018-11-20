import * as React from "react"
import { ResultsPanel } from "./ResultsPanel"
import { SqlPanel } from "./SqlPanel"
import SplitPane from "react-split-pane"
import { QuestionsPanel } from "./QuestionsPanel"
import { DbTables } from "./DbTables"
import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"
import { observable } from "mobx"
import { AppStore } from "src"

interface IProps {
  db?: DbStore
  app?: AppStore
}

@inject("db", "app")
@observer
export class Editor extends React.Component<IProps> {
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
          <QuestionsPanel />
          <SplitPane
            split="horizontal"
            pane2Style={{ flex: 1, overflow: "auto" }}
            minSize={0.2 * app!.windowHeight}
            defaultSize={0.5 * app!.windowHeight}
            maxSize={0.8 * app!.windowHeight}
          >
            <SqlPanel />
            <div ref={this.resultsSection}>
              <SplitPane
                split="vertical"
                minSize={0.3 * this.contentWidth}
                defaultSize={0.5 * this.contentWidth}
                maxSize={0.7 * this.contentWidth}
                pane2Style={{ overflow: "auto" }}
              >
                <ResultsPanel />
                <DbTables db={this.props.db!.db} />
              </SplitPane>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    )
  }
}
