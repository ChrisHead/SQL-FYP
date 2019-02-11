import * as React from "react"
import { Results } from "./Results"
import { observer, inject } from "mobx-react"
import { DbStore } from "src/stores/DbStore"

interface IProps {
  db?: DbStore
}
@inject("db")
@observer
export class ResultsPanel extends React.Component<IProps> {
  render() {
    return (
      <div
        style={{
          padding: 8,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#30434d",
            display: "flex",
          }}
        >
          <div style={{ flex: 1 }}>
            <button
              style={{ marginLeft: 8 }}
              onClick={() => {
                this.props.db!.clearResults()
              }}
            >
              Clear Results
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>Results</div>
          <div style={{ flex: 1 }} />
        </div>
        <div
          style={{
            padding: 8,
            overflow: "auto",
            flex: 1,
            background: "#263638",
          }}
        >
          <Results />
        </div>
      </div>
    )
  }
}
