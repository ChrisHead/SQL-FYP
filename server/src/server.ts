// load variables from the .env file and add them to process.env.XXX
require("dotenv").config()

import express from "express"
import cors from "cors"
import { db, secretKey, pgp } from "./config"
import morgan from "morgan"
import * as jwt from "jsonwebtoken"
import { IUser } from "./types"
import { createAddApiEndpoint } from "./middleware"

const conn = pgp(db)

// create app
const app = express()
// security stuff. see google
app.use(cors())
// parse json body
app.use(express.json())
// log requests
app.use(morgan("dev"))

const addApiEndpoint = createAddApiEndpoint(app, conn)

addApiEndpoint("login", {}, async ({ req }) => {
  const { username, password } = req.body

  const sql = `SELECT * FROM "users" WHERE "username"='${pgp.as.value(
    username
  )}' AND "password"=crypt('${pgp.as.value(password)}', "password")`
  const results = await conn.any(sql)

  if (results.length !== 1) {
    return { error: "no one found!!!! :(" }
  }
  const user = results[0]
  const authToken = jwt.sign({ id: user.id }, secretKey)
  return { data: { authToken } }
})

addApiEndpoint(
  "currentUser",
  { permission: "authenticated" },
  async ({ currentUser, req, res, next }) => {
    const data = { username: currentUser.username, admin: currentUser.admin }
    return data
  }
)

addApiEndpoint("users", { permission: "admin" }, async () => {
  const sql = `SELECT * FROM "users"`
  const results = await conn.any<IUser>(sql)
  return results
})

addApiEndpoint("studentLabs", { permission: "authenticated" }, async () => {
  const sql = `SELECT "labs".*, json_agg(questions.*) questions
  FROM   "labs"
      join "labsQuestions" on "labs"."id" = "labsQuestions"."labId"
      join "questions" on "labsQuestions"."questionId" = "questions"."id"
      group by "labs"."id"`
  const results = await conn.any<IUser>(sql)
  return results
})

addApiEndpoint("questions", { permission: "admin" }, async () => {
  const sql = `SELECT * FROM questions`
  const results = await conn.any<IUser>(sql)
  return results
})

addApiEndpoint(
  "feedback",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body
    const feedbackSql = `INSERT INTO "feedbacks" ("feedback", "dateTime") VALUES ('${pgp.as.value(
      data.data
    )}', now()) RETURNING "id"`
    const feedback = await conn.any<IUser>(feedbackSql)
    const userFeedbackSql = `INSERT INTO "usersFeedbacks" ("userId", "feedbackId") VALUES ('${pgp.as.value(
      currentUser.id
    )}', '${feedback[0].id}')`
    const userFeedback = await conn.any<IUser>(userFeedbackSql)
    return userFeedback
  }
)

addApiEndpoint(
  "bugReport",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body
    const bugReportSql = `INSERT INTO "bugReports" ("bugReport", "dateTime") VALUES ('${pgp.as.value(
      data.data
    )}', now()) RETURNING "id"`
    const bugReport = await conn.any<IUser>(bugReportSql)
    const userBugReportSql = `INSERT INTO "usersBugReports" ("userId", "bugReportId") VALUES ('${pgp.as.value(
      currentUser.id
    )}', '${bugReport[0].id}')`
    const userBugReport = await conn.any<IUser>(userBugReportSql)
    return userBugReport
  }
)

addApiEndpoint(
  "updateHistory",
  { permission: "authenticated" },
  async ({ currentUser, req, res, next }) => {
    const data = JSON.parse(req.body.data)

    const labsQuestionsIdSql = `SELECT id from "labsQuestions" WHERE "labId" = ('${pgp.as.value(
      data[0].labNum
    )}') AND "questionId" = ('${pgp.as.value(data[0].questionNum)}')`
    const labsQuestionsId = await conn.any<IUser>(labsQuestionsIdSql)

    const usersLabsQuestionsIdSql = `SELECT id FROM "usersLabsQuestions" WHERE "userId" = '${pgp.as.value(
      currentUser.id
    )}' AND "labQuestionId" = '${pgp.as.value(labsQuestionsId[0].id)}'`
    const usersLabsQuestionsId = await conn.any<IUser>(usersLabsQuestionsIdSql)

    const answerIdSql = `SELECT id FROM "answers" WHERE "usersLabsQuestionsId" = '${pgp.as.value(
      usersLabsQuestionsId[0].id
    )}'`
    const answerId = await conn.any<IUser>(answerIdSql)

    delete data[0].labNum
    delete data[0].questionNum

    const updateHistorySql = `UPDATE answers SET "history" = "history" || ${pgp.as.json(
      [data[0]]
    )} WHERE "id" = '${pgp.as.value(answerId[0].id)}'`
    const updateHistory = await conn.any<IUser>(updateHistorySql)
    return updateHistory
  }
)

addApiEndpoint(
  "getHistory",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body.data
    console.log(data)
    const labsQuestionsIdSql = `SELECT id from "labsQuestions" WHERE "labId" = '${pgp.as.value(
      data.labNum
    )}' AND "questionId" = '${pgp.as.value(data.questionNum)}'`
    const labsQuestionsId = await conn.any<IUser>(labsQuestionsIdSql)

    const uLQIdSql = `SELECT id from "usersLabsQuestions" WHERE "labQuestionId" = '${pgp.as.value(
      labsQuestionsId[0].id
    )}' AND "userId" = '${currentUser.id}'`
    const uLQId = await conn.any<IUser>(uLQIdSql)

    const answersSql = `SELECT history from "answers" WHERE "usersLabsQuestionsId" = '${pgp.as.value(
      uLQId[0].id
    )}'`
    const answers = await conn.any<IUser>(answersSql)
    return answers
  }
)

addApiEndpoint(
  "getCompleted",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body.data
    console.log(data)
    const labsQuestionsIdSql = `SELECT id from "labsQuestions" WHERE "labId" = '${pgp.as.value(
      data.labNum
    )}' AND "questionId" = '${pgp.as.value(data.questionNum)}'`
    const labsQuestionsId = await conn.any<IUser>(labsQuestionsIdSql)

    const uLQIdSql = `SELECT id from "usersLabsQuestions" WHERE "labQuestionId" = '${pgp.as.value(
      labsQuestionsId[0].id
    )}' AND "userId" = '${currentUser.id}'`
    const uLQId = await conn.any<IUser>(uLQIdSql)

    const answersSql = `SELECT completed from "answers" WHERE "usersLabsQuestionsId" = '${pgp.as.value(
      uLQId[0].id
    )}'`
    const answers = await conn.any<IUser>(answersSql)
    console.log(answers)
    return answers
  }
)

// default response is 404
app.use((req, res, next) => next(404))

// handle errors by returning them as json
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err)
    if (err instanceof Error) {
      res.send({ error: err.message })
    } else {
      res.send({ error: err })
    }
  }
)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`the server is listening at http://localhost:${port}`)
})

// const errors =  {
//   pageNotFound: '404 not found',
//   recordNotFound: 'couldnt find a record'
// }
