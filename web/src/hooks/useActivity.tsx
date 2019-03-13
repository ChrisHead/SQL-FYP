import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"

export function useActivity() {
  const app = React.useContext(AppContext)
  async function addNewActivity(activity: string) {
    await api.updateActivity({ activity }, app.authToken!)
  }
  return { addNewActivity }
}
