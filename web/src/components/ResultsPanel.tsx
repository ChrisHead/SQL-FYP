import * as React from "react"

import { Results } from "./Results"

interface IProps {
  onClearResults(): void
  error
  results
  answerError
  answerAcknowledgement
  addActivity(activity: string)
}
export function ResultsPanel({
  onClearResults,
  error,
  results,
  answerError,
  answerAcknowledgement,
  addActivity,
}: IProps) {
  function updateActivity(val) {
    addActivity(val)
  }
  return (
    <div
      style={{
        padding: 8,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#30434d",
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <button
            style={{ marginLeft: 8 }}
            onClick={() => {
              onClearResults()
              updateActivity("Clear Results")
            }}
          >
            Clear Results
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>Results</div>
        <div style={{ flex: 1 }} />
      </div>
      <div
        style={{
          padding: 8,
          overflow: "auto",
          flex: 1,
          background: "#263238",
        }}
      >
        <Results
          error={error}
          results={results}
          answerError={answerError}
          answerAcknowledgement={answerAcknowledgement}
        />
      </div>
    </div>
  )
}
