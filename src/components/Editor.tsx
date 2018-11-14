import * as React from "react"
// import { HistoryPanel } from "./HistoryPanel"
import { ResultsPanel } from "./ResultsPanel"
import { SqlPanel } from "./SqlPanel"
import { theme } from "src/constants/theme"
import SplitPane from "react-split-pane"

export class Editor extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          height: `calc( 100vh - ${theme.topbarHeight}px )`,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <SplitPane
            split="vertical"
            minSize={300}
            defaultSize={500}
            maxSize={1000}
            primary="second"
            // allowResize={false}
          > */}
          <SplitPane
            split="horizontal"
            minSize={100}
            defaultSize={500}
            maxSize={800}
            // allowResize={false}
          >
            <SqlPanel />
            <ResultsPanel />
            {/* <HistoryPanel /> */}
          </SplitPane>
          {/* <div style={{ flex: 1 }}>
            <ResultsPanel />
            </div> */}
          {/* </SplitPane> */}
        </div>
      </div>
    )
  }
}
