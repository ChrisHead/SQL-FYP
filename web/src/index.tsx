import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import "./index.css"
import { Provider } from "mobx-react"
import { DbStore } from "./stores/DbStore"
import { BrowserRouter } from "react-router-dom"
import { AppContext } from "./AppContext"
import { AppStore } from "./stores/AppStore"
import { DbContext } from "./DbContext"

const dbStore = new DbStore()
;(window as any).db = dbStore

const app = new AppStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider db={dbStore} app={app}>
      <AppContext.Provider value={app}>
        <DbContext.Provider value={dbStore}>
          <App />
        </DbContext.Provider>
      </AppContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
)
