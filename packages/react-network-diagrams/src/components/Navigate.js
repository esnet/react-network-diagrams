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

import { Directions } from "../js/constants";

/**
 * Draws a navigation triangle used to navigate back up to the parent. This is
 * probably overblown at this point. This is only really used now to navigate
 * back up to the parent circuit, but could be expanded if we want more
 * complicated navigation in the future.
 */
export class Navigate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    /**
     * User hovers over the navigational arrow
     */
    handleMouseOver() {
        this.setState({ hover: true });
    }

    /**
     * User stops hovering over navigational arrow
     */
    handleMouseOut() {
        this.setState({ hover: false });
    }

    handleMouseClick() {
        if (this.props.id) {
            this.props.onSelectionChange(this.props.direction, this.props.id);
        }
    }

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
                opacity: 0.65
            },
            highlighted: {
                cursor: "pointer",
                fill: "#4EC1E0",
                opacity: 0.95
            }
        };

        const hitStyle = {
            cursor: "pointer",
            fillOpacity: 0
        };

        let navStyle = style.normal;

        if (this.state.hover) {
            navStyle = style.highlighted;
        }

        // Hit area
        let hitRect;
        if (this.props.direction === Directions.NORTH) {
            hitRect = (
                <rect
                    className="circuit-hitrect"
                    style={hitStyle}
                    x={x - dx * 2}
                    y={y - dy / 2}
                    width={dx * 4}
                    height={dy * 2}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    onClick={this.handleMouseClick}
                />
            );
        } else if (this.props.direction === Directions.SOUTH) {
            hitRect = (
                <rect
                    className="circuit-hitrect"
                    style={hitStyle}
                    x={x - dx * 2}
                    y={y - dy / 2 * 3}
                    width={dx * 4}
                    height={dy * 2}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                    onClick={this.handleMouseClick}
                />
            );
        }

        if (this.props.id) {
            return (
                <g key="navigation-group">
                    <path d={path} className="circuit-navigate" style={navStyle} />
                    {hitRect}
                </g>
            );
        } else {
            return null;
        }
    }
}

Navigate.propTypes = {
    navTo: PropTypes.oneOfType([
        // Value passed down to the click
        PropTypes.string, // handler at the lowest level primitive.
        PropTypes.number // Will return to the onSelectionChange
    ]),
    direction: PropTypes.oneOf([
        // Should the navigation go at the top or
        Directions.NORTH, // bottom of the container
        Directions.SOUTH
    ]),
    margin: PropTypes.number, // How far to inset the navigation
    width: PropTypes.number, // Height and width of the container to
    height: PropTypes.number, // guide positioning of the navigation
    onSelectionChange: PropTypes.func // Callback for when the navigation is pressed
};

Navigate.defaultProps = {
    direction: Directions.SOUTH,
    margin: 50,
    width: 851,
    height: 200
};
