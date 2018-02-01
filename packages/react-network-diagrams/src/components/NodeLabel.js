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

export class NodeLabel extends React.Component {
    render() {
        let textAnchor;
        switch (this.props.labelPosition) {
            case "left":
                textAnchor = "end";
                break;
            case "top":
            case "bottom":
                textAnchor = "middle";
                break;
            default:
                textAnchor = "start";
        }

        return (
            <text
                x={this.props.x}
                y={this.props.y}
                label={this.props.label}
                textAnchor={textAnchor}
                className={"map-label"}
            >
                {this.props.label}
            </text>
        );
    }
}
