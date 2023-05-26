import styles from './vis-network.module.scss';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { DFSgraph } from '../../algorithms/DfsGraph';
export interface VisNetworkProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const VisNetwork = ({ className }: VisNetworkProps) => {
     let arr_node=[
        { id: 0, label: "0",is_vis:false,color:"white"},
        { id: 1, label: "1",is_vis:false,color:"white"},
        { id: 2, label: "2",is_vis:false,color:"white"},
        { id: 3, label: "3",is_vis:false,color:"white"},
        { id: 4, label: "4",is_vis:false,color:"white" },
        { id: 5, label: "5",is_vis:false,color:"white" },
        { id: 6, label: "6",is_vis:false,color:"white" },
        { id: 7, label: "7",is_vis:false,color:"white" },
        { id: 8, label: "8",is_vis:false,color:"white" },
        { id: 9, label: "9",is_vis:false,color:"white" },
      ];

   let arr_edge=[
        { id:'a',from: 0, to: 2 },
        { id:'b',from: 0, to: 1 },
        { id:'c',from: 1, to: 3 },
        { id:'d',from: 1, to: 4 },
        { id:'e',from: 1, to: 5 },
        { id:'f',from: 2, to: 6 },
        { id:'g',from: 2, to: 7 },
        { id:'h',from: 7, to: 0 },
        { id:'i',from: 7, to: 9 },
        { id:'j',from: 4, to: 8 },
      ]
    let nodes = new DataSet(arr_node);
    let edges = new DataSet(arr_edge);
    let options = {
        layout: {
            randomSeed: undefined,
            improvedLayout: true,
            clusterThreshold: 150,
            hierarchical: {
                enabled: false,
                levelSeparation: 1050,
                nodeSpacing: 1000,
                treeSpacing: 200,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: 'UD', // UD, DU, LR, RL
                sortMethod: 'directed', // hubsize, directed
                shakeTowards: 'leaves', // roots, leaves
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
                speed: { x: 10, y: 10, zoom: 0.02 },
                bindToWindow: true,
                autoFocus: true,
            },
            multiselect: false,
            navigationButtons: false,
            selectable: true,
            selectConnectedEdges: true,
            tooltipDelay: 300,
            zoomSpeed: 1,
            zoomView: false,
        },
    };
    const visJsRef = useRef<HTMLDivElement>(null);
    const func = () => {
        const Df=new DFSgraph( arr_edge,arr_node, 0);
        const network =
            visJsRef.current && new Network(visJsRef.current, { nodes, edges }, options);
        let j=1;
        while(!Df.complete()){
            let x=Df.next();
            setTimeout(()=>nodes.update({id:x,color:"orange"}),1000*j)
            j++;
        }
    };
    useEffect(func, [visJsRef]);

    return <div ref={visJsRef} />;
};

