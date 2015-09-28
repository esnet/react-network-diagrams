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
import util from "util";
import _ from "underscore";
import classnames from "classnames";

import "../examples/styles/circuit.css";
// These are nominal sizes for the circuit
let CIRCUIT_WIDTH = 851;
let COUPLER_HEIGHT = 36;

/**
 *
 * @class
 *
 * Renders the a connection between two points defined as begin and end.
 * The connection can also be offset from the center line by an amount.
 * The result is a <g> element containing the connection, so this needs
 * to be used within the context of an <svg> block.
 *
 * **Props**
 *
 * * offset   - How far to offset the connection from the center line
 * * begin    - Where to begin the connection, between 0 and CIRCUIT_WIDTH (defauts to 0)
 * * end      - Where to end the connection, between 0 and CIRCUIT_WIDTH ()
 *
 * **State**
 * * none
 */
export default React.createClass({

    displayName: "Connection",

    getInitialState() {
        return { "hover": false };
    },

    getDefaultProps() {
        return {
            width: CIRCUIT_WIDTH,
            offset: 0,
            scale: 25,
            begin: 0,
            end: 651,
            endPointRadius: 2
        };
    },

    /**
     * User hovers over the circuit
     */
    _mouseOver() {
        if (!this.props.noNavigate) {
            this.setState({"hover": true});
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({"hover": false});
        }
    },

    /**
     * User selects the circuit
     */
    _click(e) {
        if (this.props.noNavigate) {
            return;
        }
        if (this.props.navigate) {
            Backbone.history.navigate("circuit/view/" + this.props.navigate, {trigger: true});
        } else if (this.props.circuit.id) {
            Backbone.history.navigate("circuit/view/" + this.props.circuit.id, {trigger: true});
        }
        e.stopPropagation();
    },

    renderLabel(circuit, type, label, x, y) {
        let height;
        if (type === "Panel Coupler") {
            height = y - 20;
            let newLabel = circuit["endpoint_a"]["panel_name"];
            return (
                <text className="esdb-circuit-label" key="endpoint-label" x={x} y={height}>
                    {newLabel}
                </text>
            );
        } else if (type === "Backplane Mate") {
            height = y - 20;
            return (
                <text className="esdb-circuit-label" key="endpoint-label" x={x} y={height}>
                    {label}
                </text>
            );
        } else if (type === "Fiber Splice") {
            height = y - 20;
            let newLabel = "Splice";
            return (
                <text className="esdb-circuit-label" key="endpoint-label" x={x} y={height}>
                    {newLabel}
                </text>
            );
        } else {
            return (
                <text className="esdb-circuit-label" key="endpoint-label" x={x} y={y}>
                    {label}
                </text>
            );
        }
    },

    renderEndpoints(b, e) {
        let ClassSet = classnames;
        let c = ClassSet({
            "esdb-circuit-dot": true,
            "hover": this.state.hover,
            "placeholder": this.props.placeholder
        });

        return (
            <g>
                <circle className={c} key="line-begin"
                    cx={b} cy={0} r={this.props.endPointRadius}/>
                <circle className={c} key="line-end"
                    cx={e} cy={0} r={this.props.endPointRadius}/>
            </g>
        );
    },

    renderLine(type, b, e, dx, dy) {
        let typeClass;

        // Mapping circuit_type ids to classes
        if (type === "Equipment-Equipment") {
            typeClass = "equipment-equipment";
        } else if (type === "ESnet Optical") {
            typeClass = "esnet-optical";
        } else if (type === "Leased Circuit") {
            typeClass = "leased-circuit";
        } else if (type === "Dark Fiber") {
            typeClass = "dark-fiber";
        } else if (type === "Cross-Connect") {
            typeClass = "cross-connect";
        } else if (type === "Panel Coupler") {
            typeClass = "coupler";
        } else if (type === "Backplane Mate") {
            typeClass = "backplane-mate";
        } else if (type === "Fiber Splice") {
            typeClass = "dark-fiber";
        }

        // Classes
        let ClassSet = classnames;

        let cc = {"esdb-circuit-edge": true,
                  "hover": this.props.placeholder ? false : this.state.hover,
                  "placeholder": this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        let coupler = ClassSet(cc);
        let edge = ClassSet(cc);
        let hit = ClassSet({
            "esdb-circuit-hitstroke": true,
            "inactive": this.props.noNavigate
        });

        if (type === "Panel Coupler") {
            let height = COUPLER_HEIGHT;
            let y = -18;
            let rectLength = 25;
            return (
                <g>
                    <rect className={coupler} width={rectLength} x={b} y={y} height={height} rx={5} ry={5}/>
                </g>
            );
        } else if (type === "Backplane Mate") {
            let height = COUPLER_HEIGHT;
            let y = -18;
            let rectLength = 40;
            let rectMiddle = b + 20;
            let vpts = [];
            // b = 0, e = 25, dy = 0, dx = 50, coupler height = 26
            vpts.push(util.format("%d,%d", rectMiddle, -18));
            vpts.push(util.format("%d,%d", rectMiddle, 18));
            let vpoints = vpts.join(" ");
            return (
                <g>
                    <rect className={edge} width={rectLength} x={b} y={y} height={height} rx={5} ry={5}/>
                    <polyline className={edge} key="line-polypath" points={vpoints} />
                    <polyline className={hit} key="line-polypath-hit" points={vpoints}
                              onMouseOver={this._mouseOver}
                              onMouseOut={this._mouseOut}
                              onClick={this._click} />
                </g>

            );
        } else {
            let pts = [];
            pts.push(util.format("%d,%d", b, 0));
            pts.push(util.format("%d,%d", b + dx, -dy));
            pts.push(util.format("%d,%d", e - dx, -dy));
            pts.push(util.format("%d,%d", e, 0));
            let points = pts.join(" ");
            return (
                <g>
                    <polyline className={edge} key="line-polypath" points={points} />
                    <polyline className={hit} key="line-polypath-hit" points={points}
                              onMouseOver={this._mouseOver}
                              onMouseOut={this._mouseOut}
                              onClick={this._click} />
                </g>
            );
        }
    },

    render() {
        let type;
        if (this.props.circuit && this.props.circuitTypes && this.props.couplerTypes && this.props.circuit.circuit_type) {
            if (_.has(this.props.circuitTypes, this.props.circuit["circuit_type"])) {
                type = this.props.circuitTypes[this.props.circuit["circuit_type"]];
            } else if (_.has(this.props.couplerTypes, this.props.circuit["circuit_type"])) {
                type = this.props.couplerTypes[this.props.circuit["circuit_type"]];
            }
        }
        let dy = this.props.offset * this.props.scale;
        let dx = this.props.scale * 2;
        let begin = this.props.begin;
        let end = this.props.end;
        let middle = begin + (end - begin) / 2;

        let label = this.props.circuit ? this.props.circuit["circuit_id"] : "";
        let circuit = this.props.circuit;
        // Build up our svg elements
        return (
            <g key="line-group">
                {this.renderLine(type, begin, end, dx, dy, middle)}
                {this.renderEndpoints(begin, end)}
                {this.renderLabel(circuit, type, label, middle, -dy - 3)}
            </g>
        );
    }
});
