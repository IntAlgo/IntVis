import styles from './App.module.scss';
import { VisNetwork } from './components/vis-network/vis-network';
import { NavBar } from './components/nav-bar/nav-bar';
import { dataContext } from './context/data-context';
import { useState } from 'react';

function App() {
    const [mode, setMode] = useState('start');
    const [finished, setFinished] = useState(true);
    return (
        <div className={styles.App}>
            <dataContext.Provider
                value={{
                    mode,
                    setMode,
                    finished,
                    setFinished
                }}
            >
                <NavBar />
                <VisNetwork />
            </dataContext.Provider>
        </div>
    );
}

export default App;
