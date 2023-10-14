export class DFSgraph {
    constructor(edges, nodes, startnodeId) {
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
        this.stack = new Array();
        this.pathVisited = new Map();
        this.stack.push({ node: this.startNode, edgeId: null, parent: null }); // Store the edgeId as well
        this.pathVisited.set(this.startNode, true);
    }
    next() {
        if (this.stack.length === 0) {
            console.log('stack is empty');
            return null;
        }

        let { node, edgeId, parent } = this.stack.pop();
        // Destructure the node and edgeId
        // console.log(`node is ${node}`);
        // console.log(this.nodes[node].is_vis);
        if (!this.nodes[node].is_vis) {
            this.nodes[node].is_vis = true;

            const nextNodes = this.adj[node]
                .filter(({ node: y }) => {
                    // if (this.pathVisited.get(y)===undefined) {
                    //     this.pathVisited.set(y, true);
                    // }
                    return !this.nodes[y].is_vis && this.pathVisited.get(y)===undefined;
                })
                .map(({ node: y, edgeId }) => ({ node: y, edgeId, parent: node })); // Map to include edgeId
            // console.log(nextNodes);
            if (nextNodes.length > 0) {
                nextNodes.map(({ node: y, edgeId }) => {
                    this.pathVisited.set(y, true);
                });
            }
            this.stack.push(...nextNodes);
            // const arr = this.stack;
            // console.log(JSON.stringify(this.stack.length));
            // console.log(JSON.stringify(this.stack));
            // console.log(this.pathVisited);
            // console.log(arr);
            if (this.stack.length === 0) {
                console.log('stack is empty');
            }
            return { node: node, edgeId: edgeId, parent: parent }; // Return an object with node and edgeId
        } else {
            return this.next();
        }
    }
    complete() {
        return this.stack.length === 0;
    }
}
