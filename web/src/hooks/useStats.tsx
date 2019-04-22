import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"

interface IQuestion {
  id: string
  questionNum: number
}

interface IAnswer {
  questionId: string
  history: {
    dateTime: string
    value: string
    error: string
    answerError: string
    completed: boolean
  }[]
  completed: boolean
}

interface ICompleted {
  questionId: string
  completed: boolean
}

interface ILabStats {
  questionId: string
  questionNum: number
  answers: number
  completed: number
  totalMistakes: number
  avgMistakes: number
}

export function useStats(labId: string) {
  const app = React.useContext(AppContext)
  const [questions, setQuestions] = React.useState<IQuestion[]>([])
  const [participants, setParticipants] = React.useState([])
  // const [participantsAnswers, setParticipantsAnswers] = React.useState([])

  const [answers, setAnswers] = React.useState<IAnswer[][]>([])
  const [completed, setCompleted] = React.useState<ICompleted[][]>([])
  const [completedTemp, setCompletedTemp] = React.useState<ICompleted[]>([])

  React.useEffect(() => {
    if (app.authToken) {
      api
        .getQuestionsForLab(labId, app.authToken)
        .then(response => setQuestions(response))
      api
        .getParticipantsForLab(labId, app.authToken)
        .then(response => setParticipants(response))
      // api.getParticipantsAnswers(labId, app.authToken)
    }
  }, [])

  React.useEffect(() => {
    questions.forEach(question => {
      if (app.authToken) {
        api.getQuestionAnswers(question.id, app.authToken).then(response => {
          updateAnswers(response)
        })
      }
    })
  }, [questions])

  React.useEffect(() => {
    questions.forEach(question => {
      if (app.authToken) {
        api
          .getQuestionCompletions(question.id, app.authToken)
          .then(response => {
            setCompletedTemp(response)
          })
      }
    })
  }, [questions])

  function updateAnswers(response: []) {
    const ans = answers
    ans.push(response)
    setAnswers(ans)
  }

  React.useEffect(() => {
    const cumm = completed.filter(entry => entry.length > 0)
    cumm.push(completedTemp)
    setCompleted(cumm)
  }, [completedTemp])

  //////////////////////////////
  //////////Functions////////////
  //////////////////////////////

  function createLabStats(
    paramsQuestions: IQuestion[],
    paramsAnswers: IAnswer[][],
    paramsCompleted: ICompleted[][]
  ) {
    const questionStats: any = []
    paramsQuestions.forEach(question => {
      const newStats: ILabStats = {
        questionId: question.id,
        questionNum: question.questionNum,
        answers: getNumOfAnswers(question.id, paramsAnswers),
        completed: getNumOfCompleted(question.id, paramsCompleted),
        totalMistakes: getTotalNumOfMistakes(question.id, paramsAnswers),
        avgMistakes: getAvgNumOfMistakes(
          question.id,
          paramsAnswers,
          getNumOfAnswers(question.id, paramsAnswers)
        ),
      }
      questionStats.push(newStats)
    })
    return questionStats
  }

  function getNumOfAnswers(id: string, paramsAnswers: IAnswer[][]) {
    let count = 0
    paramsAnswers.forEach(answerArray => {
      if (answerArray[0].questionId === id) {
        count = answerArray.length
      }
    })
    return count
  }

  function getNumOfCompleted(id: string, paramsCompleted: ICompleted[][]) {
    let count = 0
    paramsCompleted.forEach(answerArray => {
      if (answerArray[0] !== undefined) {
        if (answerArray[0].questionId === id) {
          count = answerArray.length
        }
      }
    })
    return count
  }

  function getAvgNumOfMistakes(
    id: string,
    paramsAnswers: IAnswer[][],
    numOfAnswers: number
  ) {
    let count = 0
    paramsAnswers.forEach(answerArray => {
      if (answerArray[0].questionId === id) {
        answerArray.forEach(answer => {
          answer.history.forEach(record => {
            if (record.completed === false) {
              count++
            }
          })
        })
      }
    })
    count = Math.round(count / numOfAnswers)
    return count
  }

  function getTotalNumOfMistakes(id: string, paramsAnswers: IAnswer[][]) {
    let count = 0
    paramsAnswers.forEach(answerArray => {
      if (answerArray[0].questionId === id) {
        answerArray.forEach(answer => {
          answer.history.forEach(record => {
            if (record.completed === false) {
              count++
            }
          })
        })
      }
    })
    return count
  }

  return {
    questions,
    participants,
    // participantsAnswers,
    answers,
    completed,
    createLabStats,
  }
}
