import * as React from "react"
import { AppContext } from "../AppContext"
import { TextInput } from "../components/inputs/TextInput"
import { Spacer } from "../components/Spacer"

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
    // app.login("admin", "coa201")
    // app.login("asd", "test")
    // app.login("B512678", "pass123")
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
      <div style={{ color: "red" }}>{error}</div>

      <Spacer height="medium" />

      <div>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="BNumber"
            value={username}
            onChange={value => setUsername(value)}
          />

          <Spacer height="medium" />

          <label className="input">
            Password (leave as default) <br />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>

          <Spacer height="medium" />

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  )
}
