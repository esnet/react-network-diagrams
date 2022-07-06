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

import { EquipmentBase } from "./EquipmentBase";

/**
 * An equipment is an svg rect that needs to know its width, height, and style.
 * It receives its x and y starting position from the parent rack element, or a
 * default derived from a specified offset value.
 *
 * It takes a label as well in the form of a string or list of strings if multilines are desired
 */
export class Equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: false,
            noNavigate:
                (this.props.facing === "Front" && this.props.rackFacing === "Back") ||
                (this.props.facing === "Back" && this.props.rackFacing === "Front")
                    ? true
                    : this.props.noNavigate
        };
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    /**
     * User hovers over the equipment
     */
    handleMouseOver() {
        if (!this.state.noNavigate) {
            this.setState({ highlighted: true });
        }
    }

    /**
     * Use stops hovering over equipment
     */
    handleMouseOut() {
        if (!this.state.noNavigate) {
            this.setState({ highlighted: false });
        }
    }

    handleSelectionChanged(e, value) {
        if (!this.state.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    }

    render() {
        const hitStyle = {
            cursor: this.props.noNavigate ? "default" : "pointer",
            stroke: "#FFF",
            strokeWidth: 8
        };

        const navTo = this.props.navTo;

        let width;
        let stroke;
        let fill;
        const backFill = this.props.backStyle.fill;
        const overlapFill = this.props.overlapStyle.fill;

        if (this.state.highlighted && !this.props.selected) {
            width = this.props.style.line.highlighted.strokeWidth;
            stroke = this.props.style.line.highlighted.stroke;
            fill = this.props.style.line.highlighted.fill;
        } else if (this.props.selected) {
            width = this.props.style.line.selected.strokeWidth;
            stroke = this.props.style.line.selected.stroke;
            fill = this.props.style.line.selected.fill;
        } else {
            width = this.props.style.line.normal.strokeWidth;
            stroke = this.props.style.line.normal.stroke;
            fill = this.props.style.line.normal.fill;
        }

        return (
            <g>
                <g>
                    <EquipmentBase
                        key={"equipment-base"}
                        positionX={this.props.x}
                        positionY={this.props.y}
                        equipmentHeight={this.props.equipmentHeight}
                        equipmentWidth={this.props.equipmentWidth}
                        pxToInch={this.props.pxToInch}
                        classed={this.props.classed}
                        selected={this.props.selected}
                        muted={this.props.muted}
                        color={stroke}
                        width={width}
                        fill={fill}
                        backFill={backFill}
                        textAnchor={this.props.textAnchor}
                        labelPosition={this.props.labelPosition}
                        labelStyle={this.props.style.label}
                        label={this.props.label}
                        labelDirection={this.props.labelDirection}
                        labelOffsetX={this.props.labelOffsetX}
                        labelOffsetY={this.props.labelOffsetY}
                        showHeight={this.props.showHeight}
                        name={navTo}
                        facing={this.props.facing}
                        rackFacing={this.props.rackFacing}
                        usePattern={this.props.usePattern}
                        overlapping={this.props.overlapping}
                        overlapFill={overlapFill}
                    />
                </g>
                <g onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <EquipmentBase
                        key={"equipment-base-hit"}
                        positionX={this.props.x}
                        positionY={this.props.y}
                        equipmentHeight={this.props.equipmentHeight}
                        equipmentWidth={this.props.equipmentWidth}
                        pxToInch={this.props.pxToInch}
                        classed={this.props.classed}
                        selected={this.props.selected}
                        muted={this.props.muted}
                        color={hitStyle.stroke}
                        width={hitStyle.strokeWidth}
                        fill={fill}
                        backFill={backFill}
                        textAnchor={this.props.textAnchor}
                        labelPosition={this.props.labelPosition}
                        labelStyle={this.props.style.label}
                        label={this.props.label}
                        labelDirection={this.props.labelDirection}
                        labelOffsetX={this.props.labelOffsetX}
                        labelOffsetY={this.props.labelOffsetY}
                        name={navTo}
                        onSelectionChange={(e, value) => this.handleSelectionChanged(e, value)}
                        showHeight={this.props.showHeight}
                        invisible={true}
                        facing={this.props.facing}
                        rackFacing={this.props.rackFacing}
                        usePattern={this.props.usePattern}
                        overlapping={this.props.overlapping}
                        overlapFill={overlapFill}
                    />
                </g>
            </g>
        );
    }
}

Equipment.propTypes = {
    noNavigate: PropTypes.bool,

    labelPosition: PropTypes.string,

    classed: PropTypes.string,

    labelDirection: PropTypes.string,

    selected: PropTypes.bool,

    muted: PropTypes.bool
};

Equipment.defaultProps = {
    noNavigate: false,
    labelPosition: "top",
    classed: "equipment",
    labelDirection: "horizontal",
    selected: false,
    muted: false
};
