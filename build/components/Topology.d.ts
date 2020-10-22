import { ReactElement } from "react";
import { Graph, MetaType, PropertyType } from "../graph/Graph";
import { Node } from "../graph/Node";
import { Box, Coord } from "./types";
import { LabelPosition } from "./Label";
export declare type Layout<N extends PropertyType, E extends PropertyType> = (n: Node<N, E>) => Coord;
/**
 * A type which defines the shape of data returned by the `LabelLayout` callback.
 * The object returned should contain the `position` (as a `LabelPosition`), and
 * any offset from the default position as `dx` and `dy`.
 */
export declare type LabelLayoutProperties = {
    position?: LabelPosition;
    dx?: number;
    dy?: number;
};
/**
 * Type of a label layout callback signature. You can define a function of this signatures
 * and pass it into the Topology component. For each node this function will be
 * evoked with the `Node` object. The responsibility of this function is to return
 * an object of type `LabelLayoutProperties`, which is of the form:
 *
 * ```
 * {
 *     position: LabelPosition;
 *     dx: number;
 *     dy: number;
 * }
 * ```
 */
export declare type LabelLayout<N extends PropertyType, E extends PropertyType> = (n: Node<N, E>) => LabelLayoutProperties;
export interface TopologyProps<M extends MetaType, N extends PropertyType, E extends PropertyType> {
    /**
     * Used to identify the topology in callbacks
     */
    id: string;
    /**
     * The nodes and edges to render
     */
    graph: Graph<M, N, E>;
    /**
     * The layout of the nodes
     */
    layout: Layout<N, E>;
    /**
     * The width of the SVG area to render into
     */
    width: number;
    /**
     * The height of the SVG area to render into
     */
    height: number;
    /**
     * Blank area surrounding the drawing, but within the width/height SVG box
     */
    margin?: number;
    /**
     * Specified as an object containing x1, y1 and x2, y2. This is the region
     * to display on the map. If this isn't specified the bounds will be
     * calculated from the nodes in the Map.
     */
    bounds?: Box;
    /**
     * Function to return the label of the node.
     *
     * Example:
     * ```
     * (n) => n.property("label") as string
     * ```
     */
    label?: (n: Node<N, E>) => string;
    labelLayout: LabelLayout<N, E>;
}
export declare function Topology<M extends MetaType, N extends PropertyType, E extends PropertyType>(props: TopologyProps<M, N, E>): ReactElement;
