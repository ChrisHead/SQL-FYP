import * as React from "react"
import { Route, Switch } from "react-router"

import { AdminDatabase } from "./AdminDatabase"
import { AdminLab } from "./AdminLab"
import { AdminQuestion } from "./AdminQuestion"
import { AdminStats } from "./AdminStats"
import { AdminStudent } from "./AdminStudent"
import { AdminQuestionEditPage } from "../pages/AdminQuestionEditPage"

export function AdminPanel() {
  return (
    <Switch>
      <Route exact path="/students" component={AdminStudent} />
      <Route exact path="/labs" component={AdminLab} />
      <Route exact path="/questions" component={AdminQuestion} />
      <Route
        exact
        path="/questions/:id/edit"
        component={AdminQuestionEditPage}
      />
      <Route exact path="/database" component={AdminDatabase} />
      <Route exact path="/stats" component={AdminStats} />
    </Switch>
  )
}
