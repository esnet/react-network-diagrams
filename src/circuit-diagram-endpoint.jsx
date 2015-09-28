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
 * A module containing a the endpoint drawing primative. This essentially renders
 * the shape we use to represent and endpoint on the circuit diagrams.
 * The result is a <g> element containing the endpoint rendering, so this needs
 * to be used within the context of an <svg> block.
 *
 * @module CircuitEndpoint
 */

import React from "react";
import classnames from "classnames";

import "../examples/styles/circuit.css";
// These are nominal sizes for the circuit
let CIRCUIT_WIDTH = 851;
let CIRCUIT_HEIGHT = 200;

/**
 *
 * @class
 *
 * Renders the shape we use to represent an endpoint.
 *
 * **Props**
 *
 * * position - Where to place the endpoint defined on a 0 to 1 scale
 * * label    - The label to attach to the endpoint
 *
 * **State**
 * * none
 */
export default React.createClass({

    getDefaultProps() {
        return {
            margin: 50,
            radius: 7,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            labelOffsetX: -25
        };
    },

    render() {
        let x = this.props.position; // * this.props.width;
        let transform = "translate(" + x + " " + 0 + ")";
        let rotate = "rotate(" + -40 + " " + 30 + "," + -25 + ")";
        let ClassSet = classnames;
        let c = ClassSet({
            "esdb-circuit-endpoint": true,
        });

        return (
            <g key="endpoint-group" transform={transform}>
                <circle className={c} key="endpoint-circle"
                        cx={0} cy={0} r={this.props.radius} />
                <text className="esdb-endpoint-label" key="endpoint-label" x={this.props.labelOffsetX} y={0} transform={rotate}>
                    {this.props.label}
                </text>
            </g>
        );
    }
});
