import * as React from "react"
import { inject, observer } from "mobx-react"
import { DbStore } from "src/stores/DbStore"

interface IProps {
  db?: DbStore
}
export const SqlPanel = inject("db")(
  observer(({ db }: IProps) => {
    return (
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid grey",
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
            Execute
          </button>
        </div>
        <textarea
          style={{
            resize: "none",
            flex: 1,
            border: "none",
          }}
          value={db!.sqlValue}
          onChange={e => (db!.sqlValue = e.target.value)}
        />
      </div>
    )
  })
)
