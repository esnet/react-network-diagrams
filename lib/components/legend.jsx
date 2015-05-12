"use strict";

var React  = require("react");
var _      = require("underscore");

require("../styles/map.css");

var Legend = React.createClass({

    getDefaultProps: function() {
        return {
            x: 0,
            y: 0,
            lineHeight: 20,
            columns: true,  // if not then all items are done in one column
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
        var self = this;
        var curX = this.props.x;
        var curY = this.props.y;

        var elements = [];
        var lineCenter = this.props.lineHeight / 2;

        if(this.props.nodeTypes.length > 0) {
            _.each(this.props.nodeTypes, function(node) {
                var textX = curX + self.props.exampleWidth ;//+ self.props.gutter;
                var textY = curY + lineCenter ;
                var classed = "map-node " + node.classed;

                elements.push(
                    <g>
                        <circle cx={curX}
                                cy={textY}
                                r={node.radius}
                                className={classed} />
                        <text x={textX}
                              y={textY+4}
                              textAnchor={"begin"}>
                            {node.text}
                        </text>
                    </g>
                );
                curY += self.props.lineHeight;
            });

            if(this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.edgeTypes.length > 0) {
            _.each(this.props.edgeTypes, function(edge) {
                var x = curX;
                var y = curY + lineCenter - edge.strokeWidth/2;
                var textX = x + self.props.exampleWidth + self.props.gutter;
                var textY = curY + lineCenter;

                elements.push(
                    <g>
                        <line x1={x}
                              y1={y}
                              x2={x+self.props.exampleWidth}
                              y2={y}
                              stroke={self.props.edgeColor}
                              strokeWidth={edge.strokeWidth} />
                        <text x={textX} y={textY} textAnchor={"begin"}>
                            {edge.text}
                        </text>
                    </g>
                );

                curY += self.props.lineHeight;
            });

            if(this.props.columns) {
                curX += this.props.columnWidth;
                curY = this.props.y;
            }
        }

        if (this.props.colorSwatches.length > 0) {
            var width = this.props.exampleWidth;
            var height = this.props.lineHeight - 4;
            var itemCount = 0;

            _.each(this.props.colorSwatches, function(color) {
                if(itemCount && itemCount % self.props.itemsPerColumn === 0) {
                    curX += self.props.columnWidth;
                    curY = self.props.y;
                }

                var x = curX;
                var y = curY;

                var textX = x + self.props.exampleWidth + self.props.gutter;
                var textY = curY + lineCenter;

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

                curY += self.props.lineHeight;
                itemCount += 1;
            });

            if(this.props.columns) {
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


module.exports = Legend;