import { VisNetwork } from './components/vis-network/vis-network';
import { NavBar } from './components/nav-bar/nav-bar';
import { dataContext } from './context/data-context';
import { useState } from 'react';

function App() {
    const [mode, setMode] = useState('start');
    const [finished, setFinished] = useState(true);
    return (
        <div className="text-center bg-gradient-to-b from-slate-300 to-white h-full">
            <dataContext.Provider
                value={{
                    mode,
                    setMode,
                    finished,
                    setFinished,
                }}
            >
                <NavBar />
                <div className="h-[90vh] w-full"><VisNetwork /></div>
            </dataContext.Provider>
        </div>
    );
}

export default App;
