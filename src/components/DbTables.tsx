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
      <div>
        <div
          style={{
            height: 30,
            width: "100%",
            backgroundColor: "grey",
            marginBottom: 1,
          }}
        >
          {db.map((table, i) => (
            <button
              key={table.name}
              style={{ margin: 1 }}
              onClick={() => this.handleTableButton(i)}
            >
              {table.name}
            </button>
          ))}
        </div>
        <table style={{ width: "100%", border: "1px solid black" }}>
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
    )
  }
}
