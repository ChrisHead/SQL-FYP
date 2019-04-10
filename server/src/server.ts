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
    return { error: "Username or Password is Incorrect" }
  }
  const user = results[0]
  const authToken = jwt.sign({ id: user.id }, secretKey)
  await addActivity(user, "Login")
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
  SELECT id, username, admin, activity
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
    console.log(req.body.data)
    const sql = `
    INSERT INTO "feedbacks"
    ("qOne", "qTwo", "qThree", "comments", "userId", "dateTime")
    VALUES (
    '${pgp.as.value(req.body.data.qOne)}',
    '${pgp.as.value(req.body.data.qTwo)}',
    '${pgp.as.value(req.body.data.qThree)}',
    '${pgp.as.value(req.body.data.comments)}',
    '${currentUser.id}',
    now())
    RETURNING "id"
    `
    const feedback = await conn.any<IUser>(sql)
    return feedback
  }
)

addApiEndpoint(
  "bugReport",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    const data = req.body
    const sql = `
    INSERT INTO "bugReports" ("bugReport", "userId", "dateTime")
    VALUES ('${pgp.as.value(data.data)}', '${
      currentUser.id
    }', now()) RETURNING "id"
    `
    const bugReport = await conn.any<IUser>(sql)
    return bugReport
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
    const sql = `
    UPDATE answers
    SET "completed" = true
    WHERE "userId" = '${pgp.as.value(currentUser.id)}'
    AND "questionId" = '${pgp.as.value(questionId)}'
    `
    const updateCompleted = await conn.any<IUser>(sql)
    return updateCompleted
  }
)

addApiEndpoint(
  "updateQuestion",
  { permission: "admin" },
  async ({ currentUser, req }) => {
    const questionId = req.body.data.updatedQuestion.id
    const question = req.body.data.updatedQuestion.question
    const modelAnswer = req.body.data.updatedQuestion.modelAnswer
    const databaseId = req.body.data.updatedQuestion.databaseId
    const startingText = req.body.data.updatedQuestion.startingText
    const sql = `
      UPDATE questions
      SET
      "question" = '${pgp.as.value(question)}',
      "modelAnswer" = '${pgp.as.value(modelAnswer)}',
      "databaseId" = '${pgp.as.value(databaseId)}',
      "startingText" = '${pgp.as.value(startingText)}'
      WHERE "id" = '${pgp.as.value(questionId)}'
    `
    const updateQuestion = await conn.any<IUser>(sql)
    return updateQuestion
  }
)

addApiEndpoint(
  "addQuestion",
  { permission: "admin" },
  async ({ currentUser, req }) => {
    const question = req.body.data.addedQuestion.question
    const modelAnswer = req.body.data.addedQuestion.modelAnswer
    const databaseId = req.body.data.addedQuestion.databaseId
    const startingText = req.body.data.addedQuestion.startingText
    const sql = `
      INSERT INTO
      questions ("question","modelAnswer","databaseId","startingText")
      VALUES
      ('${pgp.as.value(question)}',
      '${pgp.as.value(modelAnswer)}',
      '${pgp.as.value(databaseId)}',
      '${pgp.as.value(startingText)}')
    `
    const addQuestion = await conn.any<IUser>(sql)
    return addQuestion
  }
)

addApiEndpoint(
  "updateActivity",
  { permission: "authenticated" },
  async ({ currentUser, req }) => {
    return addActivity(currentUser, req.body.data.activity)
  }
)

addApiEndpoint(
  "addUser",
  { permission: "admin" },
  async ({ currentUser, req }) => {
    const username = req.body.data.addedUser.username
    const password = req.body.data.addedUser.password
    const admin = req.body.data.addedUser.admin
    const sql = `
      INSERT INTO
      users ("username","password","admin")
      VALUES
      ('${pgp.as.value(username)}',
      crypt('${pgp.as.value(password)}', gen_salt('bf')),
      '${pgp.as.value(admin)}')
    `
    const addQuestion = await conn.any<IUser>(sql)
    return addQuestion
  }
)

addApiEndpoint(
  "updateUser",
  { permission: "admin" },
  async ({ currentUser, req }) => {
    const userId = req.body.data.updatedUser.id
    const username = req.body.data.updatedUser.username
    const password = req.body.data.updatedUser.password
    const sql = `
      UPDATE users
      SET
      "username" = '${pgp.as.value(username)}',
      "password" = crypt('${pgp.as.value(password)}', gen_salt('bf'))
      WHERE "id" = '${pgp.as.value(userId)}'
    `
    const updateUser = await conn.any<IUser>(sql)
    return updateUser
  }
)

addApiEndpoint(
  "addLab",
  { permission: "admin" },
  async ({ currentUser, req }) => {
    const labNumber = req.body.data.addedLab.labNumber
    const sql = `
      INSERT INTO
      labs ("labNumber","dateTime")
      VALUES
      ('${pgp.as.value(labNumber)}',
      now())
    `
    const addLab = await conn.any<IUser>(sql)
    return addLab
  }
)

addApiEndpoint(
  "userAnswersQuestions",
  { permission: "admin" },
  async ({ currentUser, req, res, next }) => {
    const userId = req.body.data
    const sql = `

    SELECT "labNumber", history, completed, question, "modelAnswer"
    FROM
    (
    SELECT * from labs, "labsQuestions"
    WHERE labs.id = "labId"
    ) t1
    JOIN
    (
    SELECT *
    FROM answers, questions
    WHERE "questionId" = questions.id
    AND "userId" = '${pgp.as.value(userId)}'
    ) t2
    ON 	(t1."questionId" = t2."questionId")
    `
    const userAnswersQuestions = await conn.any<IUser>(sql)
    console.log(userAnswersQuestions)
    return userAnswersQuestions
  }
)

async function addActivity(user: IUser, activity: string) {
  const updateActivitySql = `
    UPDATE users
    SET "activity" = "activity" || ${pgp.as.json([
      { dateTime: Date(), activity },
    ])}
    WHERE "id" = '${pgp.as.value(user.id)}'
    RETURNING "activity"
  `
  const updateActivity = await conn.one<{ id: string }>(updateActivitySql)
  return updateActivity
}

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
