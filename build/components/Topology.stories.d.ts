import { ReactElement } from "react";
import { Topology } from "./Topology";
declare const _default: {
    title: string;
    component: typeof Topology;
};
export default _default;
/**
 * Temp node position can be top, bottom, left or right
 */
declare type NodePosition = "top" | "bottom" | "left" | "right";
/**
 * We'll store the JSON data on our nodes, then when we
 * resolve properties for the visualization we'll just
 * pull the values from there, for this example.
 */
export declare type NetworkNode = {
    labelDx: number;
    labelDy: number;
    labelPosition: NodePosition;
    label: string;
    type: string;
    x: number;
    y: number;
};
/**
 * Edges of the network just have one property: the capacity
 * of the network edge. We'll separately pull in and map network
 * traffic as well, but not store that here on the edge itself.
 */
export declare type NetworkEdge = {
    capacity: string;
};
export declare const basic: () => ReactElement;
