import React, { ReactElement } from "react";
import { LabelLayout, LabelLayoutProperties, Layout, Topology } from "./Topology";
import { Graph, PropertyType } from "../graph/Graph";
import { Node } from "../graph/Node";
import { Box, Coord } from "./types";
import _ from "lodash";
import { LabelPosition } from "./Label";

/* eslint-disable sort-keys */

export default {
    title: "Topology",
    component: Topology,
};

const data = {
    description: "Simple topo",
    name: "simple",
    nodes: [
        {
            label_dx: null,
            label_dy: null,
            label_position: "Top",
            name: "Node1",
            type: "esnet_site",
            x: 100,
            y: 20,
            id: "902e2ac8-038b-44c2-95dc-94d826542a59",
        },
        {
            label_dx: null,
            label_dy: null,
            label_position: "Bottom",
            name: "Node2",
            site: 5,
            type: "esnet_site",
            x: 50,
            y: 80,
            id: "d9c6f800-98a4-4156-a6b2-13a41bc7abc2",
        },
        {
            label_dx: null,
            label_dy: null,
            label_position: "Bottom",
            name: "Node3",
            site: 5,
            type: "hub",
            x: 150,
            y: 80,
            id: "ee890ac0-e79c-4a30-a2be-68a71430e719",
        },
    ],
    edges: [
        {
            capacity: "100G",
            source: "Node1",
            target: "Node2",
        },
        {
            capacity: "40G",
            source: "Node2",
            target: "Node3",
        },
        {
            capacity: "10G",
            source: "Node3",
            target: "Node1",
        },
    ],
};

const layoutWithAttrs: Layout<NetworkNode, NetworkEdge> = (n: Node<NetworkNode, NetworkEdge>): Coord => {
    const coord: Coord = {
        x: n.property("x") as number,
        y: n.property("y") as number,
    };
    return coord;
};

const layoutLabelWithAttrs: LabelLayout<NetworkNode, NetworkEdge> = (
    n: Node<NetworkNode, NetworkEdge>,
): LabelLayoutProperties => {
    return {
        position: (n.property("labelPosition") as LabelPosition) || LabelPosition.Top,
        dx: 0,
        dy: 0,
    };
};

type NetworkTopology = {
    name: string;
    description: string;
};

/**
 * Temp node position can be top, bottom, left or right
 */
type NodePosition = "top" | "bottom" | "left" | "right";

/**
 * We'll store the JSON data on our nodes, then when we
 * resolve properties for the visualization we'll just
 * pull the values from there, for this example.
 */
export type NetworkNode = {
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
export type NetworkEdge = {
    capacity: string;
};

export const basic = (): ReactElement => {
    const g = new Graph<NetworkTopology, NetworkNode, NetworkEdge>({
        name: "simple_triangle",
        description: "This is an example topology for testing",
    });

    data.nodes.forEach((n) => {
        const node = new Node<NetworkNode, NetworkEdge>(n.id, {
            labelDx: (n.label_dx ? n.label_dx : 0) as number,
            labelDy: (n.label_dy ? n.label_dy : 0) as number,
            labelPosition: (_.isNull(n.label_position) ? "top" : n.label_position) as NodePosition,
            label: n.name ? n.name : "",
            type: n.type,
            x: n.x ? n.x : 0,
            y: n.y ? n.y : 0,
        });
        g.addNode(node);
    });

    const bounds: Box = {
        x1: 0,
        y1: 0,
        x2: 200,
        y2: 100,
    };

    return (
        <Topology
            id="triangle"
            bounds={bounds}
            width={600}
            height={350}
            margin={20}
            graph={g}
            label={(n) => n.property("label") as string}
            labelLayout={layoutLabelWithAttrs}
            layout={layoutWithAttrs}
        />
    );
};
