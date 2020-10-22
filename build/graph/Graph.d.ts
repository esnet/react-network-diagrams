/**
 *  Copyright (c) 2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import { Edge } from "./Edge";
import { Node } from "./Node";
export declare type NullableValue = number | string | null;
export declare type PropertyType = Record<string, NullableValue>;
export declare type MetaType = Record<string, string>;
/**
 * A `Graph` is a container for a list of `Node` objects and `Edge` object, where
 * each `Edge` which connects two of the `Node`s. To render a `Graph` you would pass
 * it into the `Topology` component.
 */
export declare class Graph<M extends MetaType, N extends PropertyType, E extends PropertyType> {
    private _meta;
    private _nodes;
    constructor(meta?: M);
    getMetaValue(key: string): string | undefined;
    addNode(node: Node<N, E>): Node<N, E>;
    getNode(id: string): Node<N, E> | undefined;
    getNodes(): Node<N, E>[];
    hasNode(id: string): boolean;
    /**
     * Adds a new connection between a `source` and `target` node. These should be specified using the
     * Nodes themselves (rather than nodeIds). The first argument is an identifier for the edge, which
     * should be a string. The next two arguments are the `source` and `target` `Node` objects of type
     * `N`. The final argument is the data to be stored on the `Edge`, which should be of type `E`.
     *
     * Example:
     * ```
     * const g = new Graph<MetaType, NodeType, EdgeType>({ name: "top_level", version: "5.55" });
     * const chic = g.addNode(new Node("1", { name: "chic", code: 3 }));
     * const wash = g.addNode(new Node("2", { name: "wash", code: 3 }));
     *
     * g.addEdge("chic--wash", chic, wash, { weight: 1.2 });
     * ```
     */
    addEdge(id: string, source: Node<N, E>, target: Node<N, E>, properties: E): Edge<N, E> | undefined;
    getEdges(root: Node<N, E>): Edge<N, E>[];
    /**
     * Traverse across the nodes using a bfs, starting at a provided
     * `root` Node. For each node visited a `visitor` function will
     * be called with the `Node` being visited.
     */
    traverse(root: Node<N, E>, visitor?: (n: Node<N, E>) => void): void;
}
