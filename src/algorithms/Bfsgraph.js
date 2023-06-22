
  export class BFSgraph {
    constructor(edges, nodes, startnodeId) {
      this.adj = Array.from({ length: nodes.length }, () => []);
      this.edges = edges; // Store the edges
      this.edgeMap = new Map(); // Map to store edge ID based on from and to nodes
      for (let i = 0; i < edges.length; i++) {
        const { from, to } = edges[i];
        this.adj[from].push({ node: to, edgeId: edges[i].id }); // Store node and edgeId in adjacency list
        this.edgeMap.set(`${from}-${to}`, edges[i].id); // Store the edge ID in the map
      };
      this.startNode= startnodeId;
      this.nodes = nodes;
      this.queue=[];
    this.queue.push({ node: this.startNode, edgeId: null }); // Store the edgeId as well
    }
    next() {
      if (this.queue.length === 0) return null;
      let { node, edgeId } = this.queue.shift(); // Destructure the node and edgeId
      this.nodes[node].is_vis = true;
      const nextNodes = this.adj[node]
        .filter(({ node: y }) => !this.nodes[y].is_vis)
        .map(({ node: y, edgeId }) => ({ node: y, edgeId })); // Map to include edgeId
      this.queue.push(...nextNodes);
      return { node:node, edgeId:edgeId }; // Return an object with node and edgeId
    }
    complete() {
      return this.queue.length === 0;
    }
  }