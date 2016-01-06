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

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _circuitDiagramConnection = require("./circuit-diagram-connection");

var _circuitDiagramConnection2 = _interopRequireDefault(_circuitDiagramConnection);

var _circuitDiagramEndpoint = require("./circuit-diagram-endpoint");

var _circuitDiagramEndpoint2 = _interopRequireDefault(_circuitDiagramEndpoint);

var _edgeLabel = require("./edge-label");

var _edgeLabel2 = _interopRequireDefault(_edgeLabel);

exports["default"] = _react2["default"].createClass({
    displayName: "circuit-diagram-patchpanel",

    getInitialState: function getInitialState() {
        return { hover: false };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            width: 851,
            yOffset: 30,
            margin: 150,
            roundedX: 5,
            roundedY: 5,
            couplerEndpointRadius: 10,
            endpointRoundedX: 2,
            endpointRoundedY: 2,
            couplerLabelPosition: "center",
            labelPosition: "top",
            panelRoundedX: 3,
            panelRoundedY: 3,
            labelOffsetX: 0,
            labelOffsetY: 0
        };
    },

    propTypes: {

        /** The width of the circuit diagram */
        width: _react2["default"].PropTypes.number,

        /**
         * To accurately display each panel, modules, and groups of circuits,
         * the Patch Panel requires an array of panels, where each panel contains
         * a panel object.  The panel object has two keys, `panelName` to display
         * the title of the panel, and `modules` which is a two dimensional array
         * of coupler objects.  The rendering is sequential, and will display each
         * panel, with the panels modules and coupler groupings  in the order they
         * are presented in the list.
         *
         * Each module in the two-dimensional `modules` array is an array of
         * coupler groupings objects.  The coupler groupings objects allways have:
         *
         *  * `frontCircuit` - The circuit and its properties to be displayed to
         *  the left of the coupler.  May be left `null`
         *  * `backCircuit` - The circuit and its properties to be displayed to
         *  the right of the coupler.  May be left `null`
         *  * `coupler` - The circuit and its properties to be displayed in the
         *  center
         *
         * Each of these objects have there own style, labels, and navigation
         * controls.  The below structure, will render one panel, with one module,
         * with 2 coupler groups.
         *
         * ```js
         * const panels = [
         *     {
         *         panelName: "Panel 1",
         *         modules: [
         *             [
         *                  {
         *                      frontCircuit: {
         *                          styleProperties: circuitTypeProperties.crossConnect,
         *                          endpointStyle: stylesMap.endpoint,
         *                          endpointLabelA: "Endpoint 1",
         *                          endpointLabelZ: "Endpoint 2",
         *                          circuitLabel: "Member 1",
         *                          navTo: "Member 1",
         *                      },
         *                      coupler: {
         *                          styleProperties: circuitTypeProperties.panelCoupler,
         *                          endpointStyle: circuitTypeProperties.panelCoupler,
         *                          endpointLabelA: "Endpoint 2",
         *                          endpointlabelZ: "Endpoint 3",
         *                          circuitLabel: "1/2-SC",
         *                          navTo: "Coupler 1/2",
         *                      },
         *                      backCircuit: {
         *                          styleProperties: circuitTypeProperties.leased,
         *                          endpointStyle: stylesMap.endpoint,
         *                          endpointLabelA: "Endpoint 3",
         *                          endpointLabelZ: "Endpoint 4",
         *                          circuitLabel: "Member 3",
         *                          navTo: "Member 3",
         *                      },
         *                      frontLabel: "Endpoint A",
         *                      backLabel: "Endpoint Z",
         *                  },
         *                  {
         *                      frontCircuit: null,
         *                      coupler: {
         *                          styleProperties: circuitTypeProperties.panelCoupler,
         *                          endpointStyle: circuitTypeProperties.panelCoupler,
         *                          endpointLabelA: "Endpoint 2",
         *                          endpointlabelZ: "Endpoint 3",
         *                          circuitLabel: "3/4-SC",
         *                          navTo: "Coupler 3/4",
         *                      },
         *                      backCircuit: null,
         *                      frontLabel: "Endpoint A",
         *                      backLabel: "Endpoint Z",
         *                  },
         *              ]
         *          ]
         *      }
         * ];
         * ```
         */
        panels: _react2["default"].PropTypes.array.isRequired,

        /**
         * The style of the panel - this is the "container" for the modules and couplers.
         */
        panelStyle: _react2["default"].PropTypes.object,

        /**
         * The style for the couplers, rendered in groups according to their modules.
         */
        couplerStyle: _react2["default"].PropTypes.object,

        /**
         * This is the vertical distance from the center line to offset the connection label
         */
        yOffset: _react2["default"].PropTypes.number,

        /**
         * This is the vertical spacing between each module group
         */
        moduleSpacing: _react2["default"].PropTypes.number,

        /**
         * This is the vertical spacing between each panel
         */
        panelSpacing: _react2["default"].PropTypes.number,

        /**
         * This is the vertical spacing between each coupler
         */
        couplerSpacing: _react2["default"].PropTypes.number,

        /**
         * This is the distance from the center of the \<svg\> grid that the panel
         * is to be rendered
         */
        panelWidth: _react2["default"].PropTypes.number,

        /**
         * Callback evoked when the selection changes
         */
        onSelectionChange: _react2["default"].PropTypes.func,

        /**
         * This is the distance from the endpoint that the endpoint label will be rendered.
         */
        endpointLabelOffset: _react2["default"].PropTypes.number,

        //
        // The following props have default values and are optional for styling:
        //

        /**
         * Controls the corner rounding of the center coupler on the x-axis
         */
        roundedX: _react2["default"].PropTypes.number,

        /**
         * Controls the corner rounding of the center coupler on the y-axis
         */
        roundedY: _react2["default"].PropTypes.number,

        /**
         * Controls the size of the couper line cap
         */
        couplerEndpointRadius: _react2["default"].PropTypes.number,

        /**
         * Controls the corner rounding of the square line-caps on the x-axis
         */
        endpointRoundedX: _react2["default"].PropTypes.number,

        /**
         * Controls the corner rounding of the square line-caps on the y-axis
         */
        endpointRoundedY: _react2["default"].PropTypes.number,

        /**
         * Controls where label is situated in the center coupler
         */
        couplerLabelPosition: _react2["default"].PropTypes.oneOf(["top", "bottom", "center"]),

        /**
         * Controls the corner rounding of the panel on the x-axis
         */
        panelRoundedX: _react2["default"].PropTypes.number,

        /**
         * Controls the corner rounding of the panel on the y-axis
         */
        panelRoundedY: _react2["default"].PropTypes.number,

        /**
         * Controls the +/- x offset from labelPosition
         */
        labelOffsetX: _react2["default"].PropTypes.number,

        /**
         * Controls the +/- y offset from labelPosition
         */
        labelOffsetY: _react2["default"].PropTypes.number
    },

    handleSelectionChange: function handleSelectionChange(e, value) {
        if (!this.props.noNavigate) {
            this.props.onSelectionChange(e, value);
        }
    },

    renderPanelLabel: function renderPanelLabel(yStart, label, key) {
        var y = yStart - this.props.panelSpacing / 2;
        var x = this.props.width / 2;
        var labelStyle = {
            fontSize: 14,
            fontFamily: "verdana, sans-serif",
            fill: "#737373",
            textAnchor: "middle"
        };
        return _react2["default"].createElement(
            "g",
            {
                key: "panel-name-" + key },
            _react2["default"].createElement(_edgeLabel2["default"], {
                x: x,
                y: y,
                label: label,
                labelPosition: "center",
                labelClassed: "panel-name",
                style: labelStyle })
        );
    },

    renderFrontBackLabel: function renderFrontBackLabel(yStart, key) {
        var x = this.props.width / 2;
        var xLeft = x - this.props.width / 9;
        var xRight = x + this.props.width / 9;
        var yDown = yStart;
        var front = "FRONT";
        var back = "BACK";
        var labelStyle = {
            fill: "#9D9D9D",
            fontFamily: "verdana, sans-serif",
            fontSize: 10,
            textAnchor: "middle"
        };
        return _react2["default"].createElement(
            "g",
            {
                key: "panel-frontback-" + key },
            _react2["default"].createElement(
                "text",
                {
                    className: "frontback-label",
                    key: "panel-front-" + key,
                    style: labelStyle,
                    x: xLeft,
                    y: yDown },
                front
            ),
            _react2["default"].createElement(
                "text",
                {
                    className: "frontback-label",
                    key: "panel-back-" + key,
                    style: labelStyle,
                    x: xRight,
                    y: yDown },
                back
            )
        );
    },

    renderPanels: function renderPanels(panelMap) {
        var _this = this;

        var elements = [];
        var panelWidthOffset = this.props.panelWidth;
        var panelStyle = this.props.panelStyle;

        // determine the middle of the svg element
        var midpt = this.props.width / 2;

        // determing the x location and width for the outer panel shape from the panelWidthOffest

        var panelX = midpt - this.props.couplerStyle.squareWidth / 2 - panelWidthOffset;
        var width = this.props.couplerStyle.squareWidth + panelWidthOffset * 2;

        // set the start of the panel at the yOffset from the top
        var panelY = this.props.yOffset;
        _underscore2["default"].each(this.props.panels, function (panel, panelIndex) {
            // draw a panel
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "panel-" + panelIndex },
                _react2["default"].createElement("rect", {
                    className: "panel",
                    width: width,
                    height: panelMap[panel.panelName],
                    style: panelStyle,
                    x: panelX,
                    y: panelY,
                    rx: _this.props.panelRoundedX,
                    ry: _this.props.panelRoundedY })
            ));

            // set the start of the module group at the spacing below the panel start +
            // 1/2 the coupler height.  This will place the y at the middle of the coupler group

            var moduleY = panelY + _this.props.moduleSpacing + _this.props.couplerStyle.size / 2;

            _underscore2["default"].each(panel.modules, function (module) {
                // draw all the circuit groups in a module

                elements.push(_this.renderModule(module, moduleY));
                // after each module is finished, space the next module start at the middle
                // of the first coupler group, offset by the module spacing
                moduleY += _this.props.moduleSpacing + module.length * _this.props.couplerStyle.size + (module.length - 1) * _this.props.couplerSpacing;
            });
            elements.push(_this.renderFrontBackLabel(panelY, panelIndex));
            elements.push(_this.renderPanelLabel(panelY, panel.panelName, panelIndex));

            // once all panel modules are done, start the next module at the next panel
            // using the spacing derived from the svg box height
            panelY += _this.props.panelSpacing + panelMap[panel.panelName];
        });
        return elements;
    },

    renderModule: function renderModule(module, moduleY) {
        var _this2 = this;

        // moduleY is y1, y2 of the first circuitGroup in the module

        var elements = [];
        var y = moduleY;

        // draw each circuit group in the module
        _underscore2["default"].each(module, function (circuitGroup, groupIndex) {
            // draw the endpoints
            elements.push(_this2.renderEndpoints(circuitGroup, y, groupIndex));
            // draw the lines
            elements.push(_this2.renderConnections(circuitGroup, y, groupIndex));
            y += _this2.props.couplerStyle.size + _this2.props.couplerSpacing;
        });
        return elements;
    },

    /**
     * draws 0, 2, or 4 endpoints - determined by presence of Front, Back and Coupler
     */
    renderEndpoints: function renderEndpoints(circuitGroup, y, key) {
        var elements = [];
        var midpt = this.props.width / 2;
        var circuit = undefined;
        var x1 = undefined;
        var x2 = undefined;

        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 = midpt - circuitGroup.coupler.styleProperties.squareWidth / 2 - this.props.couplerEndpointRadius;
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "endpoint-" + circuit.endpointLabelA + "-" + key },
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: x1,
                    y: y,
                    style: circuit.endpointStyle,
                    labelStyle: circuit.endpointStyle.label,
                    labelPosition: "bottomleftangled",
                    label: circuitGroup.frontLabel })
            ));
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "endpoint-" + circuit.endpointLabelZ + "-" + key },
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: x2,
                    y: y,
                    style: circuit.endpointStyle })
            ));
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 = midpt + circuitGroup.coupler.styleProperties.squareWidth / 2 + this.props.couplerEndpointRadius;
            x2 = this.props.width - this.props.margin;
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "endpoint-" + circuit.endpointLabelA + "-" + key },
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: x1,
                    y: y,
                    style: circuit.endpointStyle })
            ));
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "endpoint-" + circuit.endpointLabelZ + "-" + key },
                _react2["default"].createElement(_circuitDiagramEndpoint2["default"], {
                    x: x2,
                    y: y,
                    style: circuit.endpointStyle,
                    labelStyle: circuit.endpointStyle.label,
                    labelPosition: "bottomrightangled",
                    label: circuitGroup.backLabel })
            ));
        }
        return elements;
    },

    renderConnections: function renderConnections(circuitGroup, y, key) {
        // draws center coupler and either front, back or both circuits

        var elements = [];
        var midpt = this.props.width / 2;
        var circuit = undefined;
        var x1 = undefined;
        var x2 = undefined;
        if (circuitGroup.coupler) {
            circuit = circuitGroup.coupler;
            x1 = midpt - circuit.styleProperties.squareWidth / 2;
            x2 = midpt + circuit.styleProperties.squareWidth / 2;
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "coupler-" + circuit.circuitLabel + "-" + key },
                _react2["default"].createElement(_circuitDiagramConnection2["default"], {
                    x1: x1,
                    x2: x2,
                    y1: y,
                    y2: y,
                    roundedX: this.props.roundedX,
                    roundedY: this.props.roundedY,
                    endPointRoundedX: this.props.endpointRoundedX,
                    endPointRoundedY: this.props.endPointRoundedY,
                    style: circuit.styleProperties.style,
                    lineShape: circuit.styleProperties.lineShape,
                    label: circuit.circuitLabel,
                    labelPosition: this.props.couplerLabelPosition,
                    labelOffsetX: this.props.labelOffsetX,
                    labelOffsetY: this.props.labelOffsetY,
                    radius: this.props.couplerEndpointRadius,
                    endpointShape: "square",
                    size: circuit.styleProperties.size,
                    onSelectionChange: this.handleSelectionChange,
                    noNavigate: circuit.styleProperties.noNavigate,
                    navTo: circuit.navTo })
            ));
        }
        if (circuitGroup.frontCircuit) {
            circuit = circuitGroup.frontCircuit;
            x1 = this.props.margin;
            x2 = midpt - circuitGroup.coupler.styleProperties.squareWidth / 2 - this.props.couplerEndpointRadius;
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "frontCircuit-" + circuit.circuitLabel + "-" + key },
                _react2["default"].createElement(_circuitDiagramConnection2["default"], {
                    x1: x1,
                    x2: x2,
                    y1: y,
                    y2: y,
                    style: circuit.styleProperties.style,
                    lineShape: circuit.styleProperties.lineShape,
                    label: circuit.circuitLabel,
                    labelPosition: this.props.labelPosition,
                    onSelectionChange: this.handleSelectionChange,
                    noNavigate: circuit.styleProperties.noNavigate,
                    navTo: circuit.navTo })
            ));
        }
        if (circuitGroup.backCircuit) {
            circuit = circuitGroup.backCircuit;
            x1 = midpt + circuitGroup.coupler.styleProperties.squareWidth / 2 + this.props.couplerEndpointRadius;
            x2 = this.props.width - this.props.margin;
            elements.push(_react2["default"].createElement(
                "g",
                {
                    key: "backCircuit-" + circuit.circuitLabel + "-" + key },
                _react2["default"].createElement(_circuitDiagramConnection2["default"], {
                    x1: x1,
                    x2: x2,
                    y1: y,
                    y2: y,
                    style: circuit.styleProperties.style,
                    lineShape: circuit.styleProperties.lineShape,
                    label: circuit.circuitLabel,
                    labelPosition: this.props.labelPosition,
                    onSelectionChange: this.handleSelectionChange,
                    noNavigate: circuit.styleProperties.noNavigate,
                    navTo: circuit.navTo })
            ));
        }
        return elements;
    },

    render: function render() {
        var _this3 = this;

        // Styling
        var classed = "panel-container";
        var circuitContainer = {
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderTopColor: "#FFFFFF",
            borderBottomColor: "#EFEFEF"
        };

        var numPanels = 0;
        var viewBoxHeight = 0;
        var yOffset = this.props.yOffset;
        var moduleSpacing = this.props.moduleSpacing;
        var panelSpacing = this.props.panelSpacing;
        var panelMap = {};

        // Calculate the height for each panel and store this in a mapping by panel name
        _underscore2["default"].each(this.props.panels, function (panel) {
            numPanels += 1; // 1
            var moduleCount = panel.modules.length; // 2
            var couplerCount = 0;
            _underscore2["default"].each(panel.modules, function (module) {
                couplerCount += module.length; // 6
            });
            var panelHeight = couplerCount * _this3.props.couplerStyle.size + (couplerCount - moduleCount) * _this3.props.couplerSpacing + (moduleCount + 1) * moduleSpacing;
            viewBoxHeight += panelHeight;
            panelMap[panel.panelName] = panelHeight;
        });

        // dynamic viewBoxHeight
        viewBoxHeight += yOffset * 3 + (numPanels - 1) * panelSpacing;

        // Draw in order - Panel Rectangles, Circuit Endpoints, Circuit Connections
        return _react2["default"].createElement(
            "svg",
            {
                key: "panel-container",
                width: this.props.width,
                height: viewBoxHeight,
                className: classed,
                style: circuitContainer,
                onClick: this._deselect },
            _react2["default"].createElement(
                "svg",
                {
                    key: "panel-box",
                    preserveAspectRatio: "xMinYMin" },
                this.renderPanels(panelMap)
            )
        );
    }
});
module.exports = exports["default"];