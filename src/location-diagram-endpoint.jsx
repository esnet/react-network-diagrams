/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

"use strict";

import React from "react";
import classnames from "classnames";
import "../examples/styles/circuit.css";


const PANEL_WIDTH = 851;

export default React.createClass({

    getDefaultProps() {
        return {
            margin: 50,
            radius: 7,
            width: PANEL_WIDTH,
            labelOffsetY: 20
        };
    },

    render() {
        const x = this.props.begin; // * this.props.width;
        const y = this.props.yOffset;
        const transform = "translate(" + x + " " + y + ")";
        const ClassSet = classnames;
        const c = ClassSet({
            "esdb-circuit-endpoint": true,
        });

        const label = this.props.label || "";
        if (this.props.circuit) {
            return (
                <g key="endpoint-group" transform={transform}>
                    <circle className={c} key="endpoint-circle"
                            cx={0} cy={0} r={this.props.radius} />
                    <text className="esdb-circuit-label"
                          key="endpoint-label"
                          x={0}
                          y={this.props.labelOffsetY}>
                        {label}
                    </text>
                </g>
            );
        } else {
            return (
                <g>
                </g>
            );
        }
    }
});
