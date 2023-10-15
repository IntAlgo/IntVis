import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
// import { DFSgraph } from '../../algorithms/DfsGraph';
import { BinaryTreePreorderTraversal } from '../../algorithms/treeAlgorithms/preorderTraversal';
import { BinaryTreeInorderTraversal } from '../../algorithms/treeAlgorithms/inorderTraversal';
import { BinaryTreePostorderTraversal } from '../../algorithms/treeAlgorithms/postorderTraversal';
import { dataContext } from '../../context/data-context';
// import { dfEdge, dfNode, binTreeEdge, ChildDirection } from '../../types/type';
import { dfNode, binTreeEdge } from '../../types/type';
import { ChildDirection } from '../../types/enums';
import TraversalArray from '../../utils/TraversalArray';

export interface VisNetworkProps {
    className?: string;
}
export const Binary_tree = ({ className }: VisNetworkProps) => {
    const { mode, setFinished } = useContext(dataContext);
    const [traversalArray, setTraversalArray]: [any, any] = useState(null);
    const [traversalMode, setTraversalMode] = useState(false);
    const nextButtonRef = useRef<HTMLButtonElement>(null);

    let arr_node: dfNode[] = [
        { id: 0, label: '0', is_vis: false, color: 'white', title: '-1' },
        { id: 1, label: '1', is_vis: false, color: 'white', title: '-1' },
        { id: 2, label: '2', is_vis: false, color: 'white', title: '-1' },
        { id: 3, label: '3', is_vis: false, color: 'white', title: '-1' },
        { id: 4, label: '4', is_vis: false, color: 'white', title: '-1' },
        { id: 5, label: '5', is_vis: false, color: 'white', title: '-1' },
        { id: 6, label: '6', is_vis: false, color: 'white', title: '-1' },
        { id: 7, label: '7', is_vis: false, color: 'white', title: '-1' },
        { id: 8, label: '8', is_vis: false, color: 'white', title: '-1' },
        { id: 9, label: '9', is_vis: false, color: 'white', title: '-1' },
    ];

    let arr_edge: binTreeEdge[] = [
        {
            id: 'a',
            from: 0,
            to: 1,
            color: 'white',
            in_tree: false,
            parent: 0,
            childpoint: ChildDirection.LEFT,
        },
        {
            id: 'c',
            from: 0,
            to: 2,
            color: 'white',
            in_tree: false,
            parent: 0,
            childpoint: ChildDirection.RIGHT,
        },
        {
            id: 'd',
            from: 1,
            to: 3,
            color: 'white',
            in_tree: false,
            parent: 1,
            childpoint: ChildDirection.LEFT,
        },
        {
            id: 'b',
            from: 1,
            to: 4,
            color: 'white',
            in_tree: false,
            parent: 1,
            childpoint: ChildDirection.RIGHT,
        },
        {
            id: 'e',
            from: 3,
            to: 7,
            color: 'white',
            in_tree: false,
            parent: 3,
            childpoint: ChildDirection.LEFT,
        },
        {
            id: 'f',
            from: 3,
            to: 8,
            color: 'white',
            in_tree: false,
            parent: 3,
            childpoint: ChildDirection.RIGHT,
        },
        {
            id: 'g',
            from: 2,
            to: 5,
            color: 'white',
            in_tree: false,
            parent: 2,
            childpoint: ChildDirection.LEFT,
        },
        {
            id: 'h',
            from: 2,
            to: 6,
            color: 'white',
            in_tree: false,
            parent: 2,
            childpoint: ChildDirection.RIGHT,
        },
        {
            id: 'i',
            from: 6,
            to: 9,
            color: 'white',
            in_tree: false,
            parent: 6,
            childpoint: ChildDirection.LEFT,
        },
    ];
    let nodes: React.MutableRefObject<DataSet<dfNode, 'id'>> = useRef(new DataSet(arr_node));
    let edges = useRef(new DataSet(arr_edge));
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

    // let i = useRef(10);
    let network = useRef<Network | null>(null);
    const visJsRef = useRef<HTMLDivElement>(null);
    const func = () => {
        network.current =
            visJsRef.current &&
            new Network(visJsRef.current, { nodes: nodes.current, edges: edges.current }, options);
        if (network) {
            network.current?.fit({ animation: true, minZoomLevel: 0.7, maxZoomLevel: 1.2 });
        }
    };

    let resetGraph = async () => {
        nodes.current.forEach((_, id) => {
            nodes.current.update({ id: id, color: 'white', is_vis: false, title: '-1' });
        });
        setTraversalArray(nodes.current.get());
        edges.current.forEach((_, id: any) => {
            edges.current.update({ id: id, color: 'white' });
        });
        setTraversalMode(false);
        return;
    };

    //traversal
    const traversal = ({ e, mode }: { e: any; mode: String }) => {
        console.log(e);
        setFinished(false);
        let counter = 0;
        let flag = false;
        let Df: any = null;
        if (mode === 'inorder') {
            Df = new BinaryTreeInorderTraversal(edges.current.get(), nodes.current.get(), 0);
        } else if (mode === 'preorder') {
            Df = new BinaryTreePreorderTraversal(edges.current.get(), nodes.current.get(), 0);
        } else if (mode === 'postorder') {
            Df = new BinaryTreePostorderTraversal(edges.current.get(), nodes.current.get(), 0);
        }

        let inter = setInterval(
            () => {
                console.log(counter);
                flag = false;
                if (Df.complete()) {
                    console.log('complete');
                    clearInterval(inter);
                    setFinished(true);
                    return;
                }
                let x = Df.next();
                if (Df.currnode !== null) {
                    let curr = Df.currnode;
                }

                Df.currnode = x;

                if (x?.node === null) {
                    nodes.current.update({ id: x?.node, color: 'orange', title: '0' });
                    setTraversalArray(nodes.current.get());
                } else {
                    // edges.current.update({ id: x?.edgeId, color: 'orange', in_tree: true });
                    // edges.current.update({ id: x?.edgeId, color: 'orange', in_tree: true });
                    // let t: any = edges.current.get(x?.edgeId);
                    nodes.current.update({
                        id: x?.node,
                        color: 'orange',
                        title: `${counter}`,
                    });
                    console.log(nodes.current.get());
                    setTraversalArray(nodes.current.get());
                }
                counter++;
            },
            flag ? 3000 : 1000
        );
    };

    class traversalm {
        constructor({ e, mode }: { e: any; mode: String }) {
            this.e = e;
            this.mode = mode;
            this.counter = 0;
            this.flag = false;
            this.Df =
                mode === 'preorder'
                    ? new BinaryTreePreorderTraversal(edges.current.get(), nodes.current.get(), 0)
                    : mode === 'inorder'
                    ? new BinaryTreeInorderTraversal(edges.current.get(), nodes.current.get(), 0)
                    : new BinaryTreePostorderTraversal(edges.current.get(), nodes.current.get(), 0);
        }
        e: any;
        mode: String;
        counter: number;
        flag: Boolean;
        Df: any;

        next() {
            console.log(this.counter);
            this.flag = false;
            if (this.Df.complete()) {
                console.log('complete');
                setFinished(true);
                setTraversalMode(false);
                return;
            }
            let x = this.Df.next();
            if (this.Df.currnode !== null) {
                let curr = this.Df.currnode;
            }

            this.Df.currnode = x;

            if (x?.node === null) {
                nodes.current.update({ id: x?.node, color: 'orange', title: '0' });
                setTraversalArray(nodes.current.get());
            } else {
                nodes.current.update({
                    id: x?.node,
                    color: 'orange',
                    title: `${this.counter}`,
                });
                console.log(nodes.current.get());
                setTraversalArray(nodes.current.get());
            }
            this.counter = this.counter + 1;
            return;
        }
    }

    let funce = async () => {
        network.current?.disableEditMode();
        network.current?.off('click');
        network.current?.off('selectNode');
        network.current?.unselectAll();
        if (mode === 'preorder') {
            await resetGraph();
            setTraversalMode(true);
            network.current?.setOptions({ physics: { enabled: true } });
            let t = new traversalm({ e: network.current, mode: 'preorder' });
            nextButtonRef.current?.addEventListener('click', () => {
                t.next();
            });
        }
        if (mode === 'inorder') {
            await resetGraph();
            setTraversalMode(true);
            network.current?.setOptions({ physics: { enabled: true } });
            let t = new traversalm({ e: network.current, mode: 'inorder' });
            nextButtonRef.current?.addEventListener('click', () => {
                t.next();
            });
        }
        if (mode === 'postorder') {
            await resetGraph();
            setTraversalMode(true);
            network.current?.setOptions({ physics: { enabled: true } });
            let t = new traversalm({ e: network.current, mode: 'postorder' });
            nextButtonRef.current?.addEventListener('click', () => {
                t.next();
            });
        }
        if (mode === 'reset') resetGraph();
    };
    useEffect(func, [visJsRef]);
    useEffect(() => {
        funce();
    }, [visJsRef, mode]);
    useEffect(() => {
        console.log(nodes, edges);
    }, [nodes, edges]);
    return (
        <div className="w-full h-full">
            <div className="h-full mx-1 my-3 flex justify-between">
                <div>
                    <TraversalArray traversalArray={traversalArray} />
                    <button className="p-2 rounded-md border-black border-2" ref={nextButtonRef}>
                        Next
                    </button>
                </div>
                <div
                    ref={visJsRef}
                    className="rounded-md overflow-hidden h-full z-3 w-[98%] bg-cyan-800 mx-auto"
                />
            </div>
        </div>
    );
};
