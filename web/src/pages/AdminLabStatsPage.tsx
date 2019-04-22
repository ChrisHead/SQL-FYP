import React from "react"
import { Spacer } from "../components/Spacer"
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
  const [error, setError] = React.useState("")

  const {
    questions,
    participants,
    // participantsAnswers,
    answers,
    completed,
    createLabStats,
  } = useStats(currentId)

  const labStats = createLabStats(questions, answers, completed)

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
        (participants.length / question.answers) * question.avgMistakes

      return {
        questionNum: questionName,
        difficulty: relDifficulty,
      }
    })
    return pieChartStats
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
      {error}
      {JSON.stringify(pieChartStats())}
      <div>
        <PieChart width={1100} height={800}>
          <Pie
            data={pieChartStats()}
            dataKey="difficulty"
            cx={550}
            cy={400}
            outerRadius={200}
            fill="#8884d8"
            label
          >
            {pieChartStats().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colours[index % colours.length]}
                label
              />
            ))}
          </Pie>
          <Legend
          // payload={pieChartStats().map((question, i) => ({
          //   id: question.name,
          //   type: "square",
          //   value: question.questionNum,
          // }))}
          />
          <Tooltip />
        </PieChart>
        <ComposedChart
          width={1100}
          height={800}
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
          {/* <Scatter dataKey="totalMistakes" fill="red" /> */}
        </ComposedChart>
      </div>
      <div>No. of participants:</div>
      {participants.length}
      <br />
      <br />
      <div>No. of Questions:</div>
      {questions.length}
      <br />
      <br />
      <div>Total No. of Questions Answered:</div>
      {JSON.stringify(totalAnswers())}
      <br />
      <br />
      <div>Avg No. of Questions Answered:</div>
      {JSON.stringify(avgAnswers())}
      <br />
      <br />
      <div>Total No. of Questions Answered Correctly:</div>
      {JSON.stringify(totalCorrectAnswers())}
      <br />
      <br />
      <div>Avg No. of Questions Answered Correctly:</div>
      {JSON.stringify(avgCorrectAnswers())}
      <br />
      <br />
      <div>Total No. of Mistakes:</div>
      {JSON.stringify(totalMistakes())}
      <br />
      <br />
      <div>Avg No. of Mistakes:</div>
      {JSON.stringify(avgMistakes())}
      <br />
      <br />
      <div>QuestionStats:</div>
      {JSON.stringify(labStats)}
      <br />
      <br />
      <div>Questions:</div>
      {JSON.stringify(questions)}
      <br />
      <br />
      <div>Participants:</div>
      {JSON.stringify(participants)}
      <br />
      <br />
      <div>Answers:</div>
      {JSON.stringify(answers)}
      <br />
      <br />
      <div>Correct Answers:</div>
      {JSON.stringify(completed)}
      <br />
      <br />
      {/* <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        > */}
      {/* <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
          <ReferenceLine y={1350} label="Max" stroke="red" />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Scatter dataKey="cnt" fill="red" /> */}
      {/* </ComposedChart> */}
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
        overflowY: "scroll",
      }}
    >
      {children}
    </div>
  )
}
