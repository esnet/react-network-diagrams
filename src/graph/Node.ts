import { Edge } from "./Edge";
import { PropertyType } from "./Graph";

/**
 * A `Node` represents one vertex of a graph. The node can contain any properties conforming
 * to type `P`. The node also has an id, which should be unique within the `Graph`.
 */
export class Node<
  N extends PropertyType,
  E extends PropertyType = Record<string, string>
> {
  private _id: string;
  private _properties: N;
  private _adjacencyList: Edge<N, E>[];

  constructor(id: string, properties: N) {
    this._id = id;
    this._properties = properties;
    this._adjacencyList = [];
  }

  public id(): string {
    return this._id;
  }

  public property<K extends keyof N>(key: K) {
    return this._properties[key];
  }

  public addAdjacency(
    id: string,
    target: Node<N, E>,
    properties: E
  ): Edge<N, E> {
    const edge = new Edge(id, this, target, properties);
    this._adjacencyList.push(edge);
    return edge;
  }

  public adjacencyList(): Edge<N, E>[] {
    return this._adjacencyList;
  }
}
