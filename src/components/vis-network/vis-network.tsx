import assert from "assert";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { DFSgraph } from '../../algorithms/DfsGraph';
import { dataContext } from '../../context/data-context';
import { BFSgraph } from '../../algorithms/Bfsgraph';
import { Node, Edge } from 'vis-network/standalone/esm/vis-network';
import Graph_data from "./Graph.json";
// import  options from "./options.json"
import { Tree } from '../tree/tree';
import { dfEdge, dfNode } from '../../types/type';
import TraversalArray from '../../utils/TraversalArray';
export interface VisNetworkProps {
    className?: string;
}
export const VisNetwork = ({ className }: VisNetworkProps) => {
    const { mode, setFinished } = useContext(dataContext);
    const [traversalArray, setTraversalArray]: [any, any] = useState(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    let arr_node:dfNode[]=Graph_data.arr_node;
    let arr_edge:dfEdge[]=Graph_data.arr_edge;
    let nodes: React.MutableRefObject<DataSet<dfNode, 'id'>> = useRef(new DataSet(arr_node));
    let edges = useRef(new DataSet(arr_edge));
    let treeNodes: React.MutableRefObject<DataSet<dfNode, 'id'>> = useRef(new DataSet());
    let treeEdges: React.MutableRefObject<DataSet<Edge, 'id'>> = useRef(new DataSet());
    // options.manipulation.addEdge= (data: any, callback: any) => {
    //     callback({ ...data, color: "white"
    //     });
    //     network.current?.addEdgeMode();
    // },
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
            tooltipDelay: 50,
            zoomSpeed: 1,
            zoomView: true,
        },
        physics: {
            enabled: true,
            solver: 'forceAtlas2Based',
            forceAtlas2Based: {
                springLength: 20,
                springConstant: 0.2,
                damping: 0.8,
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
            nodes.current.update({ id: id, color: 'white', is_vis: false, title: '-1' });
        });
        setTraversalArray(nodes.current.get());
        edges.current.forEach((_, id: any) => {
            edges.current.update({ id: id, color: 'white' });
        });
        treeNodes.current.clear();
        treeEdges.current.clear();
    };

    class DFSm {
        constructor({ e, mode, startNode }: { e: any; mode: String; startNode: number }) {
            this.e = e;
            this.mode = mode;
            this.counter = 0;
            this.flag = false;
            this.Df =
                mode === 'BFS'
                    ? new BFSgraph(edges.current.get(), nodes.current.get(), startNode)
                    : new DFSgraph(edges.current.get(), nodes.current.get(), startNode);
            setFinished(false);
        }
        e: any;
        mode: String;
        counter: number;
        flag: Boolean;
        Df: any;
        next() {
            this.flag = false;
            if (this.Df.complete()) {
                setFinished(true);
                treeNodes.current.update(
                    treeNodes.current.map((e) => {
                        return { ...e, fixed: true };
                    })
                );
                edges.current.forEach(
                    (e) => {
                        treeEdges.current.add(e);
                    },
                    {
                        filter: (e) => {
                            return !e.in_tree;
                        },
                    }
                );
                return;
            }
            let x = this.Df.next();
            if (this.Df.currnode !== null) {
                let curr = this.Df.currnode;
                treeNodes.current.updateOnly({ id: curr?.node, color: 'white' });
            }

            this.Df.currnode = x;

            if (x?.edgeId === null) {
                nodes.current.update({ id: x?.node, color: 'orange', title: '0' });
                setTraversalArray(nodes.current.get());
                treeNodes.current.update({
                    id: x?.node,
                    color: 'blue',
                    label: `${x?.node}`,
                    level: 0,
                });
                this.counter++;
                return;
            } else {
                if (this.Df.currnode.node !== x.parent) {
                    let f = treeNodes.current.get(x.parent);
                    this.flag = true;
                    treeNodes.current.update({ id: x.parent, color: 'blue' });
                    setTimeout(() => {
                        edges.current.update({ id: x?.edgeId, color: 'orange', in_tree: true });
                        let t: any = edges.current.get(x?.edgeId);
                        let t2: any = treeNodes.current.get(t.from);
                        let lev = t2 ? t2.level : 0;
                        nodes.current.update({
                            id: x?.node,
                            color: 'orange',
                            title: `${this.counter}`,
                        });
                        setTraversalArray(nodes.current.get());
                        this.counter++;
                        treeNodes.current.update({ id: x.parent, color: 'white' });
                        treeNodes.current.update({
                            id: x?.node,
                            color: 'blue',
                            label: `${x?.node}`,
                            level: lev + 1,
                        });
                        treeEdges.current.update(t);
                    }, 500);
                } else {
                    edges.current.update({ id: x?.edgeId, color: 'orange', in_tree: true });
                    let t: any = edges.current.get(x?.edgeId);
                    let t2: any = treeNodes.current.get(t.from);
                    let lev = t2 ? t2.level : 0;
                    nodes.current.update({
                        id: x?.node,
                        color: 'orange',
                        title: `${this.counter}`,
                    });
                    setTraversalArray(nodes.current.get());
                    this.counter++;
                    treeNodes.current.update({
                        id: x?.node,
                        color: 'blue',
                        label: `${x?.node}`,
                        level: lev + 1,
                    });
                    treeEdges.current.update(t);
                }
            }
        }
    }

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
            let prevNode = -1;
            let startNode = 0;
            let traversalInit: DFSm | null = null;
            network.current?.on('selectNode', (e) => {
                prevNode = startNode;
                if (prevNode !== -1) {
                    nodes.current.updateOnly({ id: prevNode, color: 'white' });
                }
                startNode = e['nodes'][0];
                nodes.current.updateOnly({ id: startNode, color: 'blue' });
                traversalInit = new DFSm({
                    e: network.current,
                    mode: mode,
                    startNode: startNode,
                });
            });
            nextButtonRef.current?.addEventListener('click', () => {
                if (traversalInit === null) {
                    console.log('traversalInit is null');
                    return;
                }
                traversalInit.next();
            });
            network.current?.setOptions({ physics: { enabled: true } });
        }
        if (mode === 'BFS') {
            await resetGraph();
            let prevNode = -1;
            let startNode = 0;
            let traversalInit: DFSm | null = null;
            network.current?.on('selectNode', (e) => {
                prevNode = startNode;
                if (prevNode !== -1) {
                    nodes.current.updateOnly({ id: prevNode, color: 'white' });
                }
                startNode = e['nodes'][0];
                nodes.current.updateOnly({ id: startNode, color: 'blue' });
                traversalInit = new DFSm({
                    e: network.current,
                    mode: mode,
                    startNode: startNode,
                });
            });
            nextButtonRef.current?.addEventListener('click', () => {
                if (traversalInit === null) {
                    console.log('traversalInit is null');
                    return;
                }
                traversalInit.next();
            });
            network.current?.setOptions({ physics: { enabled: true } });
        }
        if (mode === 'reset') resetGraph();
    };
    useEffect(func, [visJsRef]);
    useEffect(() => {
        funce();
    }, [visJsRef, mode]);
    return (
        <div className="w-full h-full">
            <div className="h-full mx-1 my-3 flex justify-between">
                <div>
                    <button className="p-2 rounded-md border-black border-2" ref={nextButtonRef}>
                        next
                    </button>
                    <TraversalArray traversalArray={traversalArray} />
                </div>
                <div
                    ref={visJsRef}
                    className="rounded-md overflow-hidden h-full z-3 w-[48%] bg-cyan-800 mx-auto"
                />
                <Tree nodes={treeNodes} edges={treeEdges} />
            </div>
        </div>
    );
};
