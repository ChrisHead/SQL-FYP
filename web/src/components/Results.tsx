import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { observer, inject } from "mobx-react"

interface IProps {
  db?: DbStore
}
const ResultsComp = ({ db }: IProps) => (
  // const res = JSON.stringify(db!.results, null, "  ")
  <div>
    {db!.results.length > 0 && (
      <table style={{ width: "100%", border: "1px solid #30434d" }}>
        <thead>
          <tr>
            {Object.keys(db!.results[0]).map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {db!.results.map(row => (
            <tr>
              {Object.keys(row).map(key => (
                <td>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {/* {res.length > 2 && res} */}
    {db!.error && (
      <div style={{ color: "red" }}>
        {JSON.stringify(db!.error, null, "  ")}
      </div>
    )}
  </div>
)

export const Results = inject("db")(observer(ResultsComp))
