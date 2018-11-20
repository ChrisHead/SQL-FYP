import { inject, observer } from "mobx-react"
import React from "react"
import { AppStore } from "."
import { LoginPage } from "./LoginPage"
import { Routes } from "./Routes"
import { withRouter } from "react-router-dom"

interface IProps {
  app?: AppStore
}
const AppBase = ({ app }: IProps) => {
  if (app!.sessionId) {
    return <Routes />
  } else {
    return <LoginPage />
  }
}

export const App = (withRouter as any)(inject("app")(observer(AppBase)))
