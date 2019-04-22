import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as React from "react"
import Collapsible from "react-collapsible"

import { ILab } from "../stores/DbStore"

library.add(faAngleDoubleDown)
library.add(faAngleDoubleUp)
library.add(faCheckCircle)

interface IProps {
  labs: ILab[]
  setCurrentQuestion(labId: string, questionId: string): void
  addActivity(activity: string)
  currentLab?: ILab
  currentQuestion?: ILab["questions"][number]
}
export function QuestionsPanel({
  labs,
  setCurrentQuestion,
  addActivity,
  currentLab,
  currentQuestion,
}: IProps) {
  function handleQuestionClick(lab, question) {
    setCurrentQuestion(lab.id, question.id)
  }

  function updateActivity(val) {
    addActivity(val)
  }

  function isSelected(lab, question) {
    return (
      currentLab &&
      currentQuestion &&
      currentLab.id === lab.id &&
      currentQuestion.id === question.id
    )
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
          height: 34,
          justifyContent: "center",
          backgroundColor: "#30434d",
          textAlign: "center",
        }}
      >
        Labs/Questions
      </div>
      {labs.map((lab, i) => (
        <div key={i} style={{ padding: 8 }}>
          <Collapsible
            trigger={
              <>
                <FontAwesomeIcon icon="angle-double-down" />
                <span style={{ margin: "0 16px" }}>
                  {"Lab " + lab.labNumber}
                </span>
                <FontAwesomeIcon icon="angle-double-down" />
              </>
            }
            triggerWhenOpen={
              <>
                <FontAwesomeIcon icon="angle-double-up" />
                <span style={{ margin: "0 16px" }}>
                  {"Lab " + lab.labNumber}
                </span>
                <FontAwesomeIcon icon="angle-double-up" />
              </>
            }
            onOpen={() => updateActivity("Lab Opened: " + lab.id)}
            onClose={() => updateActivity("Lab Closed: " + lab.id)}
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
                className={`question-div ${
                  isSelected(lab, question) ? "active" : ""
                }`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                onClick={() => {
                  handleQuestionClick(lab, question)
                  updateActivity(
                    "Question Selected: " + question.id + " In Lab: " + lab.id
                  )
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* {JSON.stringify({ ...question.answer, history: undefined })} */}
                  <FontAwesomeIcon
                    icon="check-circle"
                    size={"2x"}
                    color={
                      question.answer && question.answer.completed
                        ? "Green"
                        : "White"
                    }
                  />
                </div>
                <div style={{ fontSize: 14, padding: 8 }}>
                  {question.questionNum + ". " + question.question}
                </div>
              </div>
            ))}
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
