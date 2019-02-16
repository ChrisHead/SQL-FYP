require("dotenv").config()

import pgPromise from "pg-promise"
import { db } from "../src/config"
import { questions } from "./seedQuestions"
export const pgp = pgPromise({
  query(e) {
    let str = e.query
    str = str.replace(/crypt\('.*', "password"\)/, "[PASSWORD]")
    console.log(str)
  },
})
const conn = pgp(db)

async function run() {
  await conn.any(`DROP SCHEMA "public" CASCADE`)
  await conn.any(`CREATE SCHEMA "public"`)
  await conn.any(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username" TEXT UNIQUE,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN DEFAULT 'false'
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "databaseTemplates" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "data" JSONB DEFAULT '{}'
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "labs" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "labNumber" INTEGER UNIQUE,
    "dateTime" TIMESTAMP NOT NULL
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "questions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "question" TEXT,
    "answer" TEXT,
    "databaseId" UUID REFERENCES "databaseTemplates"("id"),
    "startingText" TEXT,
    "response" TEXT,
    "respondAfter" INTEGER,
    "autoResponse" BOOLEAN DEFAULT false
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "labsQuestions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "labId" UUID REFERENCES "labs"("id"),
    "questionId" UUID REFERENCES "questions"("id")
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "feedbacks" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "feedback" TEXT,
    "dateTime" TIMESTAMP NOT NULL
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "usersFeedbacks" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "users"("id"),
    "feedbackId" UUID REFERENCES "feedbacks"("id")
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "bugReports" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "bugReport" TEXT,
    "dateTime" TIMESTAMP NOT NULL
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "usersBugReports" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "users"("id"),
    "bugReportId" UUID REFERENCES "bugReports"("id")
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "usersLabsQuestions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "users"("id"),
    "labQuestionId" UUID REFERENCES "labsQuestions"("id")
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "answers" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "usersLabsQuestionsId" UUID REFERENCES "usersLabsQuestions"("id"),
    "history" JSONB DEFAULT '[]',
    "activity" JSONB DEFAULT '[]',
    "completed" BOOLEAN DEFAULT false
  )`)
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  //////////////////////////////////
  await conn.any(`TRUNCATE TABLE "users" CASCADE`)
  await conn.any(`TRUNCATE TABLE "labsQuestions" CASCADE`)
  await conn.any(`TRUNCATE TABLE "questions" CASCADE`)
  await conn.any(`TRUNCATE TABLE "labs" CASCADE`)
  await conn.any(`TRUNCATE TABLE "databaseTemplates" CASCADE`)
  await conn.any(`TRUNCATE TABLE "usersFeedbacks" CASCADE`)
  await conn.any(`TRUNCATE TABLE "feedbacks" CASCADE`)
  await conn.any(`TRUNCATE TABLE "usersBugReports" CASCADE`)
  await conn.any(`TRUNCATE TABLE "bugReports" CASCADE`)
  await conn.any(`TRUNCATE TABLE "usersLabsQuestions" CASCADE`)
  await conn.any(`TRUNCATE TABLE "answers" CASCADE`)

  await conn.any(`
    INSERT INTO "users" ("username", "password", "admin")
    VALUES ('admin', crypt('pass123', gen_salt('bf')), true)
  `)

  await conn.any(`
    INSERT INTO "users" ("username", "password", "admin")
    VALUES ('asd', crypt('pass123', gen_salt('bf')), false)
  `)

  const databaseIds = await conn.any(`
    INSERT INTO "databaseTemplates" ("data")
    VALUES (${pgp.as.json([{ name: "testDb", columns: [], data: [] }])})
    RETURNING "id"
  `)

  const labsIds = await conn.any(`
    INSERT INTO "labs" ("labNumber", "dateTime")
    VALUES (3, now())
    RETURNING "id"
  `)

  const questionValues = questions
    .map(question => {
      return `('${question.question}', '${question.answer}', '${
        databaseIds[0].id
      }', '${question.startingText}', '${question.response}', '${
        question.respondAfter
      }', '${question.autoResponse}')`
    })
    .join()

  const questionsIds = await conn.any(`
    INSERT INTO "questions" ("question", "answer" , "databaseId", "startingText", "response", "respondAfter", "autoResponse")
    VALUES ${questionValues}
    RETURNING "id"
  `)

  const labsQuestionsValues = questionsIds
    .map(values => {
      return `('${labsIds[0].id}', '${values.id}')`
    })
    .join()
  await conn.any(`
  INSERT INTO "labsQuestions" ("labId", "questionId")
  VALUES ${labsQuestionsValues}
`)

  const feedbackIds = await conn.any(`
    INSERT INTO "feedbacks" ("feedback", "dateTime")
    VALUES ('This is the feedback', now())
    RETURNING "id"
  `)

  const getFeedbackUserIds = await conn.any(
    `SELECT id from "users" WHERE "username" = 'asd'`
  )
  const getFeedbackFeedbackIds = await conn.any(
    `SELECT id from "feedbacks" WHERE "feedback" = 'This is the feedback'`
  )

  const usersFeedbacksValues = await conn.any(`
    INSERT INTO "usersFeedbacks" ("userId", "feedbackId")
    VALUES ('${getFeedbackUserIds[0].id}', '${getFeedbackFeedbackIds[0].id}')
`)

  const bugReportIds = await conn.any(`
    INSERT INTO "bugReports" ("bugReport", "dateTime")
    VALUES ('This is the bug report', now())
    RETURNING "id"
  `)

  const getBugReportUserIds = await conn.any(
    `SELECT id FROM "users" WHERE "username" = 'asd'`
  )
  const getBugReportBugReportIds = await conn.any(
    `SELECT id FROM "bugReports" WHERE "bugReport" = 'This is the bug report'`
  )

  const usersBugReportsValues = await conn.any(`
    INSERT INTO "usersBugReports" ("userId", "bugReportId")
    VALUES ('${getBugReportUserIds[0].id}', '${getBugReportBugReportIds[0].id}')
`)

  const getUsersIds = await conn.any(`SELECT "id" FROM "users"`)

  const getLabsQuestionsIds = await conn.any(`SELECT id FROM "labsQuestions"`)

  const temp1 = getLabsQuestionsIds
    .map((value, x) => {
      return `('${getUsersIds[0].id}', '${value.id}')`
    })
    .join()
  const temp2 = getLabsQuestionsIds
    .map((value, x) => {
      return `('${getUsersIds[1].id}', '${value.id}')`
    })
    .join()
  const usersLabsQuestionsValues = temp1 + "," + temp2
  await conn.any(`
    INSERT INTO "usersLabsQuestions" ("userId", "labQuestionId")
    VALUES ${usersLabsQuestionsValues}
  `)

  const getUsersLabsQuestionsIds = await conn.any(
    `SELECT id FROM "usersLabsQuestions"`
  )

  const addULQIds = getUsersLabsQuestionsIds
    .map(values => {
      return `('${values.id}')`
    })
    .join()
  await conn.any(`
      INSERT INTO "answers" ("usersLabsQuestionsId")
      VALUES ${addULQIds}
    `)
}

run()
