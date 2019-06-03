import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
import { ILab } from "src/stores/DbStore"
import produce from "immer"
import { useAlasql } from "../hooks/useAlasql"

export function useStudentEditor() {
  const app = React.useContext(AppContext)

  const {
    db,
    results,
    sqlError,
    sqlVal,
    answerAcknowledgement,
    executeSql,
    checkAnswer,
    clear,
    clearAlaResults,
  } = useAlasql()

  const [labs, setLabs] = React.useState<ILab[]>([])
  const [currentLabId, setCurrentLabId] = React.useState<string | null>(null)
  const [currentQuestionId, setCurrentQuestionId] = React.useState<
    string | null
  >(null)
  const [sqlValue, setSqlValue] = React.useState("")
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

  React.useEffect(() => {
    if (app.authToken) {
      api.studentLabs(app.authToken).then(response => setLabs(response))
    }
  }, [])

  function handleSetCurrentQuestion(labId: string, questionId: string) {
    setCurrentLabId(labId)
    setCurrentQuestionId(questionId)
  }

  React.useEffect(() => {
    clear()
    setSqlValue("")
    setAnswerError("")
  }, [currentQuestionId])

  async function handleExecuteQuery() {
    if (!currentQuestion || currentLabIdx === -1 || currentQuestionIdx === -1) {
      return
    }
    clearResults()
    executeSql(sqlValue)
    validation()
  }

  React.useEffect(() => {
    validation()
  }, [results, sqlError, sqlVal])

  async function validation() {
    if (results.length || sqlError.length || sqlVal.length) {
      const { correct, error } = await validateAnswer()
      if (error) {
        setAnswerError(error)
      }
      await addHistoryItem(sqlValue, correct, sqlError, error)
      if (correct && currentQuestion) {
        await api.updateCompleted(
          { questionId: currentQuestion.id },
          app.authToken!
        )
      }
      setSqlValue("")
    }
  }

  function handleSelectHistory(history) {
    setSqlValue(history.value)
  }

  function clearResults() {
    setAnswerError("")
    clearAlaResults()
  }

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
      currentQuestion.answer.completed =
        currentQuestion.answer.completed || completed
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
    const result = checkAnswer(currentQuestion.modelAnswer)
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
    db,
    clearResults,
    sqlError,
    results,
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
