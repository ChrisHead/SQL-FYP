import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { AppContext } from "src/AppContext"
import { useUsers } from "../hooks/useUsers"
import { RouteComponentProps } from "react-router-dom"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminUserActivityPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)
  const user = useUsers().find(user => user.id === currentId)
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  if (!user) {
    return <p>404 User Not Found</p>
  }

  const activityColumns = [
    {
      Header: "DateTime",
      accessor: "dateTime",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Activity",
      accessor: "activity",
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
        <h1>View Activity: User {user.username}</h1>
        <ReactTable
          data={user.activity}
          columns={activityColumns}
          sortable
          defaultPageSize={20}
          className="-striped -highlight"
          style={{
            height: 0.797 * app.windowHeight,
            width: 0.75 * app.windowWidth,
            backgroundColor: "#30434d",
          }}
        />
      </div>
    </div>
  )
}
