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

import { Node } from "./Node";
import { Label } from "./Label";

export class PowerNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: false
        };
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * User hovers over the power node
     */
    handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    }

    /**
     * Use stops hovering over power node
     */
    handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    }

    handleClick(e) {
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange("power Node", this.props.name);
        }
        e.stopPropagation();
    }

    drawLabel(x, y, label, position, offset) {
        let cy = y;
        if (offset) {
            cy = y + 20;
        }
        const labelClassed = "power-node-label";
        const labelElement = (
            <Label
                key="power-node-label"
                x={x}
                y={cy}
                classed={labelClassed}
                style={this.props.labelStyle.normal}
                label={label}
                labelPosition={position}
            />
        );
        return labelElement;
    }

    render() {
        const { powerNode } = this.props;
        let muted = false;
        if (powerNode.equipment.length === 0 && !this.props.selected) {
            muted = true;
        }
        return (
            <g
                key={`powerNode-${powerNode.label}`}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onClick={this.handleClick}
            >
                <Node
                    x={powerNode.x}
                    y={powerNode.y}
                    style={powerNode.style.node}
                    radius={this.props.radius}
                    shape={"circle"}
                    label={powerNode.label}
                    labelPosition={"right"}
                    labelStyle={this.props.labelStyle}
                    highlighted={this.state.highlighted}
                    selected={this.props.selected}
                    muted={muted}
                />
                {this.drawLabel(powerNode.x, powerNode.y, `${powerNode.type}`, "center")}
            </g>
        );
    }
}

PowerNode.propTypes = {
    radius: PropTypes.number
};

PowerNode.defaultProps = {
    radius: 15
};
