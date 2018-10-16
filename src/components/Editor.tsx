import * as React from "react"
import { HistoryPanel } from "./HistoryPanel"
import { ResultsPanel } from "./ResultsPanel"
import { SqlPanel } from "./SqlPanel"
import { theme } from "src/constants/theme"
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
          <SqlPanel />
          <HistoryPanel />
        </div>
        <div style={{ flex: 1 }}>
          <ResultsPanel />
        </div>
      </div>
    )
  }
}
