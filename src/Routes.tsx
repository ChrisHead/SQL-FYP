import * as React from "react"
import { Switch, Route } from "react-router-dom"
import { FeedbackPage } from "src/FeedbackPage"
import { ReportBugPage } from "src/ReportBugPage"
import { MainPage } from "./MainPage"

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/Feedback" component={FeedbackPage} />
    <Route path="/Report_Bug" component={ReportBugPage} />
  </Switch>
)
