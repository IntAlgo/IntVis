import styles from './nav-bar.module.scss';
import classNames from 'classnames';
import { dataContext } from '../../context/data-context';
import { useContext } from 'react';
import { finished } from 'stream';
export interface NavBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NavBar = ({ className }: NavBarProps) => {
    const {mode,setMode,finished}=useContext(dataContext);
    return (
        <div className={classNames(styles.root, className)}>
            <div>
                <button id="add" onClick={()=>{setMode("add")}} className={styles["navbar-item"]}>add node</button> |
                <button id="edge" onClick={()=>setMode("edge")} className={styles["navbar-item"]} >edge</button> | 
                <button className={styles["navbar-item"]}>Contact Us</button> |  
                <button disabled={!finished} onClick={()=>{setMode("DFS")}} className={styles["navbar-item"]}>Visualize DFS</button>|  
                <button disabled={!finished} onClick={()=>{setMode("BFS")}} className={styles["navbar-item"]}>Visualize BFS</button>|  
                <button disabled={!finished} onClick={()=>{setMode("reset")}} className={styles["navbar-item"]}>Reset</button>
            </div>
            <h3>Welcome to INTALGO</h3>
            <h5>{mode==="DFS" || mode==="BFS" ? `Click on starting node for implementing ${mode}` : `${mode}`} </h5>
        </div>
    );
};
