import * as React from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import "../../node_modules/codemirror/mode/sql/sql"
import { HistoryPanel } from "./HistoryPanel"
import { DbContext } from "src/DbContext"
import { Observer } from "mobx-react"
import { api } from "../api"
import { AppContext } from "../AppContext"

export function SqlPanel() {
  const db = React.useContext(DbContext)
  const app = React.useContext(AppContext)

  async function execute() {
    if (db.currentLab !== undefined && db.currentQuestion !== undefined) {
      db.executeSql()
      await api.updateHistory(
        JSON.stringify(db.mostRecentHistory),
        app.authToken!
      )
    } else {
      db.error = "Select Lab and Question"
    }
  }

  return (
    <div
      style={{
        padding: 8,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#30434d",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <button
          style={{ width: 100, marginLeft: 8 }}
          onClick={() => {
            execute()
          }}
        >
          Run
        </button>
        <label
          className="Collapsible__trigger button"
          style={{ marginLeft: 8 }}
        >
          <input type="checkbox" id="semiRun" value="semiRun" />
          Run on ";"
        </label>
      </div>
      <style>{`
          .code-editor {
            flex: 1;
            overflow: auto;
          }
          .code-editor > div {
            height: 100%;
          }
        `}</style>
      <Observer>
        {() => (
          <CodeMirror
            value={db.sqlValue}
            className="code-editor"
            options={{
              mode: "text/x-mysql",
              theme: "material",
              lineNumbers: true,
              lineWrapping: true,
            }}
            onBeforeChange={(editor, data, value) => {
              db.sqlValue = value
            }}
            onKeyUp={(editor, event) => {
              const check = document.getElementById(
                "semiRun"
              )! as HTMLInputElement
              if (check.checked === true) {
                if ((event as any).key === ";") {
                  execute()
                }
              }
            }}
          />
        )}
      </Observer>
      <HistoryPanel />
    </div>
  )
}
