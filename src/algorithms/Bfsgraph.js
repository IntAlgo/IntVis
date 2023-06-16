export class BFSgraph {
    constructor(edges, nodes ,startnodeId){
       this.adj=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
       for(let i=0;i<edges.length;i++)this.adj[edges[i]["from"]].push(edges[i]["to"]);
       this.startNode=startnodeId;
       this.nodes=nodes;
       this.queue=[];
       this.queue.push(this.startNode);
    }
    next(){
        if(this.queue.length===0)return null;
        let x=this.queue.shift()
        this.nodes[x].is_vis=true;
        this.queue.push(...this.adj[x].filter((y)=>!this.nodes[y].is_vis));
        return x
    }
    complete(){
        return this.queue.length===0;
    }
  };