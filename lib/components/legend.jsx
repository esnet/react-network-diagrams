import React from "react";
import _ from "underscore";

import "../styles/map.css";

export default React.createClass({

    getDefaultProps: function() {
        return {
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
    },

    render: function() {
        let curX = this.props.x;
        let curY = this.props.y;
        const lineCenter = this.props.lineHeight / 2;

        let elements = [];
        if (this.props.nodeTypes.length > 0) {
            _.each(this.props.nodeTypes, node => {
                let textX = curX + this.props.exampleWidth;
                let textY = curY + lineCenter;
                let classed = "map-node " + node.classed;
                elements.push(
                    <g>
                        <circle cx={curX}
                                cy={textY}
                                r={node.radius}
                                className={classed} />
                        <text x={textX}
                              y={textY + 4}
                              textAnchor={"begin"}>
                            {node.text}
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

        if (this.props.edgeTypes.length > 0) {
            _.each(this.props.edgeTypes, edge => {
                const x = curX;
                const y = curY + lineCenter - edge.strokeWidth / 2;
                const textX = x + this.props.exampleWidth + this.props.gutter;
                const textY = curY + lineCenter;

                elements.push(
                    <g>
                        <line x1={x}
                              y1={y}
                              x2={x + this.props.exampleWidth}
                              y2={y}
                              stroke={this.props.edgeColor}
                              strokeWidth={edge.strokeWidth} />
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

            _.each(this.props.colorSwatches, color => {
                if (itemCount && itemCount % this.props.itemsPerColumn === 0) {
                    curX += this.props.columnWidth;
                    curY = this.props.y;
                }

                const x = curX;
                const y = curY;
                const textX = x + this.props.exampleWidth + this.props.gutter;
                const textY = curY + lineCenter;

                elements.push(
                    <g>
                        <rect x={x}
                              y={y}
                              width={width}
                              height={height}
                              stroke={color.stroke}
                              fill={color.fill} />
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

        return (
            <g>
                {elements}
            </g>
        );
    }
});

