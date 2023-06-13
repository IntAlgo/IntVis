import styles from './App.module.scss';
import { VisNetwork } from './components/vis-network/vis-network';
import { NavBar } from './components/nav-bar/nav-bar';
import { dataContext } from "./Context/data-context";
import { useState } from 'react';

function App() {
    const [valuestobesent, setValuestobesent]=useState();
    return (
        <div className={styles.App} >
            <dataContext.Provider
            value={{
                valuestobesent, 
                setValuestobesent,
            }}
            >
            <NavBar />
            <VisNetwork />
            </dataContext.Provider>
            <header className={styles['App-header']}>
                <a
                    className={styles['App-link']}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                ></a>
            </header>
        </div>
    );
}

export default App;
