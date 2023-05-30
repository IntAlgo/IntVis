import styles from './App.module.scss';
import { VisNetwork } from './components/vis-network/vis-network';

function App() {
    return (
        <div className={styles.App}>
            <header className={styles['App-header']}>
                <VisNetwork />
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
