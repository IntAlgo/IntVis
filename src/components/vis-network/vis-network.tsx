import styles from './vis-network.module.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { DFSgraph } from '../../algorithms/DfsGraph';
import { dataContext } from '../../context/data-context';
import { BFSgraph } from '../../algorithms/Bfsgraph';
import { Node, Edge } from 'vis-network/standalone/esm/vis-network';
import { Tree } from '../tree/tree';
import { randomInt } from 'crypto';
export interface VisNetworkProps {
    className?: string;
}
interface dfNode extends Node {
    is_vis: boolean;
}
interface dfEdge extends Edge {}
export const VisNetwork = ({ className }: VisNetworkProps) => {
    const { mode, setFinished } = useContext(dataContext);
    let arr_node: dfNode[] = [
        { id: 0, label: '0', is_vis: false, color: 'white' },
        { id: 1, label: '1', is_vis: false, color: 'white' },
        { id: 2, label: '2', is_vis: false, color: 'white' },
        { id: 3, label: '3', is_vis: false, color: 'white' },
        { id: 4, label: '4', is_vis: false, color: 'white' },
        { id: 5, label: '5', is_vis: false, color: 'white' },
        { id: 6, label: '6', is_vis: false, color: 'white' },
        { id: 7, label: '7', is_vis: false, color: 'white' },
        { id: 8, label: '8', is_vis: false, color: 'white' },
        { id: 9, label: '9', is_vis: false, color: 'white' },
    ];

    let arr_edge: dfEdge[] = [
        { id: 'a', from: 0, to: 2, color: 'white' },
        { id: 'b', from: 0, to: 1, color: 'white' },
        { id: 'c', from: 1, to: 3, color: 'white' },
        { id: 'd', from: 1, to: 4, color: 'white' },
        { id: 'e', from: 1, to: 5, color: 'white' },
        { id: 'f', from: 2, to: 6, color: 'white' },
        { id: 'g', from: 2, to: 7, color: 'white' },
        { id: 'h', from: 7, to: 0, color: 'white' },
        { id: 'i', from: 7, to: 9, color: 'white' },
        { id: 'j', from: 4, to: 8, color: 'white' },
    ];
    let nodes = useRef(new DataSet(arr_node));
    let edges = useRef(new DataSet(arr_edge));
    let treeNodes: React.MutableRefObject<DataSet<Node, 'id'>> = useRef(new DataSet());
    let treeEdges: React.MutableRefObject<DataSet<Edge, 'id'>> = useRef(new DataSet());
    let options = {
        autoResize: true,
        layout: {
            randomSeed: 10,
            improvedLayout: false,
            clusterThreshold: 10,
            hierarchical: {
                enabled: false,
                levelSeparation: 200,
                nodeSpacing: 100,
                treeSpacing: 200,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: 'UD',
                sortMethod: 'directed',
                shakeTowards: 'leaves',
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
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                springLength: 20,
                springConstant: 0.2,
                damping: 0.9,
                centralGravity: 0.01,
            },
        },
        manipulation: {
            enabled: false,
            initiallyActive: true,
            addNode: false,
            addEdge: (data: any, callback: any) => {
                callback({ ...data, color: 'white' });
                network.current?.addEdgeMode();
            },
            editEdge: true,
            deleteNode: true,
            deleteEdge: true,
            controlNodeStyle: {
                // all node options are valid.
            },
        },
    };
    let i = useRef(10);
    let network = useRef<Network | null>(null);
    const visJsRef = useRef<HTMLDivElement>(null);
    const func = () => {
        network.current =
            visJsRef.current &&
            new Network(visJsRef.current, { nodes: nodes.current, edges: edges.current }, options);
        if (network) {
            network.current?.fit({ animation: true, minZoomLevel: 0.1, maxZoomLevel: 0.25 });
        }
    };

    const addfn = (e: any) => {
        console.log(e);
        let se_node = {
            id: i.current,
            label: `${i.current}`,
            is_vis: false,
            color: 'white',
            x: e['pointer']['canvas'].x,
            y: e['pointer']['canvas'].y,
        };
        nodes.current.add(se_node);
        arr_node.push(se_node);
        i.current += 1;
    };
    let resetGraph = async () => {
        nodes.current.forEach((_, id) => {
            nodes.current.update({ id: id, color: 'white', is_vis: false });
        });
        edges.current.forEach((_, id: any) => {
            edges.current.update({ id: id, color: 'white' });
        });
        treeNodes.current.clear();
        treeEdges.current.clear();
    };

    // dfs algo
    const startDFS = (e: any) => {
        setFinished(false);
        const Df = new DFSgraph(
            JSON.parse(JSON.stringify(edges.current.get())),
            JSON.parse(JSON.stringify(nodes.current.get())),
            e['nodes'][0]
        );
        let inter = setInterval(() => {
            // console.log(nodes.current.get(), edges.current.get());
            let x = Df.next();
            // let nextNodeInfo: any = nodes.current.get(x?.node);
            // console.log(nextNodeInfo);
            // if (nextNodeInfo.color !== 'orange') {
            nodes.current.update({ id: x?.node, color: 'orange' });
            if (x?.edgeId === null) {
                treeNodes.current.update({ id: x?.node, label: `${x?.node}`, level: 0 });
                return;
            } else  {
                edges.current.update({ id: x?.edgeId, color: 'orange' });
                let t: any = edges.current.get(x?.edgeId);
                let t2: any = treeNodes.current.get(t.from);
                let lev = t2 ? t2.level : 0;

                treeNodes.current.update({ id: x?.node, label: `${x?.node}`, level: lev + 1 });
                treeEdges.current.update(t);
            }
            // }

            if (Df.complete()) {
                clearInterval(inter);
                // console.log(nodes.current.get(), edges.current.get());
                setFinished(true);
            }
        }, 500);
    };

    // bfs algo
    const startBFS = (e: any) => {
        setFinished(false);
        const Df = new BFSgraph(edges.current.get(), nodes.current.get(), e['nodes'][0]);
        let inter = setInterval(() => {
            let x = Df.next();
            // console.log(x);
            nodes.current.update({ id: x?.node, color: 'orange' });
            if (x?.edgeId === null) {
                treeNodes.current.update({ id: x?.node, label: `${x?.node}`, level: 0, size: 30 });
                return;
            } else {
                edges.current.update({ id: x?.edgeId, color: 'orange' });
                let t: any = edges.current.get(x?.edgeId);
                let t2: any = treeNodes.current.get(t.from);
                let lev = t2 ? t2.level : 0;
                treeNodes.current.update({ id: x?.node, label: `${x?.node}`, level: lev + 1 });
                treeEdges.current.update(t);
            }

            if (Df.complete()) {
                clearInterval(inter);
                setFinished(true);
            }
        }, 1000);
    };

    let funce = async () => {
        network.current?.disableEditMode();
        // network.current?.addE
        network.current?.off('click');
        network.current?.off('selectNode');
        network.current?.unselectAll();
        if (mode === 'add') {
            network.current?.on('click', addfn);
            network.current?.setOptions({ physics: { enabled: false } });
        }
        if (mode === 'edge') {
            network.current?.addEdgeMode();
            network.current?.setOptions({ physics: { enabled: false } });
        }
        if (mode === 'DFS') {
            await resetGraph();
            network.current?.on('selectNode', startDFS);
            network.current?.setOptions({ physics: { enabled: true } });
        }
        if (mode === 'BFS') {
            await resetGraph();
            network.current?.on('selectNode', startBFS);
            network.current?.setOptions({ physics: { enabled: true } });
        }
        if (mode === 'reset') resetGraph();
        // console.log(edges.current.get());
    };
    useEffect(func, [visJsRef]);
    useEffect(() => {
        funce();
    }, [visJsRef, mode]);
    return (
        <div className="w-full h-full">
            <div className="h-full my-1 flex justify-between">
                <div
                    ref={visJsRef}
                    className="rounded-md overflow-hidden h-full z-3 w-[48%] bg-cyan-800 mx-auto"
                ></div>
                <Tree nodes={treeNodes} edges={treeEdges} />
            </div>
        </div>
    );
};
