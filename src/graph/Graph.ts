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

export type NullableValue = number | string | null;

export type PropertyType = Record<string, NullableValue>;

export type MetaType = Record<string, string>;

/**
 * A `Graph` is a container for a list of `Node` objects and `Edge` object, where
 * each `Edge` which connects two of the `Node`s. To render a `Graph` you would pass
 * it into the `Topology` component.
 */
export class Graph<M extends MetaType, N extends PropertyType, E extends PropertyType> {
    private _meta: M | undefined;
    private _nodes: Map<string, Node<N, E>>;

    constructor(meta?: M) {
        this._meta = meta;
        this._nodes = new Map();
    }

    public getMetaValue(key: string): string | undefined {
        if (!this._meta) {
            return;
        }
        return this._meta[key];
    }

    public addNode(node: Node<N, E>): Node<N, E> {
        this._nodes.set(node.id(), node);
        return node;
    }

    public getNode(id: string): Node<N, E> | undefined {
        return this._nodes.get(id);
    }

    public getNodes(): Node<N, E>[] {
        return [...this._nodes.values()];
    }

    public hasNode(id: string): boolean {
        return this._nodes.has(id);
    }

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
    public addEdge(id: string, source: Node<N, E>, target: Node<N, E>, properties: E): Edge<N, E> | undefined {
        const sourceNode = this.getNode(source.id());
        if (sourceNode) {
            return sourceNode.addAdjacency(id, target, properties);
        }
        return;
    }

    public getEdges(root: Node<N, E>): Edge<N, E>[] {
        const edges = new Set<Edge<N, E>>();
        this.traverse(root, (n) => {
            n.adjacencyList().forEach((edge) => {
                edges.add(edge);
            });
        });
        return [...edges.values()];
    }

    /**
     * Traverse across the nodes using a bfs, starting at a provided
     * `root` Node. For each node visited a `visitor` function will
     * be called with the `Node` being visited.
     */
    public traverse(
        root: Node<N, E>,
        visitor = (n: Node<N, E>) => {
            console.log(n.id());
        },
    ): void {
        if (!root) {
            return;
        }

        // Keeps a set of node Ids we've already visited so we don't go in circles
        const visited = new Set<string>();

        // Maintan a queue of nodes still to visit
        const queue: Node<N, E>[] = [root];

        // Keep processing the queue until it's empty
        while (queue.length > 0) {
            const visitedNode = queue.shift() as Node<N, E>;

            // Now do something with this
            visitor(visitedNode);

            // Add adjacent nodes to the queue
            const edges = visitedNode.adjacencyList();
            for (const edge of edges) {
                if (!visited.has(edge.target().id())) {
                    visited.add(edge.target().id());
                    queue.push(edge.target());
                }
            }
        }
    }
}
