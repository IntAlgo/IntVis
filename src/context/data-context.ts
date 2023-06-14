import { createContext} from "react";
export interface mode_context{
    mode:string,
    setMode:React.Dispatch<React.SetStateAction<string>>
}
const t:mode_context = {mode:"start",setMode:()=>{}}
export const dataContext = createContext(t);