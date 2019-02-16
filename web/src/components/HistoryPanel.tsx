import { library } from "@fortawesome/fontawesome-svg-core"
import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons"
import * as React from "react"
import Collapsible from "react-collapsible"

import { IHistory } from "../stores/DbStore"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)

interface IProps {
  history: IHistory[]
  onSelectHistory(history: IHistory): void
}

export function HistoryPanel({ history, onSelectHistory }: IProps) {
  return (
    <div>
      <Collapsible
        className="history"
        trigger={
          <>
            {/* <FontAwesomeIcon icon="angle-double-up" /> */}
            <span style={{ margin: "0 16px" }}>History</span>
            {/* <FontAwesomeIcon icon="angle-double-up" /> */}
          </>
        }
        triggerWhenOpen={
          <>
            {/* <FontAwesomeIcon icon="angle-double-down" /> */}
            <span style={{ margin: "0 16px" }}>History</span>
            {/* <FontAwesomeIcon icon="angle-double-down" /> */}
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
        {history.map((line, i) => (
          <div
            key={i}
            className="history-div"
            style={{ fontSize: 14, fontFamily: "monospace" }}
            onClick={() => onSelectHistory(line)}
          >
            {/* {line.dateTime +
                " : " +
                line.value +
                " : " +
                line.error +
                " : " +
                line.completed} */}
            {line.value}
            {JSON.stringify(line)}
          </div>
        ))}
      </Collapsible>
    </div>
  )
}
