import { PropertyType } from "./Graph";
import { Node } from "./Node";
/**
 * A `Edge` encapsulates a connection to a target `Node<N>` with an associated
 * `id` and set of properties which conform to type E.
 */
export declare class Edge<N extends PropertyType, E extends PropertyType> {
    private _id;
    private _source;
    private _target;
    private _properties;
    constructor(id: string, source: Node<N, E>, target: Node<N, E>, properties: E);
    id(): string;
    source(): Node<N, E>;
    target(): Node<N, E>;
    properties(key: string): number | string | null;
}
