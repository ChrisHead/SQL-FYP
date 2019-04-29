import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { useStats } from "../hooks/useStats"
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from "recharts"

type IPageProps<T extends Record<string, string>> = RouteComponentProps<T>

export function AdminLabStatsPage({
  match,
  history,
}: IPageProps<{ id: string }>) {
  const currentId = String(match.params.id)

  const {
    questions,
    participants,
    participantsAnswers,
    answers,
    completed,
    createLabStats,
    leaderBoardStats,
    labStats,
    leaderStats,
  } = useStats(currentId)

  // const [stats, setStats] = React.useState(useStats(currentId))

  // const [questions, setQuestions] = React.useState(stats.questions)
  // const [participants, setParticipants] = React.useState(stats.participants)
  // const [participantsAnswers, setParticipantsAnswers] = React.useState(stats.participantsAnswers)
  // const [answers, setAnswers] = React.useState(stats.answers)
  // const [completed, setCompleted] = React.useState(stats.completed)

  if (!currentId) {
    return <p>404 Lab Not Found</p>
  }

  function totalAnswers() {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] !== undefined) {
        count = count + answers[i].length
      }
    }
    return count
  }

  function avgAnswers() {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] !== undefined) {
        count = count + answers[i].length
      }
    }
    return Math.round(count / participants.length)
  }

  function totalCorrectAnswers() {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (completed[i] !== undefined) {
        count = count + completed[i].length
      }
    }
    return count
  }

  function avgCorrectAnswers() {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (completed[i] !== undefined) {
        count = count + completed[i].length
      }
    }
    return Math.round(count / participants.length)
  }

  function totalMistakes() {
    let count = 0
    labStats.forEach(question => {
      count = count + question.totalMistakes
    })
    return count
  }

  function avgMistakes() {
    let count = 0
    labStats.forEach(question => {
      count = count + question.totalMistakes
    })
    return Math.round(count / participants.length)
  }

  function pieChartStats() {
    const pieChartStats = labStats.map((question, i) => {
      const questionName = "Question " + question.questionNum
      const relDifficulty =
        (question.answers / (question.completed + 0.5)) *
        (question.avgMistakes + 1)

      return {
        questionNum: questionName,
        difficulty: Math.round(relDifficulty * 100) / 100,
      }
    })
    return pieChartStats
  }

  function totalLeaderAnswers() {
    let count = 0
    leaderStats.forEach(user => {
      count = count + user.answers
    })
    return count
  }

  function totalLeaderCompleted() {
    let count = 0
    leaderStats.forEach(user => {
      count = count + user.completed
    })
    return count
  }

  function totalLeaderMistakes() {
    let count = 0
    leaderStats.forEach(user => {
      count = count + user.mistakes
    })
    return count
  }

  function leaderCoefficients() {
    const vals = leaderStats.map((user, i) => {
      const concernCoefficient = Math.round(
        ((questions.length / (user.completed + 0.5)) *
          (user.avgMistakes + 1) *
          100) /
          100
      )
      return {
        username: user.username,
        concern: concernCoefficient,
        answers: user.answers,
        completed: user.completed,
        mistakes: user.mistakes,
        aveMistakes: user.avgMistakes,
      }
    })
    return vals.sort((a, b) => {
      return a.concern - b.concern
    })
  }

  function filteredLeaderBoard(vals: any[]) {
    const divs = vals.map((user, i) => (
      <div
        className="tooltip"
        key={i}
        style={{
          background: leaderColour(user),
          margin: 1,
          paddingLeft: 5,
          paddingRight: 5,
          borderRadius: 5,
          color: "#30434D",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>Student: {user.username}</div>
        <div>
          <span className="tooltiptext">
            Attempted: {user.answers}
            <br />
            Completed: {user.completed}
            <br />
            Avg. Mistakes: {Math.round(user.aveMistakes)}{" "}
          </span>
        </div>
        <div>Concern: {user.concern}</div>
      </div>
    ))
    return divs
  }

  function leaderColour(user: any) {
    if (user.concern < 40) {
      return "#4CAF50"
    } else if (user.concern < 100) {
      return "#FFC107"
    } else if (user.concern < 200) {
      return "#FF5722"
    } else {
      return "#F44336"
    }
  }

  const colours = [
    "#0088FE",
    "#00C49F",
    "#4CAF50",
    "#FF8042",
    "#F44336",
    "#FFC107",
    "#9C27B0",
    "#FF5722",
    "#607D8B",
    "#CDDC39",
  ]

  return (
    <PageWrapper>
      <h1>Statistics For Lab {currentId}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              flex: 1,
              margin: 5,
              backgroundColor: "#354f5d",
              padding: 5,
            }}
          >
            Relative Difficulty:
            <br />
            <PieChart width={600} height={500}>
              <Pie
                data={pieChartStats()}
                dataKey="difficulty"
                cx={300}
                cy={250}
                outerRadius={200}
                fill="#8884d8"
                label
              >
                {pieChartStats().map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colours[index % colours.length]}
                  />
                ))}
              </Pie>
              {/* <Legend/> */}
              <Tooltip />
            </PieChart>
          </div>
          <div
            style={{
              flex: 1,
              margin: 5,
              backgroundColor: "#354f5d",
              padding: 5,
            }}
          >
            Question Comparison:
            <br />
            <ComposedChart
              width={800}
              height={500}
              data={labStats}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="questionNum"
                label={{
                  value: "Question Num.",
                  position: "bottom",
                  fill: "white",
                }}
                tick={{ fill: "white" }}
              />
              <YAxis
                label={{
                  value: "Value",
                  position: "insideLeft",
                  angle: -90,
                  fill: "white",
                }}
                tick={{ fill: "white" }}
              />
              <Tooltip />
              <Legend iconSize={20} verticalAlign="top" height={36} />
              <ReferenceLine
                y={participants.length}
                label={{
                  value: "No. of Students Taking Lab",
                  position: "bottom",
                  fill: "white",
                }}
                stroke="red"
                ifOverflow="extendDomain"
              />
              <Area
                name="No. of Students Answering Question"
                type="monotone"
                dataKey="answers"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar
                name="No. of Correct Answers"
                dataKey="completed"
                barSize={50}
                fill="#413ea0"
              />
              <Line
                name="Avg. No. of Mistakes"
                type="monotone"
                dataKey="avgMistakes"
                stroke="#ff7300"
              />
            </ComposedChart>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", height: 245 }}>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              margin: 5,
              backgroundColor: "#354f5d",
              padding: 5,
            }}
          >
            Leaderboard:
            <br />
            <br />
            {filteredLeaderBoard(leaderCoefficients())}
          </div>
          <div
            style={{
              flex: 1,
              margin: 5,
              backgroundColor: "#354f5d",
              padding: 5,
            }}
          >
            Lab Statistics:
            <br />
            <br />
            <div className="Statistic">
              No. of Participants: {participants.length}
            </div>
            <div className="Statistic">
              No. of Questions: {questions.length}
            </div>
            <div className="Statistic">
              Total No. of Questions Answered: {JSON.stringify(totalAnswers())}
            </div>
            <div className="Statistic">
              Total No. of Questions Answered Correctly:{" "}
              {JSON.stringify(totalCorrectAnswers())}
            </div>
            <div className="Statistic">
              Total No. of Mistakes: {JSON.stringify(totalMistakes())}
            </div>
            <div className="Statistic">
              Avg No. of Questions Answered: {JSON.stringify(avgAnswers())}
            </div>
            <div className="Statistic">
              Avg No. of Questions Answered Correctly:{" "}
              {JSON.stringify(avgCorrectAnswers())}
            </div>
            <div className="Statistic">
              Avg No. of Mistakes: {JSON.stringify(avgMistakes())}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

function PageWrapper({ children }) {
  return (
    <div
      style={{
        padding: 8,
        backgroundColor: "#30434d",
        marginTop: 10,
        marginBottom: 10,
        height: 900,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  )
}
