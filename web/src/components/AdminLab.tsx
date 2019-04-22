import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { Link } from "react-router-dom"
import { useQuestions } from "../hooks/useQuestions"
import { AppContext } from "src/AppContext"
import { api } from "src/api"
import { ILab } from "src/stores/DbStore"

export function AdminLab() {
  const app = React.useContext(AppContext)
  const [labs, setLabs] = React.useState<ILab[]>([])

  React.useEffect(() => {
    if (app.authToken) {
      api.studentLabs(app.authToken).then(response => setLabs(response))
    }
  }, [])

  const columns = [
    {
      Header: "Lab",
      accessor: "labNumber",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "",
      id: "statistics",
      accessor: d => (
        <Link
          style={{ textDecoration: "none", color: "#dacc12" }}
          to={`/lab/${d.id}/stats`}
        >
          Statistics
        </Link>
      ),
      width: 141,
    },
    // {
    //   Header: "",
    //   id: "edit",
    //   accessor: d => (
    //     <Link
    //       style={{ textDecoration: "none", color: "#dacc12" }}
    //       to={`/lab/${d.id}/edit`}
    //     >
    //       Edit
    //     </Link>
    //   ),
    //   width: 41,
    // },
    // {
    //   Header: "",
    //   id: "delete",
    //   accessor: d => (
    //     <Link
    //       style={{ textDecoration: "none", color: "#dacc12" }}
    //       to={`/questions/${d.id}/edit`}
    //     >
    //       Delete
    //     </Link>
    //   ),
    //   width: 62,
    // },
  ]

  const questionColumns = [
    {
      Header: "Question No.",
      accessor: "questionNum",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Question",
      accessor: "question",
      style: { whiteSpace: "unset" },
    },
  ]

  return (
    <div
      style={{
        display: "flex",
        margin: 10,
        padding: 8,
        flexDirection: "column",
        alignItems: "left",
        overflow: "auto",
        height: 0.94 * app.windowHeight,
      }}
    >
      {/* <div
        style={{
          padding: 8,
          backgroundColor: "#30434d",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Link className={"button"} to={`/lab/add`}>
          Add Lab
        </Link>
      </div> */}
      <ReactTable
        data={labs}
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
                data={row.original.questions}
                columns={questionColumns}
                defaultPageSize={10}
                showPagination
              />
            </div>
          )
        }}
      />
    </div>
  )
}
