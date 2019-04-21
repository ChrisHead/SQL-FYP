import React from "react"
import { Spacer } from "../components/Spacer"
import { RouteComponentProps } from "react-router-dom"
import { api } from "../api"
import { AppContext } from "../AppContext"
import { useStats } from "../hooks/useStats"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminLabStatsPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)
  const [error, setError] = React.useState("")

  const {
    questions,
    participants,
    // participantsAnswers,
    answers,
    completed,
    createLabStats,
  } = useStats(currentId)

  const labStats = createLabStats(questions, answers, completed)

  function numOfAnswersForLab() {
    let val = 0
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] !== undefined) {
        val = val + answers[i].length
      }
    }
    return val
  }

  function numOfCorrectAnswersForLab() {
    let val = 0
    for (let i = 0; i < questions.length; i++) {
      if (completed[i] !== undefined) {
        val = val + completed[i].length
      }
    }
    return val
  }

  function totalMistakes() {
    let count = 0
    labStats.forEach(question => {
      count = count + question.totalMistakes
    })
    return count
  }

  function avgMistakes() {
    let count = 0
    labStats.forEach(question => {
      count = count + question.totalMistakes
    })
    return Math.round(count / participants.length)
  }

  if (!currentId) {
    return <p>404 Lab Not Found</p>
  }

  return (
    <PageWrapper>
      <h1>Statistics For Lab {currentId}</h1>
      {error}
      <div>Number of participants:</div>
      {participants.length}
      <br />
      <br />
      <div>Number of Questions:</div>
      {questions.length}
      <br />
      <br />
      <div>Num Of Answers For Lab:</div>
      {JSON.stringify(numOfAnswersForLab())}
      <br />
      <br />
      <div>Num Of Correct Answers For Lab:</div>
      {JSON.stringify(numOfCorrectAnswersForLab())}
      <br />
      <br />
      <div>Total Num Of Mistakes For Lab:</div>
      {JSON.stringify(totalMistakes())}
      <br />
      <br />
      <div>Avg Num Of Mistakes For Lab:</div>
      {JSON.stringify(avgMistakes())}
      <br />
      <br />
      <div>QuestionStats:</div>
      {JSON.stringify(labStats)}
      <br />
      <br />
      <div>Questions:</div>
      {JSON.stringify(questions)}
      <br />
      <br />
      <div>Participants:</div>
      {JSON.stringify(participants)}
      <br />
      <br />
      <div>Answers:</div>
      {JSON.stringify(answers)}
      <br />
      <br />
      <div>Correct Answers:</div>
      {JSON.stringify(completed)}
      <br />
      <br />
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
        height: 900,
        overflowY: "scroll",
      }}
    >
      {children}
    </div>
  )
}
