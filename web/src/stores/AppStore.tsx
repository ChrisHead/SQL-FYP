import { observable } from "mobx"
import { api } from "../api"

interface ICurrentUser {
  username: string
  admin: boolean
}

export class AppStore {
  @observable
  authToken?: string
  @observable
  currentUser?: ICurrentUser
  @observable
  windowWidth = window.innerWidth
  @observable
  windowHeight = window.innerHeight
  constructor() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    })
  }
  async login(username: string, password: string) {
    if (!username) {
      return "username is required"
    }

    const response = await api.login(username, password)
    // id = "admin"
    // DO REQUEST
    if (response.error) {
      return response.error
    } else {
      const { authToken } = response.data
      this.authToken = authToken

      await this.loadCurrentUser()
    }
  }

  async loadCurrentUser() {
    if (!this.authToken) {
      throw new Error("cant load current user. not authenticated")
    }

    const currentUser = await api.currentUser(this.authToken)
    this.currentUser = currentUser
  }

  logout() {
    // await api.logout()
    this.authToken = undefined
  }
}
