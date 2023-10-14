import { Node, Edge } from 'vis-network/standalone/esm/vis-network';
import { ChildDirection } from './enums';
export interface dfNode extends Node {
    id:IdType;
    is_vis: boolean;
    prev?: Number|null;
}

export interface dfEdge extends Edge {
    from:number;
    to:number;
    in_tree:boolean;
}


export interface binTreeEdge extends dfEdge {
    parent:number;
    childpoint:ChildDirection;
}
