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
import { api } from "../api"
import { AppContext } from "../AppContext"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)
library.add(faCheckCircle)

export function QuestionsPanel() {
  const db = React.useContext(DbContext)
  const app = React.useContext(AppContext)
  const labs = useLabs()

  // function getTickColour(id: string) {
  //   db.currentQuestion = id
  //   })

  //   // if () {
  //   //   return <FontAwesomeIcon icon="check-circle" size={"2x"} color={"Green"} />
  //   // } else {
  //   //   return <FontAwesomeIcon icon="check-circle" size={"2x"} color={"White"} />
  //   // }
  // }

  // async function getCompletedValue(lab: string, question: string) {
  //   const questionData = {
  //     labNum: lab,
  //     questionNum: question,
  //   }
  //   const completed = await api.getCompleted(questionData, app.authToken!)
  //   return completed
  // }

  // function addToCompletedStore(lab: string, question: string) {
  //   const vals = {
  //     labNum: lab,
  //     questionNum: question,
  //     completed: true,
  //   }
  //   // const temp = getCompletedValue(lab, question).then(() => {
  //   //   console.log(temp)
  //   // })

  //   db.completedStore.push(vals)
  //   console.log(db.completedStore)
  // }

  async function currentQuestion(q: string) {
    db.currentQuestion = q

    const div = document.getElementById(q)

    div!.style.backgroundColor = "rgba(240, 237, 237, 0.493)"
    div!.style.color = "rgba(0, 0, 0, 0.781)"

    labs.map((lab, i) => {
      lab.questions.map((q, l) => {
        if (q.id !== db.currentQuestion) {
          const tempDiv = document.getElementById(q.id)
          tempDiv!.style.background = "none"
          tempDiv!.style.color = "white"
        }
      })
    })
    // console.log("Current Question: " + db.currentQuestion)
  }

  function currentLab(l: string) {
    db.currentLab = l
    // console.log("Current Lab: " + db.currentLab)
  }

  async function getHistory() {
    db.clearHistory()
    const questionData = {
      labNum: db.currentLab,
      questionNum: db.currentQuestion,
    }
    const questionHistory = await api.getHistory(questionData, app.authToken!)
    // console.log(questionHistory[0].history[0].value)
    questionHistory[0].history.map((entry, i) => {
      db.history.unshift(entry)
    })
  }

  async function updateActivity() {
    console.log("updating")
  }

  console.log(labs)

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
        <div
          key={i}
          style={{ padding: 8 }}
          onClick={() => {
            currentLab(lab.id)
            // db.clearCompleted()
          }}
        >
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
                  {/* <FontAwesomeIcon icon="check-circle" size={"2x"} color={"White"} /> */}
                  {/* {addToCompletedStore(lab.id, question.id)} */}
                  {/* {getTickColour(question.id)} */}
                </div>

                <div
                  style={{ fontSize: 14, padding: 8 }}
                  onClick={
                    () => {
                      currentQuestion(question.id)
                      getHistory()
                      updateActivity()
                    }
                    /* Add function to update activity array */
                  }
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
