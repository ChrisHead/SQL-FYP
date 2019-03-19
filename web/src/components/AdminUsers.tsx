import * as React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { Link } from "react-router-dom"
import { AppContext } from "src/AppContext"
import { useUsers } from "../hooks/useUsers"

export function AdminUsers() {
  const app = React.useContext(AppContext)
  const users = useUsers()

  const columns = [
    {
      Header: "UserName",
      accessor: "username",
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Role",
      id: "admin",
      accessor: d => {
        if (d.admin) {
          return "Admin"
        } else {
          return "Student"
        }
      },
      style: { whiteSpace: "unset" },
    },
    {
      Header: "",
      id: "edit",
      accessor: d => (
        <Link
          style={{ textDecoration: "none", color: "#dacc12" }}
          to={`/users/${d.id}/edit`}
        >
          Edit
        </Link>
      ),
      width: 41,
    },
    // {
    //   Header: "",
    //   id: "delete",
    //   accessor: d => (
    //     <Link
    //       style={{ textDecoration: "none", color: "#dacc12" }}
    //       to={`/questions/add`}
    //     >
    //       Delete
    //     </Link>
    //   ),
    //   width: 62,
    // },
  ]

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
      {/* {JSON.stringify(users)} */}
      <div
        style={{
          padding: 8,
          backgroundColor: "#30434d",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Link className={"button"} to={`/users/add`}>
          Add User
        </Link>
      </div>
      <ReactTable
        data={users}
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
                data={row.original.activity}
                columns={activityColumns}
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
