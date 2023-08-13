export class DFSgraph {
    constructor(edges, nodes, startnodeId) {
        console.log(edges, nodes);
        this.adj = Array.from({ length: nodes.length }, () => []);
        this.edges = edges; // Store the edges
        this.edgeMap = new Map(); // Map to store edge ID based on from and to nodes
        console.log(this.adj);

        for (let i = 0; i < edges.length; i++) {
            const { from, to } = edges[i];
            this.adj[from].push({ node: to, edgeId: edges[i].id }); // Store node and edgeId in adjacency list
            this.edgeMap.set(`${from}-${to}`, edges[i].id); // Store the edge ID in the map
        }

        this.startNode = startnodeId;
        this.nodes = nodes;
        this.stack = [];
        this.stack.push({ node: this.startNode, edgeId: null }); // Store the edgeId as well
    }
    next() {
        if (this.stack.length === 0) return null;

        let { node, edgeId } = this.stack.pop();
        // Destructure the node and edgeId
        console.log(this.nodes[node].is_vis);
        if (!this.nodes[node].is_vis) {
            this.nodes[node].is_vis = true;

            const nextNodes = this.adj[node]
                .filter(({ node: y }) => {
                    // console.log(this.nodes[y]);
                    return !this.nodes[y].is_vis;
                })
                .map(({ node: y, edgeId }) => ({ node: y, edgeId })); // Map to include edgeId
            console.log(nextNodes);
            this.stack.push(...nextNodes);
            return { node: node, edgeId: edgeId }; // Return an object with node and edgeId
        } else {
            return this.next();
        }
    }
    complete() {
        return this.stack.length === 0;
    }
}
