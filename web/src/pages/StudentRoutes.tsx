import * as React from "react"
import { Switch, Route } from "react-router-dom"
import { FeedbackPage } from "src/pages/FeedbackPage"
import { ReportBugPage } from "src/pages/ReportBugPage"
import { StudentMainPage } from "./StudentMainPage"

export const StudentRoutes = () => (
  <Switch>
    <Route exact path="/" component={StudentMainPage} />
    <Route path="/Feedback" component={FeedbackPage} />
    <Route path="/Report_Bug" component={ReportBugPage} />
  </Switch>
)
