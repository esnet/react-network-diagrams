/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Endpoint from "./node";

/**
 * Endpoint drawing primative. This essentially renders
 * the shape we use to represent and endpoint on the circuit diagrams.
 * The result is a <g> element containing the endpoint rendering, so this needs
 * to be used within the context of an <svg> block.
 */
export default React.createClass({

    getDefaultProps() {
        return {
            radius: 7,
            shape: "circle",
            offset: 0,
            muted: false,
            selected: false,
            highlighted: false
        };
    },

    render() {
        return (
            <g>
                <Endpoint
                    x={this.props.x}
                    y={this.props.y}
                    key={this.props.label}
                    style={this.props.style.node}
                    labelStyle={this.props.style.label}
                    labelPosition={this.props.labelPosition}
                    label={this.props.label}
                    radius={this.props.radius}
                    rx={this.props.roundedX}
                    ry={this.props.roundedY}
                    offset={this.props.offset}
                    shape={this.props.shape}
                    muted={this.props.muted}
                    selected={this.props.selected}
                    highlighted={this.props.highlighted} />
            </g>
        );
    }
});
