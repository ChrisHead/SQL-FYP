import * as React from "react"
import { DbTables } from "./DbTables"
import { Results } from "./Results"
import { observable } from "mobx"
import { observer, inject } from "mobx-react"
import { DbStore } from "src/stores/DbStore"

interface IProps {
  db?: DbStore
}
@inject("db")
@observer
export class ResultsPanel extends React.Component<IProps> {
  @observable
  tab = "results"
  render() {
    return (
      <div
        style={{
          padding: 8,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // background: "Blue",
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: 30,
            width: "100%",
            backgroundColor: "#263638",
            marginBottom: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button style={{ margin: 1 }} onClick={() => (this.tab = "results")}>
            Results
          </button>
          <button style={{ margin: 1 }} onClick={() => (this.tab = "tables")}>
            Tables
          </button>
        </div>
        <div style={{ paddingTop: 8, overflow: "auto", flex: 1 }}>
          {this.tab === "results" ? (
            <Results />
          ) : (
            <DbTables db={this.props.db!.db} />
          )}
        </div>
      </div>
    )
  }
}
