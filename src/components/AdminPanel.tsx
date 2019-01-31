import * as React from "react"
import { DbStore } from "src/stores/DbStore"
import { inject, observer } from "mobx-react"
import { AdminStudent } from "./AdminStudent"
import { AdminLab } from "./AdminLab"
import { AdminQuestion } from "./AdminQuestion"
import { AdminDatabase } from "./AdminDatabase"
import { AdminStats } from "./AdminStats"

interface IProps {
  db?: DbStore
}

@inject("db")
@observer
export class AdminPanel extends React.Component<IProps> {
  render() {
    if (this.props.db!.currentControl === "students") {
      return <AdminStudent />
    } else if (this.props.db!.currentControl === "labs") {
      return <AdminLab />
    } else if (this.props.db!.currentControl === "questions") {
      return <AdminQuestion />
    } else if (this.props.db!.currentControl === "database") {
      return <AdminDatabase />
    } else if (this.props.db!.currentControl === "stats") {
      return <AdminStats />
    } else {
      return <div>null</div>
    }
  }
}
