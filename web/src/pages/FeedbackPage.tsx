import React from "react"
import { Link } from "react-router-dom"
import { api } from "../api"
import { AppContext } from "../AppContext"
import { useActivity } from "../hooks/useActivity"
import { SelectInput } from "../components/inputs/SelectInput"
import { Spacer } from "../components/Spacer"

export function FeedbackPage({ history }) {
  const [feedback, setFeedback] = React.useState("")
  // const [response, setResponse] = React.useState("")
  const app = React.useContext(AppContext)
  const { addNewActivity } = useActivity()

  const [questionOne, setQuestionOne] = React.useState("")
  const [questionTwo, setQuestionTwo] = React.useState("")
  const [questionThree, setQuestionThree] = React.useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const val = {
      qOne: questionOne,
      qTwo: questionTwo,
      qThree: questionThree,
      comments: feedback,
    }
    const submit = await api.feedback(val, app.authToken!)
    addNewActivity(
      "Feedback Submitted: " +
        "q1: " +
        questionOne +
        " q2: " +
        questionTwo +
        " q3: " +
        questionThree +
        " comments: " +
        feedback
    )
    setFeedback("")
    // setResponse("Feedback Submitted")

    if ("success") {
      history.push("/")
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flex: 1, alignItems: "flex-start" }}>
        <Link
          className="button"
          to="/"
          style={{ display: "flex", margin: 20, padding: 15 }}
          onClick={() => {
            addNewActivity("Return")
          }}
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
          <Spacer height="medium" />

          <fieldset style={{ width: 570 }}>
            <Spacer height="small" />
            <div
              style={{
                width: 570,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SelectInput
                label="How would you rate the usability of this system compared to the
                old one?"
                value={questionOne}
                options={[
                  { key: 1, value: "1", label: "Strong Like" },
                  { key: 2, value: "2", label: "Like" },
                  { key: 3, value: "3", label: "Neutral" },
                  { key: 4, value: "4", label: "Dislike" },
                  { key: 5, value: "5", label: "Strong Dislike" },
                ]}
                blank="Please Select"
                required
                onChange={e => setQuestionOne(e)}
              />
            </div>
          </fieldset>

          <Spacer height="medium" />

          <fieldset style={{ width: 570 }}>
            <div
              style={{
                width: 570,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SelectInput
                label="Do you prefer to see the labs questions on screen?"
                value={questionTwo}
                options={[
                  { key: 1, value: "1", label: "Strong Like" },
                  { key: 2, value: "2", label: "Like" },
                  { key: 3, value: "3", label: "Neutral" },
                  { key: 4, value: "4", label: "Dislike" },
                  { key: 5, value: "5", label: "Strong Dislike" },
                ]}
                blank="Please Select"
                required
                onChange={e => setQuestionTwo(e)}
              />
            </div>
          </fieldset>

          <Spacer height="medium" />

          <fieldset style={{ width: 570 }}>
            <div
              style={{
                width: 570,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <SelectInput
                label="Do you like the immediate feedback on the whether your answer is
                correct?"
                value={questionThree}
                options={[
                  { key: 1, value: "1", label: "Strong Like" },
                  { key: 2, value: "2", label: "Like" },
                  { key: 3, value: "3", label: "Neutral" },
                  { key: 4, value: "4", label: "Dislike" },
                  { key: 5, value: "5", label: "Strong Dislike" },
                ]}
                blank="Please Select"
                required
                onChange={e => setQuestionThree(e)}
              />
            </div>
          </fieldset>

          <Spacer height="large" />

          <div>General Comments:</div>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            wrap="true"
            style={{ height: 200, width: 598, resize: "none" }}
          />
        </form>

        <Spacer height="small" />

        <input
          form={"feedbackForm"}
          style={{ margin: 8 }}
          type="submit"
          value="Submit"
        />
        {/* {response} */}
      </div>
      <div style={{ flex: 1 }} />
    </div>
  )
}
