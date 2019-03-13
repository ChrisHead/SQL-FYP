import * as React from "react"
import SplitPane from "react-split-pane"
import { AppContext } from "../AppContext"
import { DbContext } from "../DbContext"
import { useStudentEditor } from "../hooks/useStudentEditor"
import { useActivity } from "../hooks/useActivity"
import { QuestionsPanel } from "./QuestionsPanel"
import { ResultsPanel } from "./ResultsPanel"
import { SqlPanel } from "./SqlPanel"
import { Observer } from "mobx-react"
import { DbTables } from "./DbTables"

export function StudentEditor() {
  const resultsSection = React.useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = React.useState(1000)

  React.useEffect(updateContentWidth, [])

  function updateContentWidth() {
    if (resultsSection.current) {
      const width = resultsSection.current.getBoundingClientRect().width
      setContentWidth(width)
    }
  }

  function handleChange() {
    updateContentWidth()
  }

  const app = React.useContext(AppContext)
  const db = React.useContext(DbContext)

  const {
    labs,
    loaded,
    handleSetCurrentQuestion,
    handleExecuteQuery,
    history,
    handleSelectHistory,
    currentQuestion,
    currentLab,
    sqlValue,
    setSqlValue,
    clearResults,
    error,
    results,
    dbKey,
    answerError,
    answerAcknowledgement,
  } = useStudentEditor()

  const { addNewActivity } = useActivity()

  if (!loaded) {
    return <>"Loading"</>
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        position: "relative",
      }}
    >
      <SplitPane
        split="vertical"
        minSize={0.1 * app.windowWidth}
        defaultSize={0.2 * app.windowWidth}
        maxSize={0.5 * app.windowWidth}
        onChange={handleChange}
      >
        <QuestionsPanel
          labs={labs}
          setCurrentQuestion={handleSetCurrentQuestion}
          addActivity={addNewActivity}
          currentLab={currentLab}
          currentQuestion={currentQuestion}
          dbKey={dbKey}
        />
        {currentQuestion ? (
          <>
            <SplitPane
              split="horizontal"
              pane2Style={{ flex: 1, overflow: "auto" }}
              minSize={0.2 * app.windowHeight}
              defaultSize={0.5 * app.windowHeight}
              maxSize={0.8 * app.windowHeight}
            >
              <SqlPanel
                history={history}
                addActivity={addNewActivity}
                onSelectHistory={handleSelectHistory}
                onExecute={handleExecuteQuery}
                sqlValue={sqlValue}
                onSqlValueChange={setSqlValue}
              />
              <div ref={resultsSection}>
                <SplitPane
                  split="vertical"
                  minSize={0.3 * contentWidth}
                  defaultSize={0.5 * contentWidth}
                  maxSize={0.7 * contentWidth}
                  pane2Style={{ overflow: "auto" }}
                >
                  <ResultsPanel
                    onClearResults={clearResults}
                    addActivity={addNewActivity}
                    error={error}
                    results={results}
                    answerError={answerError}
                    answerAcknowledgement={answerAcknowledgement}
                  />
                  <Observer>
                    {() => <DbTables db={db.db} dbKey={dbKey} />}
                  </Observer>
                </SplitPane>
              </div>
            </SplitPane>
          </>
        ) : (
          "Select a week and a question to begin"
        )}
      </SplitPane>
    </div>
  )
}
