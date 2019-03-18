import React from "react"
import { TextInput } from "../components/inputs/TextInput"
import { Spacer } from "../components/Spacer"
import { api } from "../api"
import { AppContext } from "../AppContext"

export function AdminLabAddPage({ history }) {
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  const [newLabNum, setNewLabNum] = React.useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const submitError = await api.addLab(
      {
        addedLab: {
          labNumber: newLabNum,
        },
      },
      app.authToken!
    )
    if (submitError) {
      setError(submitError)
    }

    //direct back to the questions table
    if ("success") {
      history.push("/labs")
    }
  }

  return (
    <PageWrapper>
      <h1>Add New Lab</h1>
      {error}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Lab Number"
          value={newLabNum}
          onChange={e => {
            setNewLabNum(e)
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
