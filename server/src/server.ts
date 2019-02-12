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

// default response is 404
app.use((req, res, next) => next(404))

// handle errors by returning them as json
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  if (err instanceof Error) {
    return { error: err.message }
  } else {
    return { error: err }
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`the server is listening at http://localhost:${port}`)
})

// const errors =  {
//   pageNotFound: '404 not found',
//   recordNotFound: 'couldnt find a record'
// }
