import React from "react"
import { Link } from "react-router-dom"
import { api } from "../api"
import { AppContext } from "../AppContext"

export function FeedbackPage() {
  const [feedback, setFeedback] = React.useState("")
  const [response, setResponse] = React.useState("")
  const app = React.useContext(AppContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const submit = await api.feedback(feedback, app.authToken!)
    setFeedback("")
    setResponse("Feedback Submitted")
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <Link
          className="button"
          to="/"
          style={{ display: "flex", margin: 20, padding: 15 }}
        >
          Return
        </Link>
      </div>
      <div
        style={{
          height: window.innerHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Feedback</h1>
        <form
          id={"feedbackForm"}
          onSubmit={handleSubmit}
          style={{ flexDirection: "row" }}
        >
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            wrap="true"
            style={{ height: 200, width: 570, resize: "none" }}
          />
        </form>
        <input
          form={"feedbackForm"}
          style={{ margin: 8 }}
          type="submit"
          value="Submit"
        />
        {response}
      </div>
      <div style={{ flex: 1 }} />
    </div>
  )
}
