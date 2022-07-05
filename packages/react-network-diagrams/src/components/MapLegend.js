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
import PropTypes from "prop-types";
import _ from "underscore";

export class MapLegend extends React.Component {
    render() {
        let curX = this.props.x;
        let curY = this.props.y;
        const lineCenter = this.props.lineHeight / 2;

        const elements = [];
        if (this.props.nodeTypes.length > 0) {
            _.each(this.props.nodeTypes, (node, i) => {
                if (node.shape === "square") {
                    const classed = "map-node-shape-square-" + node.classed;
                    const x = curX - node.radius;
                    const y = curY;
                    const width = 2 * node.radius;
                    const style = { stroke: node.stroke, fill: node.fill };

                    const textX = curX + this.props.exampleWidth;
                    const textY = curY + lineCenter;

                    elements.push(
                        <g key={`node-${i}`}>
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={width}
                                style={style}
                                className={classed}
                            />
                            <text x={textX} y={textY + 4} textAnchor={"begin"}>
                                {node.text}
                            </text>
                        </g>
                    );
                    curY += this.props.lineHeight;
                } else {
                    const textX = curX + this.props.exampleWidth;
                    const textY = curY + lineCenter;
                    const classed = "map-node-shape-circle-" + node.classed;
                    const style = { stroke: node.stroke, fill: node.fill };

                    elements.push(
                        <g key={`node-${i}`}>
                            <circle
                                style={style}
                                cx={curX}
                                cy={textY}
                                r={node.radius}
                                className={classed}
                            />
                            <text x={textX} y={textY + 4} textAnchor={"begin"}>
                                {node.text}
                            </text>
                        </g>
                    );
                    curY += this.props.lineHeight;
                }
            });

            if (this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.edgeTypes.length > 0) {
            _.each(this.props.edgeTypes, (edge, i) => {
                const x = curX;
                const y = curY + lineCenter - edge.strokeWidth / 2;
                const textX = x + this.props.exampleWidth + this.props.gutter;
                const textY = curY + lineCenter;

                elements.push(
                    <g key={`edge-${i}`}>
                        <line
                            x1={x}
                            y1={y}
                            x2={x + this.props.exampleWidth}
                            y2={y}
                            stroke={this.props.edgeColor}
                            strokeWidth={edge.strokeWidth}
                        />
                        <text x={textX} y={textY} textAnchor={"begin"}>
                            {edge.text}
                        </text>
                    </g>
                );

                curY += this.props.lineHeight;
            });

            if (this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.colorSwatches.length > 0) {
            const width = this.props.exampleWidth;
            const height = this.props.lineHeight - 4;
            let itemCount = 0;

            _.each(this.props.colorSwatches, (color, i) => {
                if (itemCount && itemCount % this.props.itemsPerColumn === 0) {
                    curX += this.props.columnWidth;
                    curY = this.props.y;
                }

                const x = curX;
                const y = curY;
                const textX = x + this.props.exampleWidth + this.props.gutter;
                const textY = curY + lineCenter;

                elements.push(
                    <g key={`color-${i}`}>
                        <rect
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            stroke={color.stroke}
                            fill={color.fill}
                        />
                        <text x={textX} y={textY} textAnchor={"begin"}>
                            {color.text}
                        </text>
                    </g>
                );

                curY += this.props.lineHeight;
                itemCount += 1;
            });

            if (this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        return <g>{elements}</g>;
    }
}

MapLegend.propTypes = {
    /**
     * Controls the starting x co-ordinate
     */
    x: PropTypes.number,

    /**
     * Controls the starting y co-ordinate
     */
    y: PropTypes.number,

    /**
     * Controls the height of the line
     */
    lineHeight: PropTypes.number,

    /**
     * Boolean variable whether we want to have columns or not
     */
    columns: PropTypes.bool,

    /**
     * If we have columns, how many items do we want in each column
     */
    itemsPerColumn: PropTypes.number,

    /**
     * Width of each column
     */
    columnWidth: PropTypes.number,

    /**
     * Used to denote the width of a line when displaying the capacity or
     * the distance between the icon and the text in the legend
     */
    exampleWidth: PropTypes.number,

    gutter: PropTypes.number,

    /**
     * Color for the lines in the capacity map. The capacity map is a map where
     * the key is the capacity and the value represents the width of the line
     * that is drawn on the map
     */
    edgeColor: PropTypes.string,

    /**
     * An array that describes the different types of nodes on the map.
     *
     * Eg : [
     *      { classed: "esnet_site", fill: "#B0B0B0", radius: 7, shape: "square", stroke: "#B0B0B0", text: "Site"},
     *      { classed: "hub", fill: "#CBCBCB", radius: 7, shape: "circle", stroke: "#CBCBCB", text: "Hub" }
     * ];
     */
    nodeTypes: PropTypes.array,

    /**
     * An array that describes the different sizes of the edges on the map.
     *
     * Eg : [
     *      { strokeWidth: 7, text: "100 Gbps" }
     *      { strokeWidth: 4, text: "40 Gbps"}
     * ];
     */
    edgeTypes: PropTypes.array,

    /**
     * An array that describes the colors corresponding to the traffic on the map
     * and how to display that in the legend
     *
     * Eg : [
     *      { fill: "#990000", stroke: "#990000", text: "50+ Gbps" },
     *      { fill: "#bd0026", stroke: "#bd0026", text: "20 - 50" },
     *      { fill: "#cc4c02", stroke: "#cc4c02", text: "10 - 20" }
     * ];
     */
    colorSwatches: PropTypes.array
};

MapLegend.defaultProps = {
    x: 0,
    y: 0,
    lineHeight: 20,
    columns: true,
    itemsPerColumn: 4,
    columnWidth: 100,
    exampleWidth: 20,
    gutter: 8,
    edgeColor: "#333",
    nodeTypes: [],
    edgeTypes: [],
    colorSwatches: []
};
