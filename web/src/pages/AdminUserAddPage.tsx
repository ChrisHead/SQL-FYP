import React from "react"
import { TextInput } from "../components/inputs/TextInput"
import { PasswordInput } from "../components/inputs/PasswordInput"
import { Spacer } from "../components/Spacer"
import { api } from "../api"
import { AppContext } from "../AppContext"

export function AdminUserAddPage({ history }) {
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  const [newUsername, setNewUsername] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const submitError = await api.addUser(
      {
        addedUser: {
          username: newUsername,
          password: newPassword,
          admin: false,
        },
      },
      app.authToken!
    )
    if (submitError) {
      setError(submitError)
    }

    //direct back to the questions table
    if ("success") {
      history.push("/users")
    }
  }

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
        <h1>Add New User</h1>
        {error}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Username"
            value={newUsername}
            onChange={e => {
              setNewUsername(e)
            }}
          />
          <PasswordInput
            label="Password"
            value={newPassword}
            onChange={e => {
              setNewPassword(e)
            }}
          />
          <Spacer height="small" />
          <SubmitInput>Submit</SubmitInput>
        </form>
      </div>
    </div>
  )
}

function SubmitInput({ children }) {
  return <input type="submit" value={children} />
}
