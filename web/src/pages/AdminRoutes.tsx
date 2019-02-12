import * as React from "react"
import { Switch, Route } from "react-router-dom"
import { FeedbackPage } from "src/pages/FeedbackPage"
import { ReportBugPage } from "src/pages/ReportBugPage"
import { AdminMainPage } from "./AdminMainPage"

export const AdminRoutes = () => (
  <Switch>
    <Route path="/Feedback" component={FeedbackPage} />
    <Route path="/Report_Bug" component={ReportBugPage} />
    <Route path="/" component={AdminMainPage} />
  </Switch>
)
