import * as React from "react"
import { Topbar } from "./components/Topbar"
import { Sidebar } from "./components/Sidebar"
import ReactSidebar from "react-sidebar"
import { Editor } from "./components/Editor"
import { theme } from "./constants/theme"

class App extends React.Component {
  public render() {
    return (
      <div>
        <style>{`
        *{box-sizing: border-box;}`}</style>
        <Topbar />
        <ReactSidebar
          sidebar={<Sidebar />}
          open
          docked
          styles={{
            sidebar: { background: "white", width: "300px" },
            root: { top: `${theme.topbarHeight}px` },
          }}
        >
          <Editor />
        </ReactSidebar>
      </div>
    )
  }
}

export default App
