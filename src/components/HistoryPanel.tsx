import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { inject, observer } from "mobx-react"
import Collapsible from "react-collapsible"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)

interface IProps {
  db?: DbStore
}
export const HistoryPanel = inject("db")(
  observer(({ db }: IProps) => {
    return (
      <div>
        <style>{`
            .history {
              // cursor: pointer;
            }
          `}</style>
        <Collapsible
          className="history"
          trigger={
            <>
              <FontAwesomeIcon icon="angle-double-up" />
              <span style={{ margin: "0 16px" }}>History</span>
              <FontAwesomeIcon icon="angle-double-up" />
            </>
          }
          triggerWhenOpen={
            <>
              <FontAwesomeIcon icon="angle-double-down" />
              <span style={{ margin: "0 16px" }}>History</span>
              <FontAwesomeIcon icon="angle-double-down" />
            </>
          }
          transitionTime={100}
          overflowWhenOpen="auto"
          triggerStyle={{
            padding: 8,
            backgroundColor: "#30434d",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {db!.history.map((line, i) => (
            <div
              className="history-div"
              style={{ fontSize: 14, fontFamily: "monospace" }}
              key={i}
              onClick={() => (db!.sqlValue = line)}
            >
              {line}
            </div>
          ))}
        </Collapsible>
      </div>
    )
  })
)
