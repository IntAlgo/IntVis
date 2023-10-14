import { ChildDirection } from "../../types/enums";

export class BinaryTreeInorderTraversal {
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
        this.curr = this.startNode;
    }

    next() {
        while (this.curr !== null || this.stack.length !== 0) {
            while (this.curr !== null) {
                this.stack.push({ node: this.curr, edgeId: null, parent: null });
                let leftChild = this.adj[this.curr].find(edge => edge.childpoint === ChildDirection.LEFT);
                this.curr = leftChild ? leftChild.node : null;
            }

            let { node, edgeId, parent } = this.stack.pop();
            this.curr = node;

            let rightChild = this.adj[this.curr].find(edge => edge.childpoint === ChildDirection.RIGHT);
            this.curr = rightChild ? rightChild.node : null;
            return { node: node, edgeId: edgeId, parent: parent };
        }

        return null;
    }

    complete() {
        return this.curr === null && this.stack.length === 0;
    }
}
