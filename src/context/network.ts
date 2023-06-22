import { createContext} from "react";
import { Network } from 'vis-network/standalone/esm/vis-network';
export interface network_c{
    network:Network|null,
    setNetwork:React.Dispatch<React.SetStateAction<string>>
}
const t:network_c = {network: null,setNetwork:()=>{}}
export const Network_data = createContext(t);