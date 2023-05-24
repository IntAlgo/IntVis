import styles from './graph-vis.module.scss';
import classNames from 'classnames';

export interface Graph_visProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Graph_vis = ({ className }: Graph_visProps) => {
    return <div className={classNames(styles.root, className)}>Graph_vis</div>;
};
