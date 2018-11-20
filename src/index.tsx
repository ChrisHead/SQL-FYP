import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import "./index.css"
import { Provider } from "mobx-react"
import { DbStore } from "./stores/DbStore"
import { observable } from "mobx"
import { BrowserRouter } from "react-router-dom"

export class AppStore {
  @observable sessionId?: string
  @observable windowWidth = window.innerWidth
  @observable windowHeight = window.innerHeight

  constructor() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    })
  }

  login(id) {
    // DO REQUEST
    if (!id) {
      return "An error occured"
    } else {
      this.sessionId = id
      return
    }
  }

  logout() {
    this.sessionId = undefined
  }
}

const dbStore = new DbStore()
;(window as any).db = dbStore

const app = new AppStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider db={dbStore} app={app}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
)
