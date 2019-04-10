import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { AppContext } from "src/AppContext"
import { useUsers } from "../hooks/useUsers"
import { RouteComponentProps } from "react-router-dom"
import { api } from "../api"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminUserAnswerPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)
  const user = useUsers().find(user => user.id === currentId)
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")
  const [answers, setAnswers] = React.useState([])
  const [questions, setQuestions] = React.useState([])

  async function getAnswers(id) {
    setAnswers(await api.getUsersAnswersQuestions(id, app.authToken!))
  }

  React.useEffect(() => {
    getAnswers(currentId)
  }, [])

  if (!user) {
    return <p>404 User Not Found</p>
  }
  const answerColumns = [
    {
      Header: "Lab",
      accessor: "labNumber",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Question",
      accessor: "question",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Model Answer",
      accessor: "modelAnswer",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Completed",
      id: "completed",
      accessor: d => {
        if (d.completed) {
          return "True"
        } else {
          return "False"
        }
      },
      style: { whiteSpace: "unset" },
    },
    // {
    //   Header: "No. of Mistakes",
    //   accessor: "mistakes",
    //   style: { whiteSpace: "unset" },
    // },
  ]

  const historyColumns = [
    {
      Header: "DateTime",
      accessor: "dateTime",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Value",
      accessor: "value",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "SQL Error",
      accessor: "error",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Classified Error",
      accessor: "answerError",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Completed",
      id: "completed",
      accessor: d => {
        if (d.completed) {
          return "True"
        } else {
          return "False"
        }
      },
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
      <div
        style={{
          padding: 8,
          backgroundColor: "#30434d",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <h1>View Answers: User {user.username}</h1>
        <ReactTable
          data={answers}
          columns={answerColumns}
          sortable
          defaultPageSize={20}
          className="-striped -highlight"
          style={{
            height: 0.797 * app.windowHeight,
            width: 0.75 * app.windowWidth,
            backgroundColor: "#30434d",
          }}
          SubComponent={row => {
            return (
              <div style={{ padding: "20px" }}>
                <ReactTable
                  data={row.original.history}
                  columns={historyColumns}
                  defaultPageSize={10}
                  showPagination
                />
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}
