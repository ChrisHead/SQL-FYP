import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { Link } from "react-router-dom"
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
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Answer",
      accessor: "modelAnswer",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Database",
      accessor: "databaseId",
    },
    {
      Header: "Starting Text",
      accessor: "startingText",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "",
      id: "edit",
      accessor: d => (
        <Link
          // className={"button"}
          style={{ textDecoration: "none", color: "#dacc12" }}
          to={`/questions/${d.id}/edit`}
        >
          Edit
        </Link>
      ),
      width: 41,
      // width: 49,
    },
    {
      Header: "",
      id: "delete",
      accessor: d => (
        <Link
          // className={"button"}
          style={{ textDecoration: "none", color: "#dacc12" }}
          to={`/questions/${d.id}/edit`}
        >
          Delete
        </Link>
      ),
      width: 62,
      // width: 70,
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
      <div
        style={{
          padding: 8,
          backgroundColor: "#30434d",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Link className={"button"} to={`/questions/edit`}>
          Add Question
        </Link>
      </div>
      <ReactTable
        data={questions}
        columns={columns}
        sortable
        defaultPageSize={20}
        className="-striped -highlight"
        style={{
          height: 0.85 * app.windowHeight,
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
    </div>
  )
}
