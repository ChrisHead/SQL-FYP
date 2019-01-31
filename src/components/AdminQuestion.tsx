import * as React from "react"
import { DbStore } from "src/stores/DbStore"
// import { observable } from "mobx"
import { observer, inject } from "mobx-react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { AppStore } from "src"

interface IProps {
  db?: DbStore
  app?: AppStore
}

@inject("db", "app")
@observer
export class AdminQuestion extends React.Component<IProps> {
  render() {
    const { app } = this.props

    const columns = [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Question",
        accessor: "question",
      },
      {
        Header: "Answer",
        accessor: "answer",
      },
      {
        Header: "Database",
        accessor: "database",
      },
      {
        Header: "Starting Text",
        accessor: "startingText",
      },
      {
        Header: "Response",
        accessor: "response",
      },
      {
        Header: "Respond After No.",
        accessor: "respondAfter",
      },
      {
        Header: "Auto Response",
        id: "autoResponse",
        accessor: d => d.autoResponse.toString(),
      },
    ]

    const conditionColumns = [
      {
        Header: "Condition One",
        id: "conditionOne",
        accessor: d => d.conditionOne.toString(),
      },
      {
        Header: "Condition Two",
        id: "conditionTwo",
        accessor: d => d.conditionTwo.toString(),
      },
      {
        Header: "Condition Three",
        id: "conditionThree",
        accessor: d => d.conditionThree.toString(),
      },
      {
        Header: "Condition Four",
        id: "conditionFour",
        accessor: d => d.conditionFour.toString(),
      },
    ]

    return (
      <div
        style={{
          // backgroundColor: "green",
          display: "flex",
          margin: 10,
          padding: 8,
          flexDirection: "column",
          alignItems: "left",
          overflow: "auto",
          height: 0.94 * app!.windowHeight,
        }}
      >
        <ReactTable
          data={this.props.db!.adminQuestions}
          columns={columns}
          sortable
          className="-striped -highlight"
          style={{
            height: 400,
            width: 0.78 * app!.windowWidth,
            backgroundColor: "#30434d",
          }}
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={this.props.db!.conditions}
                  columns={conditionColumns}
                  defaultPageSize={1}
                  showPagination={false}
                />
              </div>
            )
          }}
        />
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Add Question:
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
            }}
          >
            Question:
            <input type="text" />
            Answer:
            <input type="text" />
            Database:
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            Starting Text (Custom, Blank or 'previous'):
            <input type="text" />
            Response After:
            <input type="text" />
            Conditions:
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Edit Question (Select ID):
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
            }}
          >
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            Question:
            <input type="text" />
            Answer:
            <input type="text" />
            Database:
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            Starting Text (Custom, Blank or 'previous'):
            <input type="text" />
            Response After:
            <input type="text" />
            Conditions:
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Edit Question Response(Select ID):
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
            }}
          >
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            Response:
            <input type="text" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div
          style={{
            padding: 8,
            backgroundColor: "#30434d",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Remove Question (Select ID):
          <form
            style={{
              // display: "flex",
              flexDirection: "column",
            }}
          >
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}
