// import { DataSet } from 'vis-data';
import styles from './tree.module.scss';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { useEffect, useRef } from 'react';
import { dataContext } from '../../context/data-context';
import { useContext } from 'react';
export interface TreeProps {
    className?: string;
    nodes: React.MutableRefObject<DataSet<any, 'id'>>;
    edges: React.MutableRefObject<DataSet<any, 'id'>>;
}
let options = {
    autoResize: true,
    layout: {
        randomSeed: 10,
        improvedLayout: false,
        clusterThreshold: 10,
        hierarchical: {
            enabled: true,
            levelSeparation: 100,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: false,
            edgeMinimization: false,
            parentCentralization: true,
            direction: 'UD',
            sortMethod: 'directed',
            shakeTowards: 'roots',
        },
    },
    edges: {
        arrows: {
            to: {
                enabled: true,
                type: 'arrow',
            },
        },
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        hover: true,
        hoverConnectedEdges: true,
        keyboard: {
            enabled: false,
            speed: { x: 10, y: 10, zoom: 0.2 },
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: false,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        tooltipDelay: 300,
        zoomSpeed: 1,
        zoomView: true,
    },
    physics: false,
};
/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Tree = ({ className, nodes, edges }: TreeProps) => {
    const { finished } = useContext(dataContext);
    let tree_network = useRef<Network | null>(null);
    const visJsRef = useRef<HTMLDivElement>(null);
    const func = () => {
        tree_network.current =
            visJsRef.current &&
            new Network(visJsRef.current, { nodes: nodes.current, edges: edges.current }, options);
        tree_network.current?.fit({ animation: true, minZoomLevel: 0.7, maxZoomLevel: 1 });
    };
    useEffect(func, [visJsRef]);
    useEffect(() => {
        if (finished) {
            tree_network.current?.storePositions();
            console.log('used');
        }
    }, [finished]);
    return (
        <div
            ref={visJsRef}
            className="rounded-md overflow-hidden h-full z-3 w-[48%] bg-cyan-800 mx-auto"
        ></div>
    );
};
