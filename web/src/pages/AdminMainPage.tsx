import * as React from "react"
import { Topbar } from "../components/Topbar"
import { AdminEditor } from "../components/AdminEditor"
import { useActivity } from "../hooks/useActivity"

export function AdminMainPage() {
  const { addNewActivity } = useActivity()

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <style>
        {`
            *{box-sizing: border-box;}
          `}
      </style>
      <Topbar addActivity={addNewActivity} />
      <AdminEditor />
    </div>
  )
}
