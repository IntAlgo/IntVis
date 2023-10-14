import { ChildDirection } from "../../types/enums";

export class BinaryTreePreorderTraversal {
    constructor(edges, nodes, root) {
        this.adj = Array.from({ length: nodes.length }, () => []);
        this.edges = edges; // Store the edges
        this.edgeMap = new Map(); // Map to store edge ID based on from and to nodes

        for (let i = 0; i < edges.length; i++) {
            const { from, to, childpoint } = edges[i];
            this.adj[from].push({ node: to, edgeId: edges[i].id, childpoint:childpoint }); // Store node and edgeId in adjacency list
            this.edgeMap.set(`${from}-${to}`, edges[i].id); // Store the edge ID in the map
        }

        this.currnode = null;
        this.prevnode = null;
        this.startNode = root;
        this.nodes = nodes;
        this.stack = [];
        this.stack.push({ node: this.startNode, edgeId: null, parent: null }); // Store the edgeId as well
    }
    next() {
        if (this.stack.length === 0) return null;

        let { node, edgeId, parent } = this.stack.pop();
        if (!this.nodes[node].is_vis) {
            this.nodes[node].is_vis = true;
            for(let i = 0; i < this.adj[node].length; i++){
                if(this.adj[node][i].childpoint === ChildDirection.RIGHT){
                    this.stack.push({ node: this.adj[node][i].node, edgeId: this.adj[node][i].edgeId, parent: node });
                }
            }
            for(let i = 0; i < this.adj[node].length; i++){
                if(this.adj[node][i].childpoint === ChildDirection.LEFT){
                    this.stack.push({ node: this.adj[node][i].node, edgeId: this.adj[node][i].edgeId, parent: node });
                }
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
