import React from "react"
import { DbStore } from "./stores/DbStore"
export const DbContext = React.createContext<DbStore>({} as any)
