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
import _ from "underscore";
import { Equipment } from "react-network-diagrams-hso";

import { stylesMap } from "../../styles/styles";

import equipment_docs from "./equipment_docs.md";
import equipment_thumbnail from "./equipment_thumbnail.png";

const pixelToInchSizeList = [5, 10, 15, 20];
const equipmentWidthList = [17.52, 21.25];
const equipmentHeightList = [1.75, 3.5, 7, 14, 24.5];
const labelPositionChoiceList = ["top", "bottom", "center"];
const textAnchorList = ["middle", "begin", "end"];
const noNavigateList = ["Yes", "No"];
const showOverlapList = ["Yes", "No"];
const styleModifierList = ["normal", "selected", "muted"];
const positionList = [-90, -45, -30, -20, -15, -10, -3, -1, 0, 1, 3, 10, 15, 20, 30, 45, 90];
const styleList = ["Style 1", "Style 2", "Style 3"];

class Selector extends React.Component {
    handleChange(e) {
        const val = e.target.value;
        this.props.handleChange(val);
    }

    render() {
        const options = _.map(this.props.selectionList, option => {
            return (
                <option value={option} key={option}>
                    {option}
                </option>
            );
        });
        return (
            <select
                ref="menu"
                style={{ marginRight: 5 }}
                value={this.props.selected}
                onChange={e => this.handleChange(e)}
            >
                {options}
            </select>
        );
    }
};

class equipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipmentHeight: equipmentHeightList[3],
            equipmentWidth: equipmentWidthList[0],
            pxToInch: pixelToInchSizeList[1],
            labelOffsetX: positionList[8],
            labelOffsetY: positionList[8],
            selectedStyle: false,
            mutedStyle: false,
            noNavigate: false,
            showOverlap: false,
            showHeight: false,
            style: stylesMap.line1,
            styleType: styleList[0],
            styleModifier: styleModifierList[0],
            textAnchor: textAnchorList[0],
            labelPosition: labelPositionChoiceList[0],
            noNavigateChoice: noNavigateList[1],
            showHeightChoice: noNavigateList[1],
            showOverlapChoice: showOverlapList[1]
        };

        this.handleShowOverlapChange = this.handleShowOverlapChange.bind(this);
        this.handleNoNavigateChange = this.handleNoNavigateChange.bind(this);
        this.handleShowHeightChange = this.handleShowHeightChange.bind(this);
        this.handleStyleModChange = this.handleStyleModChange.bind(this);
        this.handleStyleTypeChange = this.handleStyleTypeChange.bind(this);
    }

    handleShowOverlapChange(val) {
        switch (val) {
            case "Yes":
                this.setState({ showOverlap: true });
                break;

            case "No":
                this.setState({ showOverlap: false });
                break;

            default:
                break;
        }
        this.setState({ showOverlapChoice: val });
    }

    handleNoNavigateChange(val) {
        switch (val) {
            case "Yes":
                this.setState({ noNavigate: true });
                break;

            case "No":
                this.setState({ noNavigate: false });
                break;

            default:
                break;
        }
        this.setState({ noNavigateChoice: val });
    }

    handleShowHeightChange(val) {
        switch (val) {
            case "Yes":
                this.setState({ showHeight: true });
                break;

            case "No":
                this.setState({ showHeight: false });
                break;

            default:
                break;
        }
        this.setState({ showHeightChoice: val });
    }

    handleStyleTypeChange(val) {
        switch (val) {
            case "Style 1":
                this.setState({ style: stylesMap.line1 });
                break;

            case "Style 2":
                this.setState({ style: stylesMap.line2 });
                break;

            case "Style 3":
                this.setState({ style: stylesMap.line3 });
                break;

            default:
                break;
        }
        this.setState({ styleType: val });
    }

    handleStyleModChange(val) {
        switch (val) {
            case "normal":
                this.setState({ mutedStyle: false });
                this.setState({ selectedStyle: false });
                break;

            case "muted":
                this.setState({ mutedStyle: true });
                this.setState({ selectedStyle: false });
                break;

            case "selected":
                this.setState({ mutedStyle: false });
                this.setState({ selectedStyle: true });
                break;

            default:
                break;
        }
        this.setState({ styleModifier: val });
    }

    handleSelectionChange(e, val) {
        const message = `You clicked ${e} with name ${val}`;
        window.alert(message);
    }

    renderDefaultPropChoices() {
        return (
            <div>
                <div>
                    <Selector
                        selected={this.state.equipmentWidth}
                        selectionList={equipmentWidthList}
                        handleChange={val => {
                            const equipmentWidth = parseFloat(val);
                            this.setState({ equipmentWidth });
                        }}
                    />
                    <Selector
                        selected={this.state.equipmentHeight}
                        selectionList={equipmentHeightList}
                        handleChange={val => {
                            const equipmentHeight = parseFloat(val);
                            this.setState({ equipmentHeight });
                        }}
                    />
                    <p>Select the width and height of the equipment in inches</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.styleType}
                        selectionList={styleList}
                        handleChange={this.handleStyleTypeChange}
                    />
                    <Selector
                        selected={this.state.styleModifier}
                        selectionList={styleModifierList}
                        handleChange={this.handleStyleModChange}
                    />
                    <p>Select the line style preset and modifier</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.labelPosition}
                        selectionList={labelPositionChoiceList}
                        handleChange={labelPosition => this.setState({ labelPosition })}
                    />
                    <p>Select the "labelPosition" prop</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.textAnchor}
                        selectionList={textAnchorList}
                        handleChange={textAnchor => this.setState({ textAnchor })}
                    />
                    <p>Select the label's "textAnchor" prop</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.labelOffsetX}
                        selectionList={positionList}
                        handleChange={val => {
                            const labelOffsetX = parseInt(val, 10);
                            this.setState({ labelOffsetX });
                        }}
                    />
                    <Selector
                        selected={this.state.labelOffsetY}
                        selectionList={positionList}
                        handleChange={val => {
                            const labelOffsetY = parseInt(val, 10);
                            this.setState({ labelOffsetY });
                        }}
                    />
                    <p>Select the "labelOffsetX" and "labelOffsetY" label offset</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.noNavigateChoice}
                        selectionList={noNavigateList}
                        handleChange={this.handleNoNavigateChange}
                    />
                    <p>Select whether to disable navigation</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.showHeightChoice}
                        selectionList={noNavigateList}
                        handleChange={this.handleShowHeightChange}
                    />
                    <p>Select whether to show height bar</p>
                </div>
                <div>
                    <Selector
                        selected={this.state.showOverlapChoice}
                        selectionList={showOverlapList}
                        handleChange={this.handleShowOverlapChange}
                    />
                    <p>Select whether to show if equipment is overlapping an other in the same rack</p>
                </div>
            </div>
        );
    }

    renderSingleEquipment() {
        const backStyle = { fill: "#ff4d4d" };
        return (
            <svg
                width={this.props.width}
                height={this.props.height}
                style={{ borderStyle: "solid", borderWidth: 1, borderColor: "#ddd" }}
            >
                <g>
                    <Equipment
                        x={150}
                        y={75}
                        equipmentHeight={this.state.equipmentHeight}
                        equipmentWidth={this.state.equipmentWidth}
                        pxToInch={this.state.pxToInch}
                        selected={this.state.selectedStyle}
                        muted={this.state.mutedStyle}
                        style={this.state.style}
                        backStyle={backStyle}
                        textAnchor={this.state.textAnchor}
                        labelPosition={this.state.labelPosition}
                        label={`${this.state.labelPosition}-${this.state.textAnchor}`}
                        labelOffsetX={this.state.labelOffsetX}
                        labelOffsetY={this.state.labelOffsetY}
                        navTo={this.state.labelPosition}
                        showHeight={this.state.showHeight}
                        noNavigate={this.state.noNavigate}
                        onSelectionChange={(e, val) => this.handleSelectionChange(e, val)}
                        overlapStyle={{ fill: "#ff6666" }}
                        overlapping={this.state.showOverlap}
                    />
                </g>
            </svg>
        );
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h4>Equipment Options</h4>
                        {this.renderDefaultPropChoices()}
                    </div>

                    <div className="col-md-8">
                        <h4>Equipment Rendering</h4>
                        {this.renderSingleEquipment()}
                    </div>
                </div>
            </div>
        );
    }
};

equipment.defaultProps = {
    height: 500,
    width: 500
};

// Export example
export default {equipment, equipment_docs, equipment_thumbnail};
