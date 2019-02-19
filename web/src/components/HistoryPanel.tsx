import * as React from "react"
import Collapsible from "react-collapsible"
import { IHistory } from "../stores/DbStore"

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
            <span style={{ margin: "0 16px" }}>History</span>
          </>
        }
        triggerWhenOpen={
          <>
            <span style={{ margin: "0 16px" }}>History</span>
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
            {line.value}
            {/* {JSON.stringify(line)} */}
          </div>
        ))}
      </Collapsible>
    </div>
  )
}
