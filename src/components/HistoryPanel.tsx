import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { inject, observer } from "mobx-react"

interface IProps {
  db?: DbStore
}
export const HistoryPanel = inject("db")(
  observer(({ db }: IProps) => {
    return (
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid grey",
          height: 300,
          overflow: "auto",
        }}
      >
        {db!.history.map((line, i) => (
          <div key={i} onClick={() => (db!.sqlValue = line)}>
            {line}
          </div>
        ))}
      </div>
    )
  })
)
