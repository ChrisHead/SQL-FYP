import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"

interface IUser {
  id: string
  username: string
  admin: boolean
  activity: []
}
export function useUsers() {
  const app = React.useContext(AppContext)
  const [users, setUsers] = React.useState<IUser[]>([])
  React.useEffect(() => {
    if (app.authToken) {
      api.users(app.authToken).then(response => setUsers(response))
    }
  }, [])
  return users
}
