import express from "express"

export interface IUser {
  id: string
  username: string
  password: string
  admin: boolean
}

export interface IApiEndpointCallbackData {
  currentUser: IUser | null
  req: express.Request
  res: express.Response
  next: express.NextFunction
}

export interface IApiEndpointOptions {
  permission?: "none" | "authenticated" | "admin"
}
