import React, { useContext } from "react"
import { Route, Switch } from "react-router-dom"

import { AppContext } from "./AppContext"
import { AdminMainPage } from "./pages/AdminMainPage"
import { FeedbackPage } from "./pages/FeedbackPage"
import { LoginPage } from "./pages/LoginPage"
import { ReportBugPage } from "./pages/ReportBugPage"
import { StudentMainPage } from "./pages/StudentMainPage"
import { Observer } from "mobx-react"
import { LoadingScreen } from "./components/LoadingScreen"

export function App() {
  const app = useContext(AppContext)

  return (
    <Observer>
      {() => {
        if (!app.authToken) {
          return <LoginPage />
        }
        if (!app.currentUser) {
          return <LoadingScreen />
        }
        const isAdmin = app.currentUser.admin
        return (
          <Switch>
            <Route exact path="/Feedback" component={FeedbackPage} />
            <Route exact path="/Report_Bug" component={ReportBugPage} />
            {isAdmin ? (
              <Route path="/" component={AdminMainPage} />
            ) : (
              <Route path="/" component={StudentMainPage} />
            )}
          </Switch>
        )
      }}
    </Observer>
  )
}
