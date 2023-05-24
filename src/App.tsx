import styles from './App.module.scss';
import { Graph_vis } from './components/graph-vis/graph-vis';
import { VisNetwork } from './components/vis-network/vis-network';

function App() {
    return (
        <div className={styles.App}>
            <header className={styles['App-header']}>
                <VisNetwork />
                <p>
                    <Graph_vis />
                    Edit <code></code> and save to reload.
                </p>
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
