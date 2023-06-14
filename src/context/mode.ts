import { createContext, useContext } from "react"
export {}
export type GlobalContent = {
  mode: string
  setMode:(c: string) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
  mode: 'start', // set a default value
  setMode: () => {},
})