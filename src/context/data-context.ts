import { createContext } from 'react';
export interface mode_context {
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    finished: boolean;
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}
const t: mode_context = { mode: 'start', setMode: () => {}, finished: true, setFinished: () => {} };
export const dataContext = createContext(t);
