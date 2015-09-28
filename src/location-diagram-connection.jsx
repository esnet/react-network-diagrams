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
import util from "util";
import classnames from "classnames";
import "../examples/styles/circuit.css";

let PANEL_WIDTH = 851;


export default React.createClass({

    getInitialState() {
        return { hover: false };
    },

    getDefaultProps() {
        return {
            width: PANEL_WIDTH,
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
            this.setState({hover: true});
        }
    },

    /**
     * Use stops hovering over circuit
     */
    _mouseOut() {
        if (!this.props.noNavigate) {
            this.setState({hover: false});
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

    renderLabel(label, x, y) {
        let yOffset = y - 10;
        return (
            <text className="esdb-circuit-label" key="endpoint-label" x={x} y={yOffset}>
                {label}
            </text>
        );
    },

    renderEndpoints(x, y) {
        let ClassSet = classnames;
        let c = ClassSet({
            "esdb-circuit-dot": true,
            hover: this.state.hover,
            placeholder: this.props.placeholder
        });

        return (
            <g>
                <circle className={c} key="line-begin"
                    cx={x} cy={y} r={this.props.endPointRadius}/>
            </g>
        );
    },

    renderLine(type, b, e, dx, dy, y) {
        let typeClass;

        // Mapping circuit_type ids to classes
        if (type === 1) {
            typeClass = "esnet-optical";
        } else if (type === 2) {
            typeClass = "leased-circuit";
        } else if (type === 3) {
            typeClass = "dark-fiber";
        } else if (type === 4) {
            typeClass = "equipment-equipment";
        } else if (type === 5) {
            typeClass = "cross-connect";
        }

        // Classes
        let ClassSet = classnames;

        let cc = {"esdb-circuit-edge": true,
                  hover: this.props.placeholder ? false : this.state.hover,
                  placeholder: this.props.placeholder };
        if (typeClass) {
            cc[typeClass] = true;
        }

        let edge = ClassSet(cc);
        let hit = ClassSet({
            "esdb-circuit-hitstroke": true,
            inactive: this.props.noNavigate
        });

        let pts = [];
        pts.push(util.format("%d,%d", b, y));
        pts.push(util.format("%d,%d", e, y));
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
    },

    render() {
        let type;
        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];
        }
        let dy = this.props.offset * this.props.scale;
        let dx = this.props.scale * 2;
        let begin = this.props.begin;
        let end = this.props.end;
        let y = this.props.yOffset;
        let middle = begin + (end - begin) / 2;

        let label = this.props.circuit ? this.props.circuit["circuit_id"] : "";

        if (this.props.circuit) {
            type = this.props.circuit["circuit_type"];
            return (
                <g>
                    {this.renderLine(type, begin, end, dx, dy, y)}
                    {this.renderEndpoints(this.props.endpointX, y)}
                    {this.renderEndpoints(this.props.endpointX2, y)}
                    {this.renderLabel(label, middle, y)}
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
