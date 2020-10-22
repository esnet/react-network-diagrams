import { Edge } from "./Edge";
import { PropertyType } from "./Graph";
/**
 * A `Node` represents one vertex of a graph. The node can contain any properties conforming
 * to type `P`. The node also has an id, which should be unique within the `Graph`.
 */
export declare class Node<N extends PropertyType, E extends PropertyType = Record<string, string>> {
    private _id;
    private _properties;
    private _adjacencyList;
    constructor(id: string, properties: N);
    id(): string;
    property(key: keyof N): number | string | null;
    addAdjacency(id: string, target: Node<N, E>, properties: E): Edge<N, E>;
    adjacencyList(): Edge<N, E>[];
}
