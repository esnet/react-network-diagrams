"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Endpoint drawing primative. This essentially renders the shape we use to represent
 * for an endpoint on the circuit diagrams. The result is a `<g>` element containing
 * the endpoint rendering, so this needs to be used within the context of an `<svg>` block, or
 * more likely, just use a `<Circuit>`.
 *
 * The `x` and `y` props determine the position of the endpoint on the svg grid, while
 * 'labelPosition' determines where the label for the endpoint will be positioned around
 * the endpoint. The `offset` property allow you to customize the distance the label has
 * from the endpoint's `x` and `y` as the initial position of the label is determined
 * based on these props. The `offset` property has no effect on the angled labels, as
 * these require pre-determined offset distances based on the rotation. The `label` prop
 * is the name that will be displayed on the endpoint.
 */
/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

exports.default = (0, _createReactClass2.default)({

    displayName: "Endpoint",

    getDefaultProps: function getDefaultProps() {
        return {
            radius: 7,
            shape: "circle",
            offset: 0,
            labelPosition: "top",
            muted: false,
            selected: false,
            highlighted: false
        };
    },


    propTypes: {

        /** The label for the endpoint */
        label: _propTypes2.default.string,

        /**
         * Where the label is positioned relative to the endpoint node as well
         * as how the label is drawn (angled or not).
         */
        labelPosition: _propTypes2.default.oneOf(["left", "right", "top", "topright", "topleft", "bottom", "bottomright", "bottomleft", "bottomleftangled", "bottomrightangled", "topleftangled", "toprightangled"]),

        /** An offset to the position of the label which can be used for fine tuning */
        offset: _propTypes2.default.number,

        /** The shape of the endpoint */
        shape: _propTypes2.default.oneOf(["circle", "square", "cloud"]),

        /** When the endpoint shape is a `circle`, this controls the size of the endpoint */
        radius: _propTypes2.default.number,

        /** When the endpoint shape is a `square`, this controls the radius of corners */
        roundedX: _propTypes2.default.number,

        /** When the endpoint shape is a `square`, this controls the radius of corners */
        roundedY: _propTypes2.default.number,

        /**
         * The style of the `<Endpoint>` has two components, one for the
         * endpoint itself (node) and one for the label (the label). Each group
         * has three different possible options depending on the way the
         * endpoint should be rendered:
         *
         *  * `normal` provides the standard view of the endpoint
         *  * `selected` for when the endpoint is moused over
         *  * `muted` for when the endpoint is not selected.
         *
         * For example:
         *
         * ```
         * const endpointStyle = {
         *     node: {
         *         normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
         *         selected: {fill: "none", stroke: "#B1B1B1", strokeWidth: 6},
         *         muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2, opacity: 0.6, cursor: "pointer"}
         *     },
         *     label: {
         *         normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
         *         selected: {fill: "#333",stroke: "none", fontSize: 11},
         *         muted: {fill: "#696969", stroke: "none", fontSize: 9, opacity: 0.6}
         *     }
         * }
         * ```
         */
        style: _propTypes2.default.object,

        /** Display the endpoint muted */
        muted: _propTypes2.default.bool,

        /** Display the endpoint as selected */
        selected: _propTypes2.default.bool,

        /** Display the endpoint highlighted  */
        highlighted: _propTypes2.default.bool
    },

    render: function render() {
        return _react2.default.createElement(
            "g",
            null,
            _react2.default.createElement(_Node2.default, {
                x: this.props.x,
                y: this.props.y,
                key: this.props.label,
                style: this.props.style.node,
                labelStyle: this.props.style.label,
                labelPosition: this.props.labelPosition,
                label: this.props.label,
                radius: this.props.radius,
                rx: this.props.roundedX,
                ry: this.props.roundedY,
                offset: this.props.offset,
                shape: this.props.shape,
                muted: this.props.muted,
                selected: this.props.selected,
                highlighted: this.props.highlighted })
        );
    }
});