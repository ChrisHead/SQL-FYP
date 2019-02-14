import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
import { ILab } from "src/stores/DbStore"
export function useLabs() {
  const app = React.useContext(AppContext)
  const [labs, setLabs] = React.useState<ILab[]>([])
  React.useEffect(() => {
    if (app.authToken) {
      api.studentLabs(app.authToken).then(response => setLabs(response))
    }
  }, [])
  return labs
}
