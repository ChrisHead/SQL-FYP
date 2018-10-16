import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { Provider } from "mobx-react"
import { DbStore } from "./stores/DbStore"

const dbStore = new DbStore()
;(window as any).db = dbStore
ReactDOM.render(
  <Provider db={dbStore}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
)
