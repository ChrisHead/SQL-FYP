import * as React from "react"
import { api } from "src/api"
import { AppContext } from "src/AppContext"
import { IQuestion } from "src/stores/DbStore"
export function useQuestions() {
  const app = React.useContext(AppContext)
  const [questions, setQuestions] = React.useState<IQuestion[]>([])
  React.useEffect(() => {
    if (app.authToken) {
      api.questions(app.authToken).then(response => setQuestions(response))
    }
  }, [])
  return questions
}
