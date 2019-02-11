require("dotenv").config()

import pgPromise from "pg-promise"
import { db } from "../src/config"
const pgp = pgPromise()
const conn = pgp(db)

async function run() {
  await conn.any(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)

  await conn.any(`CREATE TABLE IF NOT EXISTS "users" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE,
    password TEXT NOT NULL,
    admin BOOLEAN DEFAULT 'false'
  )`)

  await conn.any(`TRUNCATE TABLE "users"`)

  await conn.any(`
    INSERT INTO "users" ("username", "password", "admin")
    VALUES ('admin', crypt('pass123', gen_salt('bf')), true)
  `)
}

run()
