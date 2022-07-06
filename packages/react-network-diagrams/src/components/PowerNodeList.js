/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import _ from "underscore";

import { PowerNode } from "./PowerNode";

export class PowerNodeList extends React.Component {
    assignPowerNodes(power) {
        /**
         * Power nodes are positioned around a rack in one of 9 potential locations
         * in the format Vertical - Horizontal:
         * Above - Left
         * Above - Middle
         * Above - Right
         * Center - Left
         * Center - Middle
         * Center - Right
         * Below - Left
         * Below - Middle
         * Below - Right
         *
         * There may be multiple nodes at each location, and will need to be rendered next to each other
         */

        const nodes = {
            "Above-Left": [],
            "Above-Center": [],
            "Above-Right": [],
            "Center-Left": [],
            "Center-Center": [],
            "Center-Right": [],
            "Below-Left": [],
            "Below-Center": [],
            "Below-Right": []
        };

        // Assign nodes to their position.  Each position will have 0 or more nodes
        _.each(power, powerNode => {
            const position = `${powerNode.vPos}-${powerNode.hPos}`;
            // get the current length of the nodes position
            nodes[position].push(powerNode);
        });

        const newNodes = {};
        _.each(nodes, (node, name) => {
            if (node.length > 0) {
                newNodes[name] = node;
            }
        });
        return [_.flatten(_.values(nodes)), newNodes];
    }

    renderPositionLabel(label, x, y) {
        return (
            <text
                key={`position-${label}`}
                x={x}
                y={y}
                textAnchor={"start"}
                style={this.props.positionLabelStyle}
            >
                {label}
            </text>
        );
    }

    drawPowerNode(powerNode, key) {
        return (
            <PowerNode
                powerNode={powerNode}
                name={powerNode.navTo}
                selected={powerNode.id === this.props.selected}
                key={key}
                labelStyle={powerNode.style.label}
                onSelectionChange={this.props.onSelectionChange}
            />
        );
    }

    positionPowerNodes(newNodes) {
        let elements = [];
        let xStart = this.props.xOffset;
        let yStart = this.props.yOffset;
        _.each(newNodes, (group, groupName) => {
            const label = this.renderPositionLabel(groupName, xStart, yStart);
            yStart += 30;
            elements.push(label);
            _.each(group, (powerNode, val) => {
                const key = `${groupName}-${val}`;
                powerNode["x"] = xStart + 20;
                powerNode["y"] = yStart;
                elements.push(this.drawPowerNode(powerNode, key));
                yStart += 55;
            });
        });
        return elements;
    }

    render() {
        const powerElements = this.assignPowerNodes(this.props.powerNodes);
        const groups = _.map(powerElements[1], (group, groupName) => {
            return groupName;
        });
        const groupCount = groups.length;
        const nodeCount = powerElements[0].length;

        const totalHeight = groupCount * 12 + nodeCount * 60 + this.props.yOffset * 2;
        const powerContainer = {
            normal: {
                borderTopStyle: "solid",
                borderBottomStyle: "solid",
                borderWidth: 1,
                borderTopColor: "#FFFFFF",
                borderBottomColor: "#FFFFFF",
                width: "100%",
                height: totalHeight
            }
        };

        let className = "rack-container";
        const svgStyle = powerContainer.normal;

        return (
            <div>
                <svg className={className} style={svgStyle}>
                    {this.positionPowerNodes(powerElements[1])}
                </svg>
            </div>
        );
    }
}

PowerNodeList.defaultProps = {
    xOffset: 10,
    yOffset: 30,
    positionLabelStyle: {
        fill: "#9D9D9D",
        fontSize: 10,
        fontFamily: "verdana, sans-serif"
    }
};
