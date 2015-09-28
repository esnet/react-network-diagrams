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
 * A component to draw a directional arrow to navigate between circuits
 */

"use strict";

import React from "react";
import _ from "underscore";
import util from "util";

import Constants from "./constants.js";

let {Directions} = Constants;

// These are nominal sizes for the circuit
let CIRCUIT_WIDTH = 851;
let CIRCUIT_HEIGHT = 200;

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
export default React.createClass({

    getInitialState() {
        return { "hover": false };
    },

    getDefaultProps() {
        return {
            direction: Directions.SOUTH,
            margin: 50,
            width: CIRCUIT_WIDTH,
            height: CIRCUIT_HEIGHT,
            xpos: CIRCUIT_WIDTH / 2,
            ypos: CIRCUIT_HEIGHT - 25

        };
    },

    /**
     * User hovers over the navigational arrow
     */
    _mouseOver() {
        this.setState({"hover": true});
    },

    /**
     * Use stops hovering over navigational arrow
     */
    _mouseOut() {
        this.setState({"hover": false});
    },

    _click() {
        if (this.props.id) {
            Backbone.history.navigate("circuit/view/" + this.props.id, {trigger: true});
        }
    },

    render() {
        let dx = 5;
        let dy = 10;
        let x = this.props.xpos;
        let y = this.props.ypos;

        // Points for the svg path
        let pts = [];

        let yflip;
        if (this.props.direction === Directions.NORTH) {
            yflip = 1;
        } else if (this.props.direction === Directions.SOUTH) {
            yflip = -1;
        }

        // Arrow points
        pts.push(util.format("%d,%d", x, y));
        pts.push(util.format("%d,%d", x + dx, y + yflip * dy));
        pts.push(util.format("%d,%d", x - dx, y + yflip * dy));
        pts.push(util.format("%d,%d", x, y));
        let points = pts.join(" ");

        // Classes
        let ClassSet = React.addons.classSet;
        let classes = ClassSet({
            "esdb-circuit-navigation": true,
            "hover": this.props.selected ? false : this.state.hover
        });

        // Hit area
        let hitRect;
        if (this.props.direction === Directions.NORTH) {
            hitRect = (
                <rect className="esdb-circuit-hitrect"
                      x={x - dx * 2} y={y - dy / 2}
                      width={dx * 4} height={dy * 2}
                      onMouseOver={this._mouseOver}
                      onMouseOut={this._mouseOut}
                      onClick={this._click}/>
            );
        } else if (this.props.direction === Directions.SOUTH) {
            hitRect = (
                <rect className="esdb-circuit-hitrect"
                      x={x - dx * 2} y={y - dy / 2 * 3}
                      width={dx * 4} height={dy * 2}
                      onMouseOver={this._mouseOver}
                      onMouseOut={this._mouseOut}
                      onClick={this._click}/>
            );
        }

        if (this.props.id) {
            return (
                <g key="navigation-group">
                    <polyline points={points}
                              className={classes}
                              />
                    {hitRect}

                </g>
            );
        } else {
            return null;
        }
    }
});
