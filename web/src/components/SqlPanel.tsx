import * as React from "react"
import { Controlled as CodeMirror } from "react-codemirror2"
import "../../node_modules/codemirror/mode/sql/sql"
import { HistoryPanel } from "./HistoryPanel"
import { DbContext } from "src/DbContext"
import { Observer } from "mobx-react"
import { api } from "../api"
import { AppContext } from "../AppContext"
import { IHistory } from "../stores/DbStore"
import { getNextId } from "mobx/lib/internal"

interface IProps {
  history: IHistory[]
  onSelectHistory(history: IHistory): void
  onExecute(): void
  sqlValue: string
  onSqlValueChange(val: string): void
  addActivity(activity: string)
}

export function SqlPanel({
  history,
  onSelectHistory,
  addActivity,
  onExecute,
  sqlValue,
  onSqlValueChange,
}: IProps) {
  // const [autoRun, setAutoRun] = React.useState(true)
  function updateActivity(val) {
    addActivity(val)
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
            onExecute()
            updateActivity("SQL Run: " + sqlValue)
          }}
        >
          Run
        </button>
        {/* <label
          className="Collapsible__trigger button"
          style={{ marginLeft: 8 }}
        >
          <input
            type="checkbox"
            checked={autoRun}
            onChange={e => setAutoRun(e.target.checked)}
          />
          Run on ";"
        </label> */}
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
            value={sqlValue}
            className="code-editor"
            options={{
              mode: "text/x-mysql",
              theme: "material",
              lineNumbers: true,
              lineWrapping: true,
            }}
            onBeforeChange={(editor, data, value) => {
              onSqlValueChange(value)
            }}
            // onKeyUp={(editor, event) => {
            //   if (autoRun && (event as any).key === ";") {
            //     setTimeout(() => onExecute())
            //   }
            // }}
          />
        )}
      </Observer>
      <HistoryPanel
        history={history}
        onSelectHistory={onSelectHistory}
        addActivity={addActivity}
      />
    </div>
  )
}
