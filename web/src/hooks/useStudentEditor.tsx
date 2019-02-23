import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
import { ILab } from "src/stores/DbStore"
import { DbContext } from "../DbContext"
import { observe } from "mobx"
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

  React.useEffect(() => {
    if (app.authToken) {
      api.studentLabs(app.authToken).then(response => setLabs(response))
    }
  }, [])

  React.useEffect(() => {
    db.sqlValue = sqlValue
  }, [sqlValue])

  function handleSetCurrentQuestion(labId: string, questionId: string) {
    if (db.currentQuestion !== questionId && db.currentQuestion) {
      db.clear()
      setSqlValue("")
    }
    db.currentLab = labId
    db.currentQuestion = questionId
    setCurrentLabId(labId)
    setCurrentQuestionId(questionId)
    //function to handle activity update
  }

  // function activityUpdate() {
  //    if question is not completed:
  //    send update to server
  // }

  async function handleExecuteQuery() {
    // console.log("db sql value ", db.sqlValue)
    const sql = sqlValue
    // console.log("sql value ", sql)
    db.executeSql()
    const historyItem = {
      value: sql,
      dateTime: Date(),
      //function to set completed correctly
      completed: false,
      error: db.error,
    }
    // console.log(historyItem)

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

    const currentLab = labs[currentLabIdx]
    const currentQuestion = currentLab.questions[currentQuestionIdx]

    console.log(db.checkAnswer(currentQuestion.modelAnswer))
    //display incorrect/correct message
    //if correct update in db and histtory item below

    if (currentQuestion.answer) {
      currentQuestion.answer.history = [
        ...currentQuestion.answer.history,
        historyItem,
      ]
      // if historyItem.completed === true, currentQuestion.answer = true
    } else {
      currentQuestion.answer = {
        id: "TEMP_ID",
        activity: [],
        // if historyItem.completed === true, currentQuestion.answer = true
        completed: false,
        questionId: currentQuestion.id,
        history: [historyItem],
      }
    }
    setLabs(labs)

    await api.updateHistory(
      { questionId: currentQuestion.id, history: historyItem },
      app.authToken!
    )

    //update completed value if currentQuestion.answer.completed === true
  }

  function handleSelectHistory(history) {
    db!.sqlValue = history.value
  }

  const loaded = labs && labs.length > 0

  const currentLab = currentLabId
    ? labs.find(lab => lab.id === currentLabId)
    : undefined
  const currentQuestion =
    currentLab && currentQuestionId
      ? currentLab.questions.find(question => question.id === currentQuestionId)
      : undefined

  const history =
    currentQuestion && currentQuestion.answer
      ? currentQuestion.answer.history
      : []

  const [results, setResults] = React.useState([])
  const [error, setError] = React.useState("")

  function clearResults() {
    setResults([])
    db.clearResults()
  }

  React.useEffect(() => {
    observe(db, "results", change => {
      setResults(change.newValue)
    })
    observe(db, "sqlValue", change => {
      // console.log("newvalue", change.newValue)
      setSqlValue(change.newValue)
    })
    observe(db, "error", change => {
      setError(change.newValue)
    })
    observe(db, "dbKey", change => {
      setDbKey(change.newValue)
    })
  }, [])

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
    // results: results.concat(`${dbKey} asd` as any),
  }
}
