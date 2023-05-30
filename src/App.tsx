import styles from './App.module.scss';
import { VisNetwork } from './components/vis-network/vis-network';
import { NavBar } from './components/nav-bar/nav-bar';

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <VisNetwork />
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
