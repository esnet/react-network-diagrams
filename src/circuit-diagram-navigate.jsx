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
// import _ from "underscore";

import Constants from "./constants.js";

const {Directions} = Constants;

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
export default React.createClass({

    getInitialState() {
        return {hover: false };
    },

    getDefaultProps() {
        return {
            direction: Directions.SOUTH,
            margin: 50,
            width: 851,
            height: 200,
        };
    },

    /**
     * User hovers over the navigational arrow
     */
    _mouseOver() {
        this.setState({hover: true});
    },

    /**
     * User stops hovering over navigational arrow
     */
    _mouseOut() {
        this.setState({hover: false});
    },

    _click() {
        if (this.props.id) {
            this.props.onSelectionChange(this.props.direction, this.props.id);
        }
    },

    render() {
        const x = this.props.xpos >= 0 ? this.props.xpos : this.props.width / 2;
        const y = this.props.ypos >= 0 ? this.props.ypos : this.props.height - 25;
        const dx = 5;
        const dy = 10;

        let yflip;
        if (this.props.direction === Directions.NORTH) {
            yflip = 1;
        } else if (this.props.direction === Directions.SOUTH) {
            yflip = -1;
        }

        // Arrow points
        let path = "";
        path += "M" + x + "," + y;
        path += " L " + (x + dx) + "," + (y + yflip * dy);
        path += " L " + (x - dx) + "," + (y + yflip * dy);
        path += " L " + x + "," + y;

        const style = {
            normal: {
                fill: "#4EC1E0",
                opacity: 0.65,
            },
            highlighted: {
                cursor: "pointer",
                fill: "#4EC1E0",
                opacity: 0.95,
            },
        };

        const hitStyle = {
            cursor: "pointer",
            fillOpacity: 0,
        };

        let navStyle = style.normal;

        if (this.state.hover) {
            navStyle = style.highlighted;
        }

        // Hit area
        let hitRect;
        if (this.props.direction === Directions.NORTH) {
            hitRect = (
                <rect className="circuit-hitrect"
                      style={hitStyle}
                      x={x - dx * 2} y={y - dy / 2}
                      width={dx * 4} height={dy * 2}
                      onMouseOver={this._mouseOver}
                      onMouseOut={this._mouseOut}
                      onClick={this._click}/>
            );
        } else if (this.props.direction === Directions.SOUTH) {
            hitRect = (
                <rect className="circuit-hitrect"
                      style={hitStyle}
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
                    <path d={path}
                          className="circuit-navigate"
                          style={navStyle} />
                    {hitRect}
                </g>
            );
        } else {
            return null;
        }
    }
});
