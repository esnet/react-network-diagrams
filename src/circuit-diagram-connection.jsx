/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/**
 * A module containing a the connection drawing primative.
 *
 * @module CircuitConnection
 */

"use strict";

import React from "react";
import Endpoint from "./circuit-diagram-endpoint";
import Line from "./edge-simple";

export default React.createClass({

    getInitialState() {
        return {highlighted: false };
    },

    getDefaultProps() {
        return {
            noNavigate: false,
            labelPosition: "top",
            radius: 2,
            endpointShape: "circle",
            classed: "circuit",
            lineShape: "linear",
            selected: false,
            muted: false,
            position: 0,
            arrow: false,
            arrowWidth: 10,
            arrowHeight: 10,
            curveDirection: "right",
            curveOffset: 20,
            size: 40,
        };
    },
    /**
     * User hovers over the circuit
     */
    _mouseOver() {
        if (!this.props.noNavigate) {
            this.setState({highlighted: true});
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({highlighted: false});
        }
    },

    _clicked(e,l) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e,l);
        }
    },

    renderEndpoints() {
        if (this.props.arrow) {
            return (
                <g>
                </g>
            );
        } else {
            return (
                <g>
                    <Endpoint x={this.props.x1}
                              y={this.props.y1}
                              key={"line-begin"}
                              style={this.props.style}
                              radius={this.props.radius}
                              shape={this.props.endpointShape}
                              highlighted={this.state.highlighted}
                              muted={this.props.muted}
                              selected={this.props.selected} />
                    <Endpoint x={this.props.x2}
                              y={this.props.y2}
                              key={"line-end"}
                              style={this.props.style}
                              radius={this.props.radius}
                              shape={this.props.endpointShape}
                              highlighted={this.state.highlighted}
                              muted={this.props.muted}
                              selected={this.props.selected} />
                </g>
            );
        }
    },

    render() {
        // let styleModifier = "normal";

        // const labelClassed = "circuit-label";

        const xOffset = this.props.labelOffsetX ? this.props.labelOffsetX : this.props.radius * 1.33;
        const yOffset = this.props.labelOffsetY ? this.props.labelOffsetY : this.props.radius * 1.33;

        const hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8,
        };

        const navTo = this.props.navTo;

        let width;
        let stroke;
        let fill;
        let offset;

        if (this.props.lineShape === "angled") {
            offset = this.props.bendOffset;
        } else {
            offset = this.props.curveOffset;
        }

        if (this.state.highlighted) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }
        console.log("circuit-diagram-connection",this.props);
        return (
            <g>
                <g>
                    <Line x1={this.props.x1}
                          x2={this.props.x2}
                          y1={this.props.y1}
                          y2={this.props.y2}
                          shape={this.props.lineShape}
                          key={"line-path"}
                          label={this.props.label}
                          labelPosition={this.props.labelPosition}
                          labelStyle={this.props.style.label}
                          labelOffsetX={xOffset}
                          labelOffsetY={yOffset}
                          textAnchor={this.props.textAnchor}
                          color={stroke}
                          width={width}
                          muted={this.props.muted}
                          selected={this.props.selected}
                          classed={this.props.classed}
                          roundedX={this.props.roundedX}
                          roundedY={this.props.roundedY}
                          fillColor={fill}
                          size={this.props.size}
                          centerLine={this.props.centerLine}
                          arrow={this.props.arrow}
                          arrowWidth={this.props.arrowWidth}
                          arrowHeight={this.props.arrowHeight}
                          position={this.props.position}
                          offset={offset}
                          curveDirection={this.props.curveDirection}
                          name={navTo} />
                </g>
                <g onMouseOver={this._mouseOver}
                   onMouseOut={this._mouseOut}>
                    <Line /* Positional Props used by all shapes */
                          x1={this.props.x1}
                          x2={this.props.x2}
                          y1={this.props.y1}
                          y2={this.props.y2}

                          /* Identity Props used by all shapes */
                          shape={this.props.lineShape} /* controls shape of the line */
                          key={"line-path"} /* needed for react element */

                          /* Label Props used by all shapes */
                          label={this.props.label} /* provides label to be displayed */
                          labelPosition={this.props.labelPosition} /* controls where label
                                                                      is situated around the line */
                          labelStyle={this.props.style.label} /* controls the
                                                                                style of the label */
                          labelOffsetX={xOffset} /* controls the +/- x offset from labelPosition */
                          labelOffsetY={yOffset} /* controls the +/- y offset from labelPosition */
                          textAnchor={this.props.textAnchor} /* controls the positioning of the text */

                          /* Style Props */
                          color={hitStyle.stroke} /* controls color of the line */
                          width={hitStyle.strokeWidth} /* controls the stroke thickness */
                          muted={this.props.muted} /* controls style */
                          selected={this.props.selected} /* controls style */
                          classed={this.props.classed} /* provides a psuedo css class for the line */

                          /* Square props */
                          roundedX={this.props.roundedX} /* controls corner rounding */
                          roundedY={this.props.roundedY} /* controls corner rounding */
                          fillColor={fill} /* controls color of the fill */
                          size={this.props.size} /* controls height of square */
                          centerLine={this.props.centerLine} /* controls display of horizontal center line */

                          /* Arrow props, not used by square */
                          arrow={this.props.arrow} /* determines whether to
                                                      display nodes or arrows at ends of line */
                          arrowWidth={this.props.arrowWidth} /* controls width of arrow */
                          arrowHeight={this.props.arrowHeight} /* controls height of arrow */

                          /* Line offset props, used by angle and arc */
                          position={this.props.position} /* controls angle of offset */
                          offset={offset} /* controls length of offset line */
                          curveDirection={this.props.curveDirection} /* controls left / right
                                                                        line path with reference
                                                                        to line center*/

                          /* Navigation props */
                          name={navTo} /* returned value for _onSelection change - all */
                          onSelectionChange={this._clicked} /* callback function to
                                                               control what happens if the
                                                               element is clicked */
                          invisible={true} /* Internal prop for hiding this line */ />
                </g>
                <g>
                    {this.renderEndpoints()}
                </g>
            </g>
        );
    }
});
//        const labelClassed = "circuit-label";
// let labelX = (this.props.x1 + this.props.x2) / 2;
//       let labelY = (this.props.y1 + this.props.y2) / 2;
// let label2Y = (this.props.y1 + this.props.y2) / 2;
        /*
        let textAnchor = "middle";

        let labelLine1 = this.props.label1 || "";
        let labelLine2 = this.props.label2 || "";

        const label = labelLine1 + " " + labelLine2;

        switch (this.props.labelPosition) {
            case "top":
                if (this.props.lineShape === "angled") {
                    yOffset += Math.abs(this.props.y1 - this.props.y2) / 2;
                }
                label1Y -= yOffset + fontOffset;
                label2Y -= yOffset;
                break;

            case "bottom":
                if (this.props.lineShape === "angled") {
                    yOffset += Math.abs(this.props.y1 - this.props.y2) / 2;
                }
                if (!this.props.label1) {
                  labelLine1 = labelLine2;
                  labelLine2 = "";
                }
                label1Y += yOffset + fontOffset;
                label2Y += yOffset + (2 * fontOffset);
                break;

            case "topleft":
                labelX = this.props.x1 + xOffset;
                label1Y = this.props.y1 - yOffset - fontOffset;
                label2Y = this.props.y1 - yOffset;
                textAnchor = "start";
                break;

            case "topright":
                labelX = this.props.x2 - xOffset;
                label1Y = this.props.y2 - yOffset - fontOffset;
                label2Y = this.props.y2 - yOffset;
                textAnchor = "end";
                break;

            case "bottomleft":
                labelX = this.props.x1 + xOffset;
                if (!this.props.label1) {
                  labelLine1 = labelLine2;
                  labelLine2 = "";
                }
                label1Y = this.props.y1 + yOffset + fontOffset;
                label2Y = this.props.y1 + yOffset + (2 * fontOffset);
                textAnchor = "start";
                break;

            case "bottomright":
                labelX = this.props.x2 - xOffset;
                if (!this.props.label1) {
                  labelLine1 = labelLine2;
                  labelLine2 = "";
                }
                label1Y = this.props.y1 + yOffset + fontOffset;
                label2Y = this.props.y1 + yOffset + (2 * fontOffset);
                textAnchor = "end";
                break;

            default:
                break;
        }
        */
/*
                <g>
                    <Label x1={this.props.x1}
                           y1={this.props.y1}
                           x2={this.props.x2}
                           y2={this.props.y2}
                           r={position}
                           style={this.props.style.label[styleModifier]}
                           label={this.props.label}
                           xOffset={this.props.xOffset}
                           yOffset={this.props.yOffset}
                           labelPosition={this.props.labelPosition} />
                </g>

/*

<text textAnchor={textAnchor}
                          style={this.props.style.label[styleModifier]}
                          key="endpoint-label"
                          className={labelClassed}>
                          <tspan x={labelX} y={label1Y}>
                              {labelLine1}
                          </tspan>
                          <tspan x={labelX} y={label2Y}>
                              {labelLine2}
                          </tspan>
                    </text>

*/
// Turn Multi-lined labels into an array
