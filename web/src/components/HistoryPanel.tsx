import * as React from "react"
import Collapsible from "react-collapsible"
import { IHistory } from "../stores/DbStore"

interface IProps {
  history: IHistory[]
  onSelectHistory(history: IHistory): void
  addActivity(activity: string)
}

export function HistoryPanel({
  history,
  onSelectHistory,
  addActivity,
}: IProps) {
  function updateActivity(val) {
    addActivity(val)
  }
  return (
    <div id="historyDiv">
      <Collapsible
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
        onOpen={() => updateActivity("History Opened")}
        onClose={() => updateActivity("History Closed")}
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
        {history
          .slice(0)
          .reverse()
          .map((line, i) => (
            <div
              key={i}
              className="history-div"
              style={{ fontSize: 14, fontFamily: "monospace" }}
              onClick={() => {
                onSelectHistory(line)
                updateActivity("History Selected: " + line.value)
              }}
            >
              {line.value}
              {/* {JSON.stringify(line)} */}
            </div>
          ))}
      </Collapsible>
    </div>
  )
}
