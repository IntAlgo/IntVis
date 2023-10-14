import { ChildDirection } from "../../types/enums";

export class BinaryTreePostorderTraversal {
    constructor(edges, nodes, root) {
        this.adj = Array.from({ length: nodes.length }, () => []);
        this.edges = edges;
        this.edgeMap = new Map();

        for (let i = 0; i < edges.length; i++) {
            const { from, to, childpoint } = edges[i];
            this.adj[from].push({ node: to, edgeId: edges[i].id, childpoint:childpoint });
            this.edgeMap.set(`${from}-${to}`, edges[i].id);
        }

        this.currnode = null;
        this.prevnode = null;
        this.startNode = root;
        this.nodes = nodes;
        this.stack = [];
        this.stack.push({ node: this.startNode, edgeId: null, parent: null });
    }
    next() {
        while (this.stack.length !== 0) {
            let { node, edgeId, parent } = this.stack.pop();
            let leftChild = this.adj[node].find(edge => edge.childpoint === ChildDirection.LEFT);
            let rightChild = this.adj[node].find(edge => edge.childpoint === ChildDirection.RIGHT);
            if (leftChild && rightChild && !this.nodes[leftChild.node].is_vis && !this.nodes[rightChild.node].is_vis) {
                this.stack.push({ node: node, edgeId: edgeId, parent: parent });
                this.stack.push({ node: rightChild.node, edgeId: rightChild.edgeId, parent: node });
                this.stack.push({ node: leftChild.node, edgeId: leftChild.edgeId, parent: node });
            } else if (leftChild && !this.nodes[leftChild.node].is_vis) {
                this.stack.push({ node: node, edgeId: edgeId, parent: parent });
                this.stack.push({ node: leftChild.node, edgeId: leftChild.edgeId, parent: node });
            } else if (rightChild  && !this.nodes[rightChild.node].is_vis) {
                this.stack.push({ node: node, edgeId: edgeId, parent: parent });
                this.stack.push({ node: rightChild.node, edgeId: rightChild.edgeId, parent: node });
            } else {
                this.nodes[node].is_vis = true;
                return { node: node, edgeId: edgeId, parent: parent };
            }
        }

        return null;
    }
    complete() {
        return this.stack.length === 0;
    }
}
