import express from "express"
import { IUser, IApiEndpointOptions, IApiEndpointCallbackData } from "./types"
import * as jwt from "jsonwebtoken"
import { IDatabase } from "pg-promise"
import { pgp } from "./config"

export function createAddApiEndpoint(
  app: express.Application,
  conn: IDatabase<{}>
) {
  return addApiEndpoint

  function addApiEndpoint<
    T extends "none" | "authenticated" | "admin" = "none"
  >(
    path: string,
    options: { permission?: T },
    callback: (data: {
      currentUser: T extends "authenticated" | "admin" ? IUser : (null | IUser)
      req: express.Request
      res: express.Response
      next: express.NextFunction
    }) => any
  ): any
  function addApiEndpoint(
    path: string,
    options: IApiEndpointOptions = { permission: "none" },
    callback: (data: IApiEndpointCallbackData) => void
  ) {
    app.post(`/api/${path}`, async (req, res, next) => {
      const currentUser = await getCurrentUser(req)

      const { permission = "none" } = options

      if (permission !== "none" && !currentUser) {
        next("not logged in")
        return
      }

      if (permission === "admin" && currentUser!.admin === false) {
        next("not authenticated")
        return
      }

      const responseData = await callback({ currentUser, req, res, next })
      res.send(responseData)
    })
  }

  async function getCurrentUser(req: express.Request) {
    const authToken = req.get("Authorization")
    if (!authToken) {
      return null
    } else {
      const payload = jwt.decode(authToken, { json: true })
      if (!payload || typeof payload === "string") {
        throw new Error("invalid authentication token")
      } else {
        const { id } = payload
        const result = await conn.one<IUser>(
          `SELECT * FROM "users" WHERE "id"='${pgp.as.value(id)}'`
        )
        return result
      }
    }
  }
}
