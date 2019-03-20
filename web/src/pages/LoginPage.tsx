import * as React from "react"
import { AppContext } from "../AppContext"
import { TextInput } from "../components/inputs/TextInput"

export function LoginPage() {
  const [error, setError] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("pass123")
  const app = React.useContext(AppContext)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const validationError = await app.login(username, password)
    if (validationError) {
      setError(validationError)
    }
  }
  // TODO REMOVE THIS BEFORE PUSHING TO PRODUCTION
  React.useEffect(() => {
    app.login("asd", "test")
  })

  return (
    <div
      style={{
        height: window.innerHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>LOGIN</h1>
      {error}
      <div>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="User"
            value={username}
            onChange={value => setUsername(value)}
          />
          <label className="input">
            Password <br />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}
