import React from "react"
import { AppStore } from "./stores/AppStore"
export const AppContext = React.createContext<AppStore>({} as any)
