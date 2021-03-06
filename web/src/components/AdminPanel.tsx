import * as React from "react"
import { Route, Switch } from "react-router"

import { AdminDatabase } from "./AdminDatabase"
import { AdminLab } from "./AdminLab"
import { AdminQuestion } from "./AdminQuestion"
import { AdminUsers } from "./AdminUsers"
import { AdminQuestionEditPage } from "../pages/AdminQuestionEditPage"
import { AdminQuestionAddPage } from "../pages/AdminQuestionAddPage"
import { AdminUserEditPage } from "../pages/AdminUserEditPage"
import { AdminUserAddPage } from "../pages/AdminUserAddPage"
import { AdminLabEditPage } from "../pages/AdminLabEditPage"
import { AdminLabAddPage } from "../pages/AdminLabAddPage"
import { AdminLabStatsPage } from "../pages/AdminLabStatsPage"
import { AdminUserActivityPage } from "../pages/AdminUserActivityPage"
import { AdminUserAnswerPage } from "../pages/AdminUserAnswerPage"
export function AdminPanel() {
  return (
    <Switch>
      <Route exact path="/users" component={AdminUsers} />
      <Route exact path="/labs" component={AdminLab} />
      <Route exact path="/questions" component={AdminQuestion} />
      <Route
        exact
        path="/questions/:id/edit"
        component={AdminQuestionEditPage}
      />
      <Route exact path="/questions/add" component={AdminQuestionAddPage} />
      <Route exact path="/users/:id/edit" component={AdminUserEditPage} />
      <Route exact path="/users/:id/answers" component={AdminUserAnswerPage} />
      <Route
        exact
        path="/users/:id/activity"
        component={AdminUserActivityPage}
      />
      <Route exact path="/users/add" component={AdminUserAddPage} />
      <Route exact path="/lab/:id/edit" component={AdminLabEditPage} />
      <Route exact path="/lab/:id/stats" component={AdminLabStatsPage} />
      <Route exact path="/lab/add" component={AdminLabAddPage} />
      <Route exact path="/database" component={AdminDatabase} />
    </Switch>
  )
}
