export class DFSgraph {
    //constructor call from IntVis/src/components/visnetwork/VisNetwork.tsx

    /*
    Parameters:

        Adjacency List: (we will give nodes and edges as parameters and adjanceney list will be created in the constructor)\
            structure:
        startnode
        treeNodes
        treeEdges(both will be passed in as parameter and all the changes will be done regarding tree nodes and edges will be handles in DFSgraph.js)
        Default parameters:

stack: initially empty(values of stack will be pair of node and edge id)
    */

    constructor(edges, nodes, startnodeId, treeEdges, treeNodes) {
        this.adj = Array.from({ length: nodes.length }, () => []);
        this.edges = edges; // Store the edges
        this.edgeMap = new Map(); // Map to store edge ID based on from and to nodes

        for (let i = 0; i < edges.length; i++) {
            const { from, to } = edges[i];
            this.adj[from].push({ node: to, edgeId: edges[i].id }); // Store node and edgeId in adjacency list
            this.edgeMap.set(`${from}-${to}`, edges[i].id); // Store the edge ID in the map
        }

        this.currnode = null;
        this.prevnode = null;
        this.startNode = startnodeId;
        this.nodes = nodes;
        this.stack = [];
        this.stack.push({ node: this.startNode, edgeId: null, parent: null }); // Store the edgeId as well
    }
    next() {
        if (this.stack.length === 0) return null;

        let { node, edgeId, parent } = this.stack.pop();
        // Destructure the node and edgeId
        console.log(`node is ${node}`);
        console.log(this.nodes[node].is_vis);
        if (!this.nodes[node].is_vis) {
            this.nodes[node].is_vis = true;

            const nextNodes = this.adj[node]
                .filter(({ node: y }) => {
                    // console.log(this.nodes[y]);
                    return !this.nodes[y].is_vis;
                })
                .map(({ node: y, edgeId }) => ({ node: y, edgeId, parent: node })); // Map to include edgeId
            // console.log(nextNodes);
            this.stack.push(...nextNodes);
            return { node: node, edgeId: edgeId, parent: parent }; // Return an object with node and edgeId
        } else {
            return this.next();
        }
    }
    complete() {
        return this.stack.length === 0;
    }
}
