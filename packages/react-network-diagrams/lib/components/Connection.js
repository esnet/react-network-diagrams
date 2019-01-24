"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Connection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Endpoint = require("./Endpoint");

var _SimpleEdge = require("./SimpleEdge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2018, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * The `x1`, `x2`, `y1`, and `y2` properties determine the position of the endpoints on the `<svg>` element.
 * A path is then drawn betwween the endpoints. If the lineShape property is set to "square",
 * the width of the square will be the distance between x1 and x2, with the height of the square
 * determined by the size prop.
 *
 * The `labelPosition`, determines where the label will be positioned around the line. The `xOffset` and
 * `yOffset` properties allow you to customize the distance the label is from the `x` and `y` properties.
 *
 * The `label` property is the name that will be displayed on the line. If you want to display multiple
 * lines, the label can take an array of strings, with each array element displayed on a separate line.
 */
var Connection = exports.Connection = function (_React$Component) {
    _inherits(Connection, _React$Component);

    function Connection(props) {
        _classCallCheck(this, Connection);

        var _this = _possibleConstructorReturn(this, (Connection.__proto__ || Object.getPrototypeOf(Connection)).call(this, props));

        _this.state = {
            highlighted: false
        };
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleSelectionChanged = _this.handleSelectionChanged.bind(_this);
        return _this;
    }

    /**
     * User hovers over the circuit
     */


    _createClass(Connection, [{
        key: "handleMouseOver",
        value: function handleMouseOver() {
            if (!this.props.noNavigate) {
                this.setState({ highlighted: true });
            }
        }

        /**
         * Use stops hovering over circuit
         */

    }, {
        key: "handleMouseOut",
        value: function handleMouseOut() {
            if (!this.props.noNavigate) {
                this.setState({ highlighted: false });
            }
        }
    }, {
        key: "handleSelectionChanged",
        value: function handleSelectionChanged(e, value) {
            if (!this.props.noNavigate) {
                this.props.onSelectionChange(e, value);
            }
        }
    }, {
        key: "renderEndpoints",
        value: function renderEndpoints() {
            if (this.props.arrow) {
                return _react2.default.createElement("g", null);
            } else {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_Endpoint.Endpoint, {
                        x: this.props.x1,
                        y: this.props.y1,
                        key: "line-begin",
                        style: this.props.style,
                        radius: this.props.radius,
                        shape: this.props.endpointShape,
                        roundedX: this.props.endPointRoundedX,
                        roundedY: this.props.endPointRoundedY,
                        highlighted: this.state.highlighted,
                        muted: this.props.muted,
                        selected: this.props.selected
                    }),
                    _react2.default.createElement(_Endpoint.Endpoint, {
                        x: this.props.x2,
                        y: this.props.y2,
                        key: "line-end",
                        style: this.props.style,
                        radius: this.props.radius,
                        shape: this.props.endpointShape,
                        roundedX: this.props.endPointRoundedX,
                        roundedY: this.props.endPointRoundedY,
                        highlighted: this.state.highlighted,
                        muted: this.props.muted,
                        selected: this.props.selected
                    })
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var xOffset = void 0;
            var yOffset = void 0;

            if (this.props.labelOffsetX === undefined) {
                xOffset = this.props.radius * 1.33;
            } else {
                xOffset = this.props.labelOffsetX;
            }

            if (this.props.labelOffsetY === undefined) {
                yOffset = this.props.radius * 1.33;
            } else {
                yOffset = this.props.labelOffsetY;
            }

            var hitStyle = {
                cursor: this.props.noNavigate ? "default" : "pointer",
                stroke: "#FFF",
                strokeWidth: 8
            };

            var navTo = this.props.navTo;

            var width = void 0;
            var stroke = void 0;
            var fill = void 0;
            var offset = void 0;

            if (this.props.lineShape === "angled") {
                offset = this.props.bendOffset;
            } else {
                offset = this.props.curveOffset;
            }

            if (this.state.highlighted) {
                width = this.props.style.line.highlighted.strokeWidth;
                stroke = this.props.style.line.highlighted.stroke;
                fill = this.props.style.line.highlighted.fill;
            } else {
                width = this.props.style.line.normal.strokeWidth;
                stroke = this.props.style.line.normal.stroke;
                fill = this.props.style.line.normal.fill;
            }

            return _react2.default.createElement(
                "g",
                null,
                _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_SimpleEdge.SimpleEdge, {
                        x1: this.props.x1,
                        x2: this.props.x2,
                        y1: this.props.y1,
                        y2: this.props.y2,
                        shape: this.props.lineShape,
                        key: "line-path",
                        label: this.props.label,
                        labelPosition: this.props.labelPosition,
                        labelStyle: this.props.style.label,
                        labelOffsetX: xOffset,
                        labelOffsetY: yOffset,
                        textAnchor: this.props.textAnchor,
                        color: stroke,
                        width: width,
                        muted: this.props.muted,
                        selected: this.props.selected,
                        classed: this.props.classed,
                        roundedX: this.props.roundedX,
                        roundedY: this.props.roundedY,
                        fillColor: fill,
                        size: this.props.size,
                        centerLine: this.props.centerLine,
                        arrow: this.props.arrow,
                        arrowWidth: this.props.arrowWidth,
                        arrowHeight: this.props.arrowHeight,
                        position: this.props.position,
                        offset: offset,
                        curveDirection: this.props.curveDirection,
                        name: navTo
                    })
                ),
                _react2.default.createElement(
                    "g",
                    { onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut },
                    _react2.default.createElement(_SimpleEdge.SimpleEdge
                    // Positional Props used by all shapes
                    , { x1: this.props.x1,
                        x2: this.props.x2,
                        y1: this.props.y1,
                        y2: this.props.y2
                        // Identity Props used by all shapes
                        , shape: this.props.lineShape // controls shape of the line
                        , key: "line-path-hit" // needed for react element
                        // Label Props used by all shapes
                        , label: this.props.label // provides label to be displayed
                        , labelPosition: this.props.labelPosition // controls where label
                        // is situated around the line
                        , labelStyle: this.props.style.label // controls the
                        // style of the label
                        , labelOffsetX: xOffset // controls the +/- x offset from labelPosition
                        , labelOffsetY: yOffset // controls the +/- y offset from labelPosition
                        , textAnchor: this.props.textAnchor // controls the positioning of the text
                        // Style Props
                        , color: hitStyle.stroke // controls color of the line
                        , width: hitStyle.strokeWidth // controls the stroke thickness
                        , muted: this.props.muted // controls style
                        , selected: this.props.selected // controls style
                        , classed: this.props.classed // provides a psuedo css class for the line
                        // Square props
                        , roundedX: this.props.roundedX // controls corner rounding
                        , roundedY: this.props.roundedY // controls corner rounding
                        , fillColor: fill // controls color of the fill
                        , size: this.props.size // controls height of square
                        , centerLine: this.props.centerLine // controls display of horizontal center line
                        // Arrow props, not used by square
                        , arrow: this.props.arrow // determines whether to
                        // display nodes or arrows at ends of line
                        , arrowWidth: this.props.arrowWidth // controls width of arrow
                        , arrowHeight: this.props.arrowHeight // controls height of arrow
                        // Line offset props, used by angle and arc
                        , position: this.props.position // controls angle of offset
                        , offset: offset // controls length of offset line
                        , curveDirection: this.props.curveDirection // controls left / right
                        // line path with reference
                        // to line center

                        // Navigation props
                        , name: navTo // returned value for _onSelection change - all
                        , onSelectionChange: this.handleSelectionChanged // callback function to
                        // control what happens if the
                        // element is clicked
                        , invisible: true // Internal prop for hiding this line
                    })
                ),
                _react2.default.createElement(
                    "g",
                    null,
                    this.renderEndpoints()
                )
            );
        }
    }]);

    return Connection;
}(_react2.default.Component);

Connection.propTypes = {
    /**
     * Controls shape of the line, can be "linear", "square", "angled", "arc".
     */
    lineShape: _propTypes2.default.oneOf(["linear", "square", "angled", "arc"]),

    //
    // Positional Props used by all shapes
    //

    /** Controls the x-coordinate of the line beginning. */
    x1: _propTypes2.default.number,

    /** Controls the x-coordinate of the line end. */
    x2: _propTypes2.default.number,

    /** Controls the y-coordinate of the line beginning. */
    y1: _propTypes2.default.number,

    /** Controls the y-coordinate of the line end. */
    y2: _propTypes2.default.number,

    //
    // Label Props used by all shapes
    //

    /**
     * Provides label to be displayed; Takes either a string, or an array of
     * strings for multi-line labels.
     */
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),

    /**
     * Controls where label is situated around the line.
     */
    labelPosition: _propTypes2.default.oneOf(["top", "bottom", "center"]),

    /**
     * Controls the x pixel offset from labelPosition
     */
    labelOffsetX: _propTypes2.default.number,

    /**
     * Controls the y pixel offset from labelPosition
     */
    labelOffsetY: _propTypes2.default.number,

    /**
     * Controls the justification of the text label
     */
    textAnchor: _propTypes2.default.oneOf(["begin", "middle", "end"]),

    //
    // Style Props, used by all shapes
    //

    /**
     * Object prop that controls the inline style for the react element.
     *
     * The style has three components, one for the two Line-caps (`node`),
     * one for the label (`label`) and one for the line (`line`). Each group
     * has up to four different possible options depending on the way the
     * line and endpoint should be rendered:
     *  * `normal` - provides the standard view of the component
     *  * `selected` - for when the component is clicked
     *  * `muted` - for when the component is in the background
     *  * `highlighted` - is used when the component is hovered over
     *
     * The muted and selected props are boolean values that tell the lower
     * level primitive that you want to use these styles. They will default
     * to false unless specified. The `fill` css style on each category is used
     * for line-caps and square connections, allowing different colors to be
     * specified for the interior of the shapes.
     */
    style: _propTypes2.default.object,

    /** Display the endpoint muted */
    muted: _propTypes2.default.bool,

    /** Display the endpoint selected */
    selected: _propTypes2.default.bool,

    //
    // Props for "square" shape
    //

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedX: _propTypes2.default.number,

    /** When the endpoint shape is a `square`, this controls the radius of corners. */
    roundedY: _propTypes2.default.number,

    /**
     * Used to determine the height of the square if the endpoint shape is a `square`,
     * as well as when calculating the label position around a square.
     */
    size: _propTypes2.default.number,

    /** Boolean value that controls if a horizontal line is drawn down the center of a square. */
    centerLine: _propTypes2.default.bool,

    //
    // Line offset Props, used by "angle" and "curved" shapes
    //

    /**
     * Controls the angle of the offset from the center of the line.
     */
    position: _propTypes2.default.number,

    /**
     * Controls the distance from the center x axis the curve will arc through
     */
    curveOffset: _propTypes2.default.number,

    /**
     * Controls the length of the offset line
     */
    bendOffset: _propTypes2.default.number,

    /**
     * The curveDirection property determines whether the curve moves to the
     * left or the right of the non-horizontal vector between x1,y1 and x2,y2.
     * The curveOffset property specifies the distance of the curve from the vector
     * between x1, y1 and x2, y2. When position is specified, this will offset a linear,
     * or curved line from the x1, y1, x2, y2 corrdinates using a combination of
     * vectors.
     *
     * This functions slightly differently for angled connections and
     * will instead rotate a point offset from the x and y by an angle. If the
     * curveDirection is left, this will move clockwise, and will move counterClockwise if right.
     */
    curveDirection: _propTypes2.default.oneOf(["left", "right"]),

    //
    // Linecap props, used by all shapes
    //

    /**
     * Controls the size of the Line-cap
     */
    radius: _propTypes2.default.number,

    /**
     * Controls the shape of the line-cap.
     */
    endpointShape: _propTypes2.default.oneOf(["circle", "square", "cloud"]),

    /**
     * If a square endpoint shape is used, controls the corner rounding of the x-axis of the square
     */
    endPointRoundedX: _propTypes2.default.number,

    /**
     * If a square endpoint shape is used, controls the corner rounding of the y-axis of the square
     */
    endPointRoundedY: _propTypes2.default.number,

    //
    // Arrow props, not used by "square"
    //

    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
     */
    arrow: _propTypes2.default.bool,

    /**
     * Controls the width of an arrow head
     */
    arrowWidth: _propTypes2.default.number,

    /**
     * Controls the height of an arrow head
     */
    arrowHeight: _propTypes2.default.number,

    //
    // Navigation Props, used by all shapes
    //

    /**
     * Boolean value that determines if the element uses the onSelectionChange change and can be clicked
     */
    noNavigate: _propTypes2.default.bool,

    /**
     * Callback specified to handle selection of the circuit. The value supplied
     * to the callback is whatever was specified in the navTo prop.
     */
    onSelectionChange: _propTypes2.default.func,

    /**
     * Value passed down to the click handler at the lowest level primitive.
     * Will return to the onSelectionChange its value.
     */
    navTo: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

Connection.defaultProps = {
    noNavigate: false,
    labelPosition: "top",
    radius: 2,
    endpointShape: "circle",
    classed: "circuit",
    lineShape: "linear",
    selected: false,
    muted: false,
    position: 0,
    arrow: false,
    arrowWidth: 10,
    arrowHeight: 10,
    curveDirection: "right",
    curveOffset: 20,
    size: 40
};