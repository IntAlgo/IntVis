import styles from './nav-bar.module.scss';
import classNames from 'classnames';

export interface NavBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NavBar = ({ className }: NavBarProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <nav>
                <a href="/home" className={styles["navbar-item"]}>Home </a> | <a href="/projects" className={styles["navbar-item"]}>Projects</a> |{' '}
                <a className={styles["navbar-item"]} href="/about">About</a> | <a href="/contact" className={styles["navbar-item"]}>Contact Us</a>
            </nav>
        </div>
    );
};
