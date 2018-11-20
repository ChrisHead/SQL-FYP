import * as React from "react"
import { inject, observer } from "mobx-react"
import { DbStore } from "src/stores/DbStore"
import { Controlled as CodeMirror } from "react-codemirror2"
import "../../node_modules/codemirror/mode/sql/sql"
import Collapsible from "react-collapsible"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons"
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)

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
          // background: "Green",
        }}
      >
        <div
          style={{
            height: 30,
            width: "100%",
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button style={{ margin: 1, width: 100 }} onClick={db!.executeSql}>
            Run
          </button>
        </div>
        <CodeMirror
          value={db!.sqlValue}
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
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flex: 1,
            height: 300,
            flexDirection: "column",
          }}
        >
          <Collapsible
            trigger={<FontAwesomeIcon icon="angle-double-down" />}
            triggerWhenOpen={<FontAwesomeIcon icon="angle-double-up" />}
            transitionTime={100}
            overflowWhenOpen="auto"
            triggerStyle={{
              backgroundColor: "#30434d",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {db!.history.map((line, i) => (
              <div
                style={{ fontSize: 14 }}
                key={i}
                onClick={() => (db!.sqlValue = line)}
              >
                {line}
              </div>
            ))}
          </Collapsible>
        </div>
      </div>
    )
  })
)
