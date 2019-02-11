import chalk from "chalk"
import pgPromise from "pg-promise"

export const db = {
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  ssl: process.env.DB_SSL === "true",
}

export const secretKey =
  process.env.SECRET_KEY ||
  (() => {
    throw "no secret set"
  })()

export const pgp = pgPromise({
  query(e) {
    let str = e.query
    str = str.replace(/crypt\('.*', "password"\)/, "[PASSWORD]")
    console.log(chalk.green(str))
  },
})
