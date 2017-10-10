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
import Equipment from "./equipment-base"; //17.52(w) 25.39(d) 24.49(h)

/* An equipment is an svg rect that needs to know its width, height, and style.
It receives its x and y starting position from the parent rack element, or a
default derived from a specified offset value.

It takes a label as well in the form of a string or list of strings if multilines are desired,
*/

export default React.createClass({
    getInitialState() {
        return { highlighted: false };
    },

    getDefaultProps() {
        return {
            noNavigate: false,
            labelPosition: "top",
            classed: "equipment",
            selected: false,
            muted: false
        };
    },

    /**
     * User hovers over the equipment
     */
    handleMouseOver() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: true });
        }
    },

    /**
     * Use stops hovering over equipment
     */
    handleMouseOut() {
        if (!this.props.noNavigate) {
            this.setState({ highlighted: false });
        }
    },

    handleSelectionChanged(e, value) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    },

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
                    <Equipment
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
                        textAnchor={this.props.textAnchor}
                        labelPosition={this.props.labelPosition}
                        labelStyle={this.props.style.label}
                        label={this.props.label}
                        labelOffsetX={this.props.labelOffsetX}
                        labelOffsetY={this.props.labelOffsetY}
                        showHeight={this.props.showHeight}
                        name={navTo}
                    />
                </g>
                <g onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <Equipment
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
                        textAnchor={this.props.textAnchor}
                        labelPosition={this.props.labelPosition}
                        labelStyle={this.props.style.label}
                        label={this.props.label}
                        labelOffsetX={this.props.labelOffsetX}
                        labelOffsetY={this.props.labelOffsetY}
                        name={navTo}
                        onSelectionChange={this.handleSelectionChanged}
                        showHeight={this.props.showHeight}
                        invisible={true}
                    />
                </g>
            </g>
        );
    }
});
