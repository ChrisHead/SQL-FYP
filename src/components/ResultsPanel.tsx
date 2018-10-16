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
  tab = "data"
  render() {
    return (
      <div
        style={{
          padding: 8,
          height: "100%",
          border: "1px solid black",
          borderTop: "0px solid grey",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 30,
            width: "100%",
            backgroundColor: "grey",
            marginBottom: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button style={{ margin: 1 }} onClick={() => (this.tab = "data")}>
            Data
          </button>
          <button style={{ margin: 1 }} onClick={() => (this.tab = "results")}>
            Results
          </button>
        </div>
        <div style={{ overflow: "auto", flex: 1 }}>
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
