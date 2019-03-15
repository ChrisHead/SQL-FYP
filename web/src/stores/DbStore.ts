export interface IHistory {
  dateTime: string
  value: string
  error: string
  answerError: string
  completed: boolean
}
export interface ILab {
  id: string
  labNumber: number
  dateTime: string
  questions: {
    id: string
    question: string
    modelAnswer: string
    answer?: {
      id: string
      history: IHistory[]
      completed: boolean
    }
    databaseId: string
    startingText: string
    response: string
    respondAfter: number
    autoResponse: boolean
  }[]
}

export interface IQuestion {
  id: string
  question: string
  modelAnswer: string
  databaseId: string
  startingText: string
}

interface IConditions {
  conditionOne: boolean
  conditionTwo: boolean
  conditionThree: boolean
  conditionFour: boolean
}
