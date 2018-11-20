import * as React from "react"
import { inject, observer } from "mobx-react"
import { DbStore } from "src/stores/DbStore"
import { Controlled as CodeMirror } from "react-codemirror2"
import "../../node_modules/codemirror/mode/sql/sql"
import { HistoryPanel } from "./HistoryPanel"

interface IProps {
  db?: DbStore
}

export const SqlPanel = inject("db")(
  observer(({ db }: IProps) => {
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
            onClick={db!.executeSql}
          >
            Run
          </button>
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
        <CodeMirror
          value={db!.sqlValue}
          className="code-editor"
          options={{
            mode: "text/x-mysql",
            theme: "material",
            lineNumbers: true,
            lineWrapping: true,
          }}
          onBeforeChange={(editor, data, value) => {
            db!.sqlValue = value
          }}
          onKeyUp={(editor, event) => {
            if ((event as any).key === ";") {
              db!.executeSql()
            }
          }}
        />
        <HistoryPanel />
      </div>
    )
  })
)
