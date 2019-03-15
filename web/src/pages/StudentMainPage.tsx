import * as React from "react"
import { Topbar } from "../components/Topbar"
import { StudentEditor } from "../components/StudentEditor"
import { useActivity } from "../hooks/useActivity"

export function StudentMainPage() {
  const { addNewActivity } = useActivity()

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <style>
        {`
            *{box-sizing: border-box;}
          `}
      </style>
      <Topbar addActivity={addNewActivity} />
      <StudentEditor />
    </div>
  )
}
