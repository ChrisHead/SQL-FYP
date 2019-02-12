async function apiRequest(path: string, data: any, authToken?: string) {
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  if (authToken) {
    headers.set("Authorization", authToken)
  }
  const body = typeof data === "string" ? data : JSON.stringify(data)

  const response = await fetch(`http://localhost:3000/api/${path}`, {
    method: "POST",
    body,
    headers,
  })
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
}
