import styles from './nav-bar.module.scss';
import classNames from 'classnames';
import { dataContext } from '../../context/data-context';
import { useContext } from 'react';
export interface NavBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NavBar = ({ className }: NavBarProps) => {
    const {mode,setMode}=useContext(dataContext);
    return (
        <div className={classNames(styles.root, className)}>
            <nav>
                <button onClick={()=>{setMode("start")}} className={styles["navbar-item"]}>Start </button> | <button onClick={()=>{setMode("add")}} className={styles["navbar-item"]}>add</button> |{' '}
                <button onClick={()=>setMode("edge")} className={styles["navbar-item"]} >edge//still in progress</button> | <button className={styles["navbar-item"]}>Contact Us</button>
            </nav>
            <h3>Click to Add Node</h3>
            <h5>{mode}</h5>
        </div>
    );
};
