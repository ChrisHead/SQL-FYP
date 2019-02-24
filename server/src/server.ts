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

  const sql = `
  SELECT *
  FROM "users"
  WHERE "username"='${pgp.as.value(username)}'
  AND "password"=crypt('${pgp.as.value(password)}', "password")
  `
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
  const sql = `
  SELECT *
  FROM "users"
  `
  const results = await conn.any<IUser>(sql)
  return results
})

addApiEndpoint(
  "studentLabs",
  { permission: "authenticated" },
  async ({ currentUser }) => {
    const sql = `
  SELECT
    "labs".*,
    ((
      SELECT json_agg("questions".*)
      FROM (
        SELECT
          *,
          (SELECT row_to_json("answers".*) FROM (
            SELECT * FROM "answers" WHERE "questionId" = "questions"."id" AND "userId"='${
              currentUser.id
            }'
          ) "answers") "answer"
        FROM "questions"
        WHERE "id" IN (SELECT "questionId" FROM "labsQuestions" WHERE "labId"="labs"."id" )
          ) "questions"
    )) questions
  FROM "labs"
  `
    const results = await conn.any<IUser>(sql)
    return results
  }
)

addApiEndpoint("questions", { permission: "admin" }, async () => {
  const sql = `
  SELECT *
  FROM questions
  `
  const results = await conn.any<IUser>(sql)
  return results
})

addApiEndpoint(
  "feedback",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body
    const feedbackSql = `
    INSERT INTO "feedbacks" ("feedback", "dateTime")
    VALUES ('${pgp.as.value(data.data)}', now()) RETURNING "id"
    `
    const feedback = await conn.any<IUser>(feedbackSql)
    const userFeedbackSql = `
    INSERT INTO "usersFeedbacks" ("userId", "feedbackId")
    VALUES ('${pgp.as.value(currentUser.id)}', '${feedback[0].id}')
    `
    const userFeedback = await conn.any<IUser>(userFeedbackSql)
    return userFeedback
  }
)

addApiEndpoint(
  "bugReport",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body
    const bugReportSql = `
    INSERT INTO "bugReports" ("bugReport", "dateTime")
    VALUES ('${pgp.as.value(data.data)}', now()) RETURNING "id"
    `
    const bugReport = await conn.any<IUser>(bugReportSql)
    const userBugReportSql = `
    INSERT INTO "usersBugReports" ("userId", "bugReportId")
    VALUES ('${pgp.as.value(currentUser.id)}', '${bugReport[0].id}')
    `
    const userBugReport = await conn.any<IUser>(userBugReportSql)
    return userBugReport
  }
)

addApiEndpoint(
  "updateHistory",
  { permission: "authenticated" },
  async ({ currentUser, req, res, next }) => {
    const {
      questionId,
      history,
    }: {
      questionId: string
      labId: string
      history: { value: string; error: string; completed: boolean }
    } = req.body.data
    const sql = `
      INSERT INTO "answers" ("userId", "questionId")
      VALUES ('${currentUser.id}', '${pgp.as.value(questionId)}')
      ON CONFLICT ("userId", "questionId") DO UPDATE SET "userId"=EXCLUDED."userId"
      RETURNING "id"
    `
    const answerRecord = await conn.one<{ id: string }>(sql)
    const historyItem = { ...history, dateTime: Date() }
    const updateHistorySql = `
      UPDATE answers
      SET "history" = "history" || ${pgp.as.json([historyItem])}
      WHERE "id" = '${pgp.as.value(answerRecord.id)}'
      RETURNING "history"
    `
    const updateHistory = await conn.one<{ id: string }>(updateHistorySql)
    return updateHistory
  }
)

addApiEndpoint(
  "updateCompleted",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const questionId = req.body.data.questionId
    console.log(questionId)
    const updateCompletedSql = `
    UPDATE answers
    SET "completed" = true
    WHERE "userId" = '${pgp.as.value(currentUser.id)}'
    AND "questionId" = '${pgp.as.value(questionId)}'
    `
    const updateCompleted = await conn.any<IUser>(updateCompletedSql)
    return updateCompleted
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
