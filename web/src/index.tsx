import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import "./index.css"
import { Provider } from "mobx-react"
import { BrowserRouter } from "react-router-dom"
import { AppContext } from "./AppContext"
import { AppStore } from "./stores/AppStore"

const app = new AppStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider app={app}>
      <AppContext.Provider value={app}>
        <App />
      </AppContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
)
