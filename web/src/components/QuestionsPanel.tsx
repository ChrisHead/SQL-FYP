import * as React from "react"
import Collapsible from "react-collapsible"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import { DbContext } from "src/DbContext"
import { useLabs } from "../hooks/useLabs"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)
library.add(faCheckCircle)

export function QuestionsPanel() {
  const db = React.useContext(DbContext)
  const labs = useLabs()

  function getTickColour(comp: boolean) {
    if (comp) {
      return <FontAwesomeIcon icon="check-circle" size={"2x"} color={"Green"} />
    } else {
      return <FontAwesomeIcon icon="check-circle" size={"2x"} />
    }
  }

  function currentQuestion(q: number) {
    db.currentQuestion = q

    const div = document.getElementById(q.toString())
    div!.style.backgroundColor = "rgba(211, 211, 211, 0.13)"

    labs.map((lab, i) => {
      lab.questions.map((q, l) => {
        if (q.id !== db.currentQuestion) {
          const tempDiv = document.getElementById(q.id.toString())
          tempDiv!.style.background = "none"
        }
      })
    })
    console.log("Current Question: " + db.currentQuestion)
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <div
        style={{
          padding: 8,
          margin: 10,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#30434d",
        }}
      >
        Questions
      </div>
      {labs.map((lab, i) => (
        <div key={i} style={{ padding: 8 }}>
          <Collapsible
            trigger={
              <>
                <FontAwesomeIcon icon="angle-double-down" />
                <span style={{ margin: "0 16px" }}>
                  {"Week " + lab.labNumber}
                </span>
                <FontAwesomeIcon icon="angle-double-down" />
              </>
            }
            triggerWhenOpen={
              <>
                <FontAwesomeIcon icon="angle-double-up" />
                <span style={{ margin: "0 16px" }}>
                  {"Week " + lab.labNumber}
                </span>
                <FontAwesomeIcon icon="angle-double-up" />
              </>
            }
            transitionTime={100}
            overflowWhenOpen="auto"
            triggerStyle={{
              backgroundColor: "#30434d",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              padding: 8,
            }}
          >
            {lab.questions.map((question, i) => (
              <div
                key={i}
                id={question.id.toString()}
                className="question-div"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {getTickColour(question.completed)}
                </div>

                <div
                  style={{ fontSize: 14, padding: 8 }}
                  onClick={() => currentQuestion(question.id)}
                >
                  {question.question}
                </div>
              </div>
            ))}
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
