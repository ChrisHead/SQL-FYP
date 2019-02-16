import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { Link } from "react-router-dom"
import { SelectInput } from "./inputs/SelectInput"
import { TextInput } from "./inputs/TextInput"
import { useQuestions } from "../hooks/useQuestions"
import { AppContext } from "src/AppContext"
import { DbContext } from "src/DbContext"

export function AdminQuestion() {
  const db = React.useContext(DbContext)
  const app = React.useContext(AppContext)
  const questions = useQuestions()

  const columns = [
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
      // accessor: d => {
      //   debugger
      //   d.autoResponse.toString()
      // },
    },
    {
      Header: "",
      id: "actions",
      accessor: d => <Link to={`/questions/${d.id}/edit`}>Edit</Link>,
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
        height: 0.94 * app.windowHeight,
      }}
    >
      <ReactTable
        data={questions}
        columns={columns}
        sortable
        className="-striped -highlight"
        style={{
          height: 400,
          width: 0.78 * app.windowWidth,
          backgroundColor: "#30434d",
        }}
        SubComponent={row => {
          return (
            <div style={{ padding: "20px" }}>
              <ReactTable
                data={db.conditions}
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
        <form
          style={{
            // display: "flex",
            flexDirection: "column",
          }}
        >
          <SelectInput
            label="Edit Question Response"
            blank="-- Select Id --"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
          />
          <TextInput label={"Response"} value="" />
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
        <form
          style={{
            // display: "flex",
            flexDirection: "column",
          }}
          onSubmit={e => e.preventDefault()}
        >
          <SelectInput
            label="Remove Question (Select ID)"
            value="1"
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
            ]}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}
