import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"

interface IQuestion {
  id: string
  questionNum: number
}

interface IUser {
  id: string
}

interface IParticpantsAnswers {
  userId: string
  username: string
  history: {
    dateTime: string
    value: string
    error: string
    answerError: string
    completed: boolean
  }[]
  completed: boolean
}

interface ILeaderStats {
  id: string
  username: string
  answers: number
  completed: number
  mistakes: number
  avgMistakes: number
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
  const [participants, setParticipants] = React.useState<IUser[]>([])
  const [participantsAnswers, setParticipantsAnswers] = React.useState<
    IParticpantsAnswers[]
  >([])

  const [answers, setAnswers] = React.useState<IAnswer[][]>([])
  const [completed, setCompleted] = React.useState<ICompleted[][]>([])

  const [timer, setTimer] = React.useState(0)

  React.useEffect(() => {
    if (app.authToken) {
      api
        .getQuestionsForLab(labId, app.authToken)
        .then(response => setQuestions(response))
      api
        .getParticipantsForLab(labId, app.authToken)
        .then(response => setParticipants(response))
      api
        .getParticipantsAnswers(labId, app.authToken)
        .then(response => setParticipantsAnswers(response))
    }
  }, [])

  React.useEffect(() => {
    const promises = questions.map(question => {
      if (app.authToken) {
        return api.getQuestionAnswers(question.id, app.authToken)
      }
    })
    Promise.all(promises).then(results => {
      setAnswers(results)
    })
  }, [questions])

  React.useEffect(() => {
    const promises = questions.map(question => {
      if (app.authToken) {
        return api.getQuestionCompletions(question.id, app.authToken)
      }
    })
    Promise.all(promises).then(results => {
      const val = results.filter(entry => entry.length > 0)
      setCompleted(results)
    })
  }, [questions, answers])

  React.useEffect(() => {
    setTimeout(() => {
      setTimer(timer + 1)
    }, 5000)

    if (app.authToken) {
      api
        .getQuestionsForLab(labId, app.authToken)
        .then(response => setQuestions(response))
      api
        .getParticipantsForLab(labId, app.authToken)
        .then(response => setParticipants(response))
      api
        .getParticipantsAnswers(labId, app.authToken)
        .then(response => setParticipantsAnswers(response))
    }
  }, [timer])

  //////////////////////////////
  //////////Functions////////////
  //////////////////////////////

  function createLabStats(
    paramsQuestions: IQuestion[],
    paramsAnswers: IAnswer[][],
    paramsCompleted: ICompleted[][]
  ) {
    const questionStats: ILabStats[] = []
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
            if (!record.completed) {
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
            if (!record.completed) {
              count++
            }
          })
        })
      }
    })
    return count
  }

  function leaderBoardStats(paramsAnswers: IParticpantsAnswers[]) {
    const leaderStats: ILeaderStats[] = []
    const ids: string[] = []

    let currentId = ""
    let currentUsername = ""
    if (paramsAnswers[0] !== undefined) {
      currentId = paramsAnswers[0].userId
      currentUsername = paramsAnswers[0].username
      ids.push(currentId)
    }

    let answerCount = 0
    let completedCount = 0
    let mistakeCount = 0

    paramsAnswers.forEach(answer => {
      if (ids.indexOf(answer.userId) !== -1) {
        answerCount++
        if (answer.completed) {
          completedCount++
        }
        answer.history.forEach(record => {
          if (!record.completed) {
            mistakeCount++
          }
        })
      } else {
        leaderStats.push({
          id: currentId,
          username: currentUsername,
          answers: answerCount,
          completed: completedCount,
          mistakes: mistakeCount,
          avgMistakes: mistakeCount / answerCount,
        })
        currentId = answer.userId
        currentUsername = answer.username
        ids.push(currentId)
        answerCount = 1
        if (answer.completed) {
          completedCount = 1
        } else {
          completedCount = 0
        }
        mistakeCount = 0
        answer.history.forEach(record => {
          if (!record.completed) {
            mistakeCount++
          }
        })
      }
    })
    leaderStats.push({
      id: currentId,
      username: currentUsername,
      answers: answerCount,
      completed: completedCount,
      mistakes: mistakeCount,
      avgMistakes: mistakeCount / answerCount,
    })
    return leaderStats
  }

  const [labStats, setLabStats] = React.useState<any>([])
  const [leaderStats, setLeaderStats] = React.useState<any>([])

  React.useEffect(() => {
    setLabStats(createLabStats(questions, answers, completed))
  }, [questions, answers, completed])

  React.useEffect(() => {
    setLeaderStats(leaderBoardStats(participantsAnswers))
  }, [participantsAnswers])

  return {
    questions,
    participants,
    participantsAnswers,
    answers,
    completed,
    labStats,
    leaderStats,
    createLabStats,
    leaderBoardStats,
  }
}
