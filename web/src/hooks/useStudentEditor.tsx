import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
import { ILab } from "src/stores/DbStore"
import { DbContext } from "../DbContext"
import { observe } from "mobx"
import produce from "immer"

export function useStudentEditor() {
  const app = React.useContext(AppContext)
  const db = React.useContext(DbContext)

  const [labs, setLabs] = React.useState<ILab[]>([])
  const [currentLabId, setCurrentLabId] = React.useState<string | null>(null)
  const [currentQuestionId, setCurrentQuestionId] = React.useState<
    string | null
  >(null)
  const [sqlValue, setSqlValue] = React.useState("")
  const [dbKey, setDbKey] = React.useState(0)
  const [results, setResults] = React.useState([])
  const [error, setError] = React.useState("")
  const [answerError, setAnswerError] = React.useState("")

  const loaded = labs && labs.length > 0
  const currentLab = currentLabId
    ? labs.find(lab => lab.id === currentLabId)
    : undefined
  const currentLabIdx = currentLabId
    ? labs.findIndex(lab => lab.id === currentLabId)
    : -1
  const currentQuestion =
    currentLab && currentQuestionId
      ? currentLab.questions.find(question => question.id === currentQuestionId)
      : undefined
  const currentQuestionIdx =
    currentLab && currentQuestionId
      ? currentLab.questions.findIndex(
          question => question.id === currentQuestionId
        )
      : -1
  const history =
    currentQuestion && currentQuestion.answer
      ? currentQuestion.answer.history
      : []
  const answerAcknowledgement = db.answerAcknowledgement

  React.useEffect(() => {
    if (app.authToken) {
      api.studentLabs(app.authToken).then(response => setLabs(response))
    }
  }, [])

  function handleSetCurrentQuestion(labId: string, questionId: string) {
    if (currentQuestionId && currentQuestionId !== questionId) {
      db.clear()
      setSqlValue("")
      setAnswerError("")
    }
    setCurrentLabId(labId)
    setCurrentQuestionId(questionId)
  }

  async function handleExecuteQuery() {
    if (!currentQuestion || currentLabIdx === -1 || currentQuestionIdx === -1) {
      return
    }
    db.executeSql(sqlValue)
    setSqlValue("")
    const { correct, error } = await validateAnswer()
    if (error) {
      setAnswerError(error)
    }
    addHistoryItem(sqlValue, correct, db.error, error)
  }

  function handleSelectHistory(history) {
    setSqlValue(history.value)
  }

  function clearResults() {
    setResults([])
    setAnswerError("")
    db.clearResults()
  }

  React.useEffect(() => {
    observe(db, "results", change => {
      setResults(change.newValue)
    })
    observe(db, "error", change => {
      setError(change.newValue)
    })
    observe(db, "dbKey", change => {
      setDbKey(change.newValue)
    })
  }, [])

  async function addHistoryItem(value, completed, error, answerError) {
    if (!currentQuestionId) {
      return
    }
    const historyItem = {
      value,
      dateTime: Date(),
      completed,
      error,
      answerError,
    }
    const newLabs = produce(labs, draft => {
      const currentLabIdx = labs.findIndex(lab => lab.id === currentLabId)
      const currentQuestionIdx =
        currentLabIdx > -1
          ? labs[currentLabIdx].questions.findIndex(
              question => question.id === currentQuestionId
            )
          : -1

      if (currentQuestionIdx === -1) {
        return
      }
      const currentQuestion = draft[currentLabIdx].questions[currentQuestionIdx]
      if (!currentQuestion.answer) {
        currentQuestion.answer = createAnswer()
      }
      currentQuestion.answer.history = [
        ...currentQuestion.answer.history,
        historyItem,
      ]
    })
    setLabs(newLabs)

    await api.updateHistory(
      { questionId: currentQuestionId, history: historyItem },
      app.authToken!
    )
  }
  async function validateAnswer() {
    if (!currentQuestion || currentLabIdx === -1 || currentQuestionIdx === -1) {
      return { correct: false, error: "" }
    }
    const result = db.checkAnswer(currentQuestion.modelAnswer)
    if (result.correct) {
      const newLabs = produce(labs, draft => {
        const currentQuestion =
          draft[currentLabIdx].questions[currentQuestionIdx]
        if (!currentQuestion.answer) {
          currentQuestion.answer = createAnswer()
        }
        currentQuestion.answer.completed = true
      })
      setLabs(newLabs)
      await api.updateCompleted(
        { questionId: currentQuestion.id },
        app.authToken!
      )
    }
    return result
  }

  return {
    labs,
    loaded,
    handleSetCurrentQuestion,
    handleExecuteQuery,
    handleSelectHistory,
    history,
    currentQuestion,
    currentLab,
    sqlValue,
    setSqlValue,
    clearResults,
    error,
    results,
    dbKey,
    answerError,
    answerAcknowledgement,
  }
}

function createAnswer() {
  return {
    id: Math.random() + "",
    history: [],
    completed: false,
  }
}
