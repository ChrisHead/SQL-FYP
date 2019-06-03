import { IHistory, IQuestion } from "./stores/DbStore"

async function apiRequest(path: string, data: any, authToken?: string) {
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  if (authToken) {
    headers.set("Authorization", authToken)
  }
  const body = typeof data === "string" ? data : JSON.stringify(data)

  const response = await fetch(`http://localhost:3001/api/${path}`, {
    method: "POST",
    body,
    headers,
  })
  //http://localhost:3001/api/${path}
  //https://sql-fyp-server.herokuapp.com/api/${path}
  const json = await response.json()
  return json
}

export const api = {
  async login(username: string, password: string) {
    return apiRequest("login", { username, password })
  },

  async currentUser(authToken: string) {
    return apiRequest("currentUser", {}, authToken)
  },

  async studentLabs(authToken: string) {
    return apiRequest("studentLabs", {}, authToken)
  },

  async questions(authToken: string) {
    return apiRequest("questions", {}, authToken)
  },

  async feedback(
    data: { qOne: string; qTwo: string; qThree: string; comments: string },
    authToken: string
  ) {
    return apiRequest("feedback", { data }, authToken)
  },

  async bugReport(data: string, authToken: string) {
    return apiRequest("bugReport", { data }, authToken)
  },

  async updateHistory(
    data: { questionId: string; history: IHistory },
    authToken: string
  ) {
    return apiRequest("updateHistory", { data }, authToken)
  },

  async updateCompleted(data: { questionId: string }, authToken: string) {
    return apiRequest("updateCompleted", { data }, authToken)
  },

  async updateQuestion(
    data: { updatedQuestion: IQuestion },
    authToken: string
  ) {
    return apiRequest("updateQuestion", { data }, authToken)
  },

  async addQuestion(data: { addedQuestion: IQuestion }, authToken: string) {
    return apiRequest("addQuestion", { data }, authToken)
  },

  async updateActivity(data: { activity: string }, authToken: string) {
    return apiRequest("updateActivity", { data }, authToken)
  },

  async users(authToken: string) {
    return apiRequest("users", {}, authToken)
  },

  async addUser(
    data: { addedUser: { username: string; password: string; admin: boolean } },
    authToken: string
  ) {
    return apiRequest("addUser", { data }, authToken)
  },

  async addLab(data: { addedLab: { labNumber: string } }, authToken: string) {
    return apiRequest("addLab", { data }, authToken)
  },

  async updateUser(
    data: {
      updatedUser: {
        id: string
        username: string
        password: string
        admin: boolean
      }
    },
    authToken: string
  ) {
    return apiRequest("updateUser", { data }, authToken)
  },

  async getUsersAnswersQuestions(data: { userId: string }, authToken: string) {
    return apiRequest("userAnswersQuestions", { data }, authToken)
  },

  async getQuestionsForLab(id: string, authToken: string) {
    return apiRequest("getQuestionsForLab", { id }, authToken)
  },

  async getParticipantsForLab(id: string, authToken: string) {
    return apiRequest("getParticipantsForLab", { id }, authToken)
  },

  async getParticipantsAnswers(id: string, authToken: string) {
    return apiRequest("getParticipantsAnswers", { id }, authToken)
  },

  async getQuestionCompletions(id: string, authToken: string) {
    return apiRequest("getQuestionCompletions", { id }, authToken)
  },

  async getQuestionAnswers(id: string, authToken: string) {
    return apiRequest("getQuestionAnswers", { id }, authToken)
  },

  async getLabNum(id: string, authToken: string) {
    return apiRequest("getLabNum", { id }, authToken)
  },
}
