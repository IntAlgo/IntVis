export class DFSgraph {
    constructor(edges, nodes ,startnodeId){
       this.adj=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
       for(let i=0;i<edges.length;i++)this.adj[edges[i]["from"]].push(edges[i]["to"]);
       this.startNode=startnodeId;
       this.nodes=nodes;
       this.stack=[];
       this.stack.push(this.startNode);
    }
    next(){
        if(this.stack.length===0)return null;
        let x=this.stack.pop()
        this.nodes[x].is_vis=true;
        this.stack.push(...this.adj[x].filter((y)=>!this.nodes[y].is_vis));
        return x
    }
    complete(){
        return this.stack.length===0;
    }
  };