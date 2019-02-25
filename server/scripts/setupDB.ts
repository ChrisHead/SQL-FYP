if (process.env.NODE_ENV !== "production") require("dotenv").config()

import pgPromise from "pg-promise"
import { db } from "../src/config"
import { labs } from "./seedQuestions"
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
    "modelAnswer" TEXT,
    "databaseId" UUID REFERENCES "databaseTemplates"("id"),
    "startingText" TEXT
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "answers" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID REFERENCES "users"("id"),
    "questionId" UUID REFERENCES "questions"("id"),
    "history" JSONB DEFAULT '[]',
    "completed" BOOLEAN DEFAULT false,
    CONSTRAINT user_question_uniq UNIQUE ("userId", "questionId")
    )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "labsQuestions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "labId" UUID REFERENCES "labs"("id"),
    "questionId" UUID REFERENCES "questions"("id")
  )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "feedbacks" (
                  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                  "feedback" TEXT,
                  "userId" UUID REFERENCES "users"("id"),
                  "dateTime" TIMESTAMP NOT NULL
                )`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "bugReports" (
                  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                  "bugReport" TEXT,
                  "userId" UUID REFERENCES "users"("id"),
                  "dateTime" TIMESTAMP NOT NULL
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

  await conn.any(`
    INSERT INTO "users" ("username", "password", "admin")
    VALUES
      ('admin', crypt('pass123', gen_salt('bf')), true),
      ('asd', crypt('pass123', gen_salt('bf')), false)
  `)

  const databases = await conn.any(`
    INSERT INTO "databaseTemplates" ("data")
    VALUES (${pgp.as.json([{ name: "testDb", columns: [], data: [] }])})
    RETURNING "id"
  `)

  for (const lab of labs) {
    const labRecord = await conn.one(`
        INSERT INTO "labs" ("labNumber", "dateTime")
        VALUES ('${lab.labNumber}', '${lab.dataTime}')
        RETURNING "id"
      `)

    for (const questionData of lab.questions) {
      const { question, modelAnswer, startingText } = questionData

      const values = [question, modelAnswer, databases[0].id, startingText]
        .map(v => `'${pgp.as.value(v)}'`)
        .join()

      const questionRecord = await conn.one(`
        INSERT INTO "questions" ("question","modelAnswer","databaseId","startingText")
        VALUES (${values})
        RETURNING "id"
      `)

      await conn.any(`
        INSERT INTO "labsQuestions" ("labId", "questionId")
        VALUES ('${labRecord.id}', '${questionRecord.id}')
      `)
    }
  }

  await conn.any(`
    INSERT INTO "feedbacks" ("feedback", "dateTime", "userId")
    VALUES ('This is the feedback', now(), (SELECT id from "users" WHERE "username" = 'asd'))
  `)

  await conn.any(`
    INSERT INTO "bugReports" ("bugReport", "dateTime", "userId")
    VALUES ('This is the bug report', now(), (SELECT id FROM "users" WHERE "username" = 'asd'))
  `)
}

run()
