import React from "react"
import { TextInput } from "../components/inputs/TextInput"
import { SelectInput } from "../components/inputs/SelectInput"
import { CheckboxInput } from "../components/inputs/CheckboxInput"
import { BooleanInput } from "../components/inputs/BooleanInput"
import { Spacer } from "../components/Spacer"
import { RouteComponentProps } from "react-router-dom"
import { useQuestions } from "../hooks/useQuestions"
import { api } from "../api"
import { AppContext } from "../AppContext"
import { IQuestion } from "src/stores/DbStore"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminQuestionEditPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)
  const question = useQuestions().find(lab => lab.id === currentId)
  const app = React.useContext(AppContext)
  const [error, setError] = React.useState("")

  const [newQuestion, setNewQuestion] = React.useState("")
  const [newAnswer, setNewAnswer] = React.useState("")
  const [newDatabase, setNewDatabase] = React.useState("")
  const [newStarting, setNewStarting] = React.useState("")

  React.useEffect(() => {
    if (question !== undefined) {
      setNewQuestion(question.question)
      setNewAnswer(question.modelAnswer)
      setNewDatabase(question.databaseId)
      setNewStarting(question.startingText)
    }
  }, [question])

  if (!question) {
    return <p>404 Question Not Found</p>
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const submitError = await api.updateQuestion(
      {
        updatedQuestion: {
          id: currentId,
          question: newQuestion,
          modelAnswer: newAnswer,
          databaseId: newDatabase,
          startingText: newStarting,
        },
      },
      app.authToken!
    )
    console.log(submitError)
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
      <h1>Editing Question {currentId}</h1>
      {error}
      {JSON.stringify(question)}

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Question"
          value={newQuestion}
          onChange={e => setNewQuestion(e)}
        />
        <TextInput
          label="Answer"
          value={newAnswer}
          onChange={e => setNewAnswer(e)}
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

// function thing<T extends string | number>(x: T[]): T {
//   return x[0]
// }
