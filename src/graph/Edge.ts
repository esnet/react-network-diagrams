import { PropertyType } from "./Graph";
import { Node } from "./Node";

/**
 * A `Edge` encapsulates a connection to a target `Node<N>` with an associated
 * `id` and set of properties which conform to type E.
 */
export class Edge<N extends PropertyType, E extends PropertyType> {
    private _id: string;
    private _source: Node<N, E>;
    private _target: Node<N, E>;
    private _properties: E;

    constructor(id: string, source: Node<N, E>, target: Node<N, E>, properties: E) {
        this._id = id;
        this._source = source;
        this._target = target;
        this._properties = properties;
    }

    public id(): string {
        return this._id;
    }

    public source(): Node<N, E> {
        return this._source;
    }

    public target(): Node<N, E> {
        return this._target;
    }

    public properties(key: string): number | string | null {
        return this._properties[key];
    }
}
