import * as React from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import { ITable } from "src/stores/DbStore"

interface IProps {
  db: ITable[]
}
@observer
export class DbTables extends React.Component<IProps> {
  @observable
  index = 0
  @computed
  get currentTable() {
    return this.props.db[this.index]
  }
  handleTableButton(index: number) {
    this.index = index
  }
  render() {
    const { db } = this.props
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
            // padding: 8,
          }}
        >
          {db.map((table, i) => (
            <button
              key={table.name}
              style={{ marginLeft: 8 }}
              onClick={() => this.handleTableButton(i)}
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
            background: "#263638",
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
                {this.currentTable.columns.map(column => (
                  <th key={column.name}>{column.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.currentTable.data.map((datum, i) => (
                <tr key={i}>
                  {this.currentTable.columns.map(column => (
                    <td key={column.name}>{datum[column.name]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
