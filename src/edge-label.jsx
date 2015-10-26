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
 * Gets an x, y, labelPosition, textAnchor anf rotation 
 * renders a label based on the position.
 * The label can be a single string, or an array of strings
 * to display on multiple lines.
 */

"use strict";

import React from "react";
import _ from "underscore";
// labelPosition: "top",
export default React.createClass({

    getDefaultProps() {
        return {
            r: 0,
            xOffset: 0,
            yOffset: 0,
        };
    },

    render() {
        console.log("edge-label",this.props);
        let label = [];
        if (!_.isArray(this.props.label)) {
            label.push(this.props.label);
        } else {
            label = _.clone(this.props.label);
        }

        const elements = [];

        const labelX = this.props.x;
        const labelY = this.props.y;
        const labelR = this.props.r;
        const textAnchor = this.props.textAnchor ? this.props.textAnchor : "middle";

        const rotate = `rotate(${labelR} ${labelX}, ${labelY})`;

        const fontOffset = this.props.style.fontSize ? this.props.style.fontSize : 10;
        const yOffset = this.props.yOffset;
        const xOffset = this.props.xOffset;

        if (this.props.labelPosition === "top" ||
            // this.props.labelPosition === "topright" ||
            // this.props.labelPosition === "topleft" ||
            this.props.labelPosition === "center") {
            label.reverse();
        }

        let x;
        let y;
        let centerY;

        if (this.props.labelPosition === "center") {
            centerY = labelY + ((label.length / 2) * fontOffset);
        }

        // centerY = labelY - ((label.length / 2) * fontOffset);
        /* else if (this.props.labelPosition === "top") {
            centerY = labelY - yOffset - (label.length * fontOffset);
        } else if (this.props.labelPosition === "topright") {
            centerY = this.props.y2 - yOffset - (label.length * fontOffset);
        } else if (this.props.labelPosition === "topleft") {
            centerY = this.props.y1 - yOffset - (label.length * fontOffset);
        }
        */

        _.each(label, (line, lineIndex) => {
            switch (this.props.labelPosition) {
                case "top":
                    y = labelY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    break;

                case "bottom":
                    y = labelY + yOffset + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    break;

                case "center":
                    y = centerY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    break;
                /*
                case "topright":
                    y = labelY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX - xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "end";
                    break;

                case "topleft":
                    y = labelY - yOffset - (lineIndex * fontOffset);
                    // y = centerY + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "start";
                    break;

                case "bottomright":
                    y = labelY + yOffset + fontOffset + (lineIndex * fontOffset);
                    x = labelX - xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    console.log(x,y,rotate);
                    //textAnchor = "end";
                    break;

                case "bottomleft":
                    y = labelY + yOffset + fontOffset + (lineIndex * fontOffset);
                    x = labelX + xOffset;
                    rotate = `rotate(${labelR} ${x}, ${y})`;
                    //textAnchor = "start";
                    break;
                */
                default:
                    break;
            }
            elements.push(
                <tspan x={x} y={y} key={"label-line-" + lineIndex}>
                    {line}
                </tspan>
            );
        });

        return (
            <g>
                <text textAnchor={textAnchor}
                      style={this.props.style}
                      key="connection-label"
                      transform={rotate}
                      className={this.props.labelClassed}>
                      {elements}
                </text>
            </g>
        );
    }
});
