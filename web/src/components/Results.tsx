import * as React from "react"

interface IProps {
  results: any[]
  error: string
  answerError: string
  answerAcknowledgement
}
export function Results({
  results,
  error,
  answerError,
  answerAcknowledgement,
}: IProps) {
  return (
    <div>
      {results.length > 0 && (
        <table style={{ width: "100%", border: "1px solid #30434d" }}>
          <thead>
            <tr>
              {Object.keys(results[0]).map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key, i) => (
                  <td key={i}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && (
        <div style={{ color: "red" }}>
          {JSON.stringify(error, null, "  ").slice(1, -1)}
        </div>
      )}
      {answerError === answerAcknowledgement && (
        <div
          style={{ color: "green", display: "flex", justifyContent: "center" }}
        >
          {JSON.stringify(answerError, null, "  ").slice(1, -1)}
        </div>
      )}
      {/* {answerError !== answerAcknowledgement && answerError !== "" && (
        <div
          style={{ color: "red", display: "flex", justifyContent: "center" }}
        >
          {JSON.stringify(answerError, null, "  ").slice(1, -1)}
        </div>
      )} */}
    </div>
  )
}
