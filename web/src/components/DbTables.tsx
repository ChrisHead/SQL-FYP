import * as React from "react"

interface IProps {
  db
  addActivity(activity: string)
}
export function DbTables({ db, addActivity }: IProps) {
  const [index, setIndex] = React.useState(0)

  const currentTable = db[index]

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
          minHeight: 35,
        }}
      >
        {db.map((table, i) => (
          <button
            key={table.name}
            style={{ marginLeft: 8 }}
            onClick={() => {
              setIndex(i)
              updateActivity("Table Selected: " + table.name)
            }}
          >
            {table.name + " Table"}
          </button>
        ))}
      </div>
      <div
        style={{
          padding: 8,
          overflow: "auto",
          flex: 1,
          background: "#263238",
        }}
      >
        <table
          style={{
            width: "100%",
            overflow: "auto",
          }}
        >
          <thead>
            <tr>
              {currentTable !== undefined
                ? currentTable.columns.map(column => (
                    <th key={column.name}>{column.name}</th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {currentTable !== undefined
              ? currentTable.data.map((datum, i) => (
                  <tr key={i}>
                    {currentTable.columns.map(column => (
                      <td key={column.name}>{datum[column.name]}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
