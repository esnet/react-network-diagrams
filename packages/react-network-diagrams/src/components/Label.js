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

/**
 * Gets an x, y, labelPosition, textAnchor and rotation and
 * renders a label based on the position.
 * The label can be a single string, or an array of strings
 * to display on multiple lines.
 */
export class Label extends React.Component {
    render() {
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

        if (this.props.labelPosition === "top" || this.props.labelPosition === "center") {
            label.reverse();
        }

        let x;
        let y;
        let centerY;

        if (this.props.labelPosition === "center") {
            centerY = labelY + label.length / 2 * fontOffset;
        }

        _.each(label, (line, lineIndex) => {
            x = labelX + xOffset;
            switch (this.props.labelPosition) {
                case "top":
                    y = labelY - yOffset - lineIndex * fontOffset;
                    break;

                case "bottom":
                    y = labelY + yOffset + fontOffset + lineIndex * fontOffset;
                    break;

                case "center":
                    y = centerY - yOffset - lineIndex * fontOffset;
                    break;
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
                <text
                    textAnchor={textAnchor}
                    style={this.props.style}
                    key="connection-label"
                    transform={rotate}
                    className={this.props.labelClassed}
                >
                    {elements}
                </text>
            </g>
        );
    }
}

Label.propTypes = {
    r: PropTypes.number,

    /**
     * Horizontal distance from the center line to offset the connection label.
     */
    xOffset: PropTypes.number,

    /**
     * Vertical distance from the center line to offset the connection label.
     */
    yOffset: PropTypes.number
};

Label.defaultProps = {
    r: 0,
    xOffset: 0,
    yOffset: 0
};
