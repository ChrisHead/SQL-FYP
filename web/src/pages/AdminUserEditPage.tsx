import React from "react"
import { TextInput } from "../components/inputs/TextInput"
import { PasswordInput } from "../components/inputs/PasswordInput"
import { Spacer } from "../components/Spacer"
import { RouteComponentProps } from "react-router-dom"
import { useUsers } from "../hooks/useUsers"
import { api } from "../api"
import { AppContext } from "../AppContext"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminUserEditPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)
  const user = useUsers().find(user => user.id === currentId)
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  const [newUsername, setNewUsername] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")

  React.useEffect(() => {
    if (user !== undefined) {
      setNewUsername(user.username)
    }
  }, [user])

  if (!user) {
    return <p>404 User Not Found</p>
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const submitError = await api.updateUser(
      {
        updatedUser: {
          id: currentId,
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

    //direct back to the users table
    if ("success") {
      history.push("/users")
    }
  }

  return (
    <PageWrapper>
      <h1>Edit User {user.username}</h1>
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
    </PageWrapper>
  )
}

function PageWrapper({ children }) {
  return (
    <div
      style={{
        padding: 8,
        backgroundColor: "#30434d",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

function SubmitInput({ children }) {
  return <input type="submit" value={children} />
}
