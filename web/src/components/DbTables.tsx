import * as React from "react"
import { observable, computed } from "mobx"
import { observer } from "mobx-react"
import { ITable } from "src/stores/DbStore"
import { api } from "src/api"
import { AppContext } from "src/AppContext"

interface IProps {
  db: ITable[]
  dbKey
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
    // function addNewActivity(activity: string) {
    //   const app = React.useContext(AppContext)
    //   async function func() {
    //     await api.updateActivity({ activity }, app.authToken!)
    //   }
    //   func()
    // }
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
            minHeight: 35,
          }}
        >
          {db.map((table, i) => (
            <button
              key={table.name}
              style={{ marginLeft: 8 }}
              onClick={() => {
                this.handleTableButton(i)
                // addNewActivity("Table Selected: " + table.name)
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
                {this.currentTable !== undefined
                  ? this.currentTable.columns.map(column => (
                      <th key={column.name}>{column.name}</th>
                    ))
                  : null}
              </tr>
            </thead>
            <tbody>
              {this.currentTable !== undefined
                ? this.currentTable.data.map((datum, i) => (
                    <tr key={i}>
                      {this.currentTable.columns.map(column => (
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
}
