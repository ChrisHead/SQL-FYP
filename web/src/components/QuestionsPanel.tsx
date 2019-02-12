import * as React from "react"
import { observable } from "mobx"
import { observer, inject } from "mobx-react"
import { DbStore } from "src/stores/DbStore"
import Collapsible from "react-collapsible"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)
library.add(faCheckCircle)

interface IProps {
  db?: DbStore
}

@inject("db")
@observer
export class QuestionsPanel extends React.Component<IProps> {
  getTickColour(comp: boolean) {
    if (comp) {
      return <FontAwesomeIcon icon="check-circle" size={"2x"} color={"Green"} />
    } else {
      return <FontAwesomeIcon icon="check-circle" size={"2x"} />
    }
  }

  currentQuestion(t: string, q: number) {
    this.props.db!.currentQuestion = t + "." + q
    const div = document.getElementById(this.props.db!.currentQuestion)
    div!.style.backgroundColor = "rgba(211, 211, 211, 0.13)"

    const { studentQuestions: questions } = this.props.db!

    questions.map((tutorial, i) => {
      tutorial.questions.map((question, k) => {
        if (
          tutorial.tutorial + "." + question.number !==
          this.props.db!.currentQuestion
        ) {
          const tempDiv = document.getElementById(
            tutorial.tutorial + "." + question.number
          )
          tempDiv!.style.background = "none"
        }
      })
    })
    console.log("Current Question: " + this.props.db!.currentQuestion)
  }

  @observable
  render() {
    const { studentQuestions: questions } = this.props.db!
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
        {questions.map((tutorial, i) => (
          <div key={i} style={{ padding: 8 }}>
            <Collapsible
              trigger={
                <>
                  <FontAwesomeIcon icon="angle-double-down" />
                  <span style={{ margin: "0 16px" }}>{tutorial.tutorial}</span>
                  <FontAwesomeIcon icon="angle-double-down" />
                </>
              }
              triggerWhenOpen={
                <>
                  <FontAwesomeIcon icon="angle-double-up" />
                  <span style={{ margin: "0 16px" }}>{tutorial.tutorial}</span>
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
              {tutorial.questions.map((question, q) => (
                <div
                  key={q}
                  id={tutorial.tutorial + "." + question.number}
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
                    {this.getTickColour(question.completed)}
                  </div>

                  <div
                    style={{ fontSize: 14, padding: 8 }}
                    onClick={() =>
                      this.currentQuestion(tutorial.tutorial, question.number)
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
}
