import * as React from "react"

interface IProps {
  results: any[]
  error: string
}
export function Results({ results, error }: IProps) {
  return (
    // const res = JSON.stringify(db!.results, null, "  ")
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

      {/* {res.length > 2 && res} */}
      {error && (
        <div style={{ color: "red" }}>{JSON.stringify(error, null, "  ")}</div>
      )}
    </div>
  )
}
