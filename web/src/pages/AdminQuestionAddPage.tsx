import React from "react"
import { TextInput } from "../components/inputs/TextInput"
import { TextBoxInput } from "../components/inputs/TextBoxInput"
import { SelectInput } from "../components/inputs/SelectInput"
import { CheckboxInput } from "../components/inputs/CheckboxInput"
import { BooleanInput } from "../components/inputs/BooleanInput"
import { Spacer } from "../components/Spacer"
import { api } from "../api"
import { AppContext } from "../AppContext"
import { IQuestion } from "src/stores/DbStore"

export function AdminQuestionAddPage({ history }) {
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  const [newQuestion, setNewQuestion] = React.useState("")
  const [newAnswer, setNewAnswer] = React.useState("")
  const [newDatabase, setNewDatabase] = React.useState("")
  const [newStarting, setNewStarting] = React.useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    const submitError = await api.addQuestion(
      {
        addedQuestion: {
          id: "",
          question: newQuestion,
          modelAnswer: newAnswer,
          databaseId: "095050b8-aeb4-4ecc-8e6d-b0dbd3235a96",
          startingText: "none",
        },
      },
      app.authToken!
    )
    if (submitError) {
      setError(submitError)
    }

    //direct back to the questions table
    if ("success") {
      history.push("/questions")
    }
  }

  return (
    <PageWrapper>
      <h1>Add New Question</h1>
      {error}
      <form onSubmit={handleSubmit}>
        <TextBoxInput
          label="Question"
          value={newQuestion}
          onChange={e => {
            setNewQuestion(e.replace('"', "'"))
          }}
        />
        <TextBoxInput
          label="Answer"
          value={newAnswer}
          onChange={e => {
            setNewAnswer(e.replace('"', "'"))
          }}
        />
        {/* <SelectInput
          label="Database"
          value={newDatabase}
          options={[
            { value: "1", label: "DB 1" },
            { value: "2", label: "DB 2" },
          ]}
          onChange={e => setNewDatabase(e)}
        />
        <TextInput
          label="Starting Text (Custom, None or Previous)"
          value={newStarting}
          onChange={e => setNewStarting(e)}
        /> */}
        {/* <Spacer height="small" />
        <fieldset>
          <legend>Restrictions</legend>
          <CheckboxInput label="No Joins" />
          <CheckboxInput label="No Sub Queries" />
          <CheckboxInput label="No Sort" />
          <CheckboxInput label="No Left Join" />
        </fieldset> */}
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
