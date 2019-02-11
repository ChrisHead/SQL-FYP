import React, { useContext } from "react"
import { TextInput } from "../components/inputs/TextInput"
import { DbContext } from "../DbContext"
import { SelectInput } from "../components/inputs/SelectInput"
import { CheckboxInput } from "../components/inputs/CheckboxInput"
import { Spacer } from "../components/Spacer"
import { RouteComponentProps } from "react-router-dom"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminQuestionEditPage({ match, history }: IPageProps<{ id: string }>) {
  const id = Number(match.params.id)
  const db = useContext(DbContext)
  const question = db.adminQuestions.find(question => question.id === id)
  debugger

  if (!question) {
    return <p>404 Question Not Found</p>
  }

  function handleSubmit(e) {
    e.preventDefault()

    // submit form logic

    if ("success") {
      history.push("/questions")
    }
  }

  return (
    <PageWrapper>
      <h1>Editing Question {id}</h1>
      {JSON.stringify(question)}

      <form onSubmit={handleSubmit}>
        <TextInput label="Question" value={question.question} />
        <TextInput label="Answer" value={question.answer} />
        <SelectInput
          label="Database"
          value={question.database + ""}
          options={[{ value: "1", label: "DB 1" }]}
        />
        <TextInput
          label="Starting Text (Custom, None or 'previous')"
          value={question.startingText}
        />
        <TextInput label="Response After" value={String(question.respondAfter)} />
        <Spacer height="small" />
        <fieldset>
          <legend>Restrictions</legend>
          <CheckboxInput label="No Joins" />
          <CheckboxInput label="No Sub Queries" />
          <CheckboxInput label="No Sort" />
          <CheckboxInput label="No Left Join" />
        </fieldset>
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
