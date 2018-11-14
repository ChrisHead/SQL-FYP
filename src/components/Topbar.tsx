import * as React from "react"
export const Topbar = () => {
  return (
    <div
      style={{
        padding: 8,
        borderBottom: "1px solid black",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
      }}
    >
      Topbar B512678
      <div style={{ flex: 1 }} />
      <button style={{ width: 100 }}>Logout</button>
    </div>
  )
}
