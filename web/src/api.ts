import { IHistory, IQuestion } from "./stores/DbStore"

async function apiRequest(path: string, data: any, authToken?: string) {
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  if (authToken) {
    headers.set("Authorization", authToken)
  }
  const body = typeof data === "string" ? data : JSON.stringify(data)

  const response = await fetch(
    `https://sql-fyp-server.herokuapp.com/api/${path}`,
    {
      method: "POST",
      body,
      headers,
    }
  )
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

  async feedback(data: string, authToken: string) {
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
}
