import { inject, observer } from "mobx-react"
import React from "react"
import { AppStore } from "."
import { LoginPage } from "./LoginPage"
import { StudentRoutes } from "./StudentRoutes"
import { AdminRoutes } from "./AdminRoutes"
import { withRouter } from "react-router-dom"

interface IProps {
  app?: AppStore
}
const AppBase = ({ app }: IProps) => {
  if (app!.sessionId && app!.sessionId === "admin") {
    return <AdminRoutes />
  } else if (app!.sessionId) {
    return <StudentRoutes />
  } else {
    return <LoginPage />
  }
}

export const App = (withRouter as any)(inject("app")(observer(AppBase)))
