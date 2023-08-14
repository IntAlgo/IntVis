import { Node, Edge } from 'vis-network/standalone/esm/vis-network';
export interface dfNode extends Node {
    id:IdType;
    is_vis: boolean;
}
export interface dfEdge extends Edge {
    from:number;
    to:number;
    in_tree:boolean;
}