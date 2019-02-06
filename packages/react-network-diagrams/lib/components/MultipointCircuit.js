"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultipointCircuit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Connection = require("./Connection");

var _Endpoint = require("./Endpoint");

var _Navigate = require("./Navigate");

var _constants = require("../js/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultipointCircuit = exports.MultipointCircuit = function (_React$Component) {
    _inherits(MultipointCircuit, _React$Component);

    function MultipointCircuit() {
        _classCallCheck(this, MultipointCircuit);

        return _possibleConstructorReturn(this, (MultipointCircuit.__proto__ || Object.getPrototypeOf(MultipointCircuit)).apply(this, arguments));
    }

    _createClass(MultipointCircuit, [{
        key: "renderCircuitTitle",
        value: function renderCircuitTitle(title) {
            var titleStyle = {
                textAnchor: "left",
                fill: "#9D9D9D",
                fontFamily: "verdana, sans-serif",
                fontSize: 14
            };

            if (!this.props.hideTitle) {
                return _react2.default.createElement(
                    "text",
                    {
                        className: "circuit-title",
                        key: "circuit-title",
                        style: titleStyle,
                        x: this.props.titleOffsetX,
                        y: this.props.titleOffsetY
                    },
                    title
                );
            } else {
                return null;
            }
        }
    }, {
        key: "renderParentNavigation",
        value: function renderParentNavigation(parentId) {
            if (parentId) {
                return _react2.default.createElement(
                    "g",
                    null,
                    _react2.default.createElement(_Navigate.Navigate, {
                        direction: _constants.Directions.NORTH,
                        ypos: 0,
                        width: this.props.width,
                        height: this.props.height,
                        id: this.props.parentId,
                        onSelectionChange: this.props.onSelectionChange
                    })
                );
            } else {
                return null;
            }
        }
    }, {
        key: "renderDisabledOverlay",
        value: function renderDisabledOverlay(disabled) {
            var style = { fill: "#FDFDFD", fillOpacity: 0.65 };
            if (disabled) {
                return _react2.default.createElement("rect", {
                    className: "circuit-overlay",
                    style: style,
                    x: "0",
                    y: "0",
                    width: this.props.width,
                    height: this.props.height
                });
            } else {
                return null;
            }
        }
        /**
            const multipointList = [
                {
                    styleProperties: {
                        style: stylesMap.crossConnect,
                        lineShape: "linear"
                    },
                    endpointStyle: stylesMap.endpoint,
                    endpointLabelA: `Endpoint 1`,
                    endpointLabelZ: `Endpoint 2`,
                    circuitLabel: `Segment 1`,
                    navTo: `Segment 1`,
                },
                {
                    styleProperties: {
                        style: stylesMap.crossConnect,
                        lineShape: "linear"
                    },
                    endpointStyle: stylesMap.endpoint,
                    endpointLabelA: `Endpoint 1`,
                    endpointLabelZ: `Endpoint 3`,
                    circuitLabel: `Segment 2`,
                    navTo: `Segment 2`,
                }
            ]
        **/

    }, {
        key: "renderCircuitElements",
        value: function renderCircuitElements() {
            var _this2 = this;

            var elements = [];

            // Determine the initial position
            var y1 = this.props.height / 4;

            var y2 = y1;
            var start = this.props.start ? this.props.start : this.props.margin;
            var end = this.props.end ? this.props.end : this.props.width - this.props.margin;
            var x1 = start;
            var x2 = end;
            var memberList = this.props.memberList;

            var spread = 0;

            if (memberList.length > 1) {
                spread = this.props.spread * memberList.length;
            }
            var yOffset = 4;
            // spread is the max distance from top to bottom
            console.log("spread", spread);
            // Draw the left endpoint
            elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                x: x1,
                y: y1,
                key: "endpoint-0",
                style: memberList[0].endpointStyle,
                labelPosition: this.props.endpointLabelPosition,
                offset: this.props.endpointLabelOffset,
                label: memberList[0].endpointLabelA
            }));

            // Draw the first right endpoint
            y2 = y1 - spread / 2;
            elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                x: x2,
                y: y2,
                key: "endpoint-1",
                style: memberList[0].endpointStyle,
                labelPosition: this.props.endpointLabelPosition,
                offset: this.props.endpointLabelOffset,
                label: memberList[0].endpointLabelZ
            }));
            elements.push(_react2.default.createElement(_Connection.Connection, {
                x1: x1,
                x2: x2,
                y1: y1,
                y2: y2,
                key: "circuit-1",
                curveDirection: "left",
                bendOffset: memberList[0].styleProperties.bendOffset,
                position: memberList[0].styleProperties.position,
                style: memberList[0].styleProperties.style,
                lineShape: memberList[0].styleProperties.lineShape,
                label: memberList[0].circuitLabel,
                labelPosition: this.props.connectionLabelPosition,
                labelOffsetY: yOffset,
                noNavigate: memberList[0].styleProperties.noNavigate,
                navTo: memberList[0].navTo,
                onSelectionChange: this.props.onSelectionChange
            }));

            /* since the A of each member is the same as the A of the next member, render only
             * the Z for each member starting with the first member
             */
            _underscore2.default.each(memberList, function (member, memberIndex) {
                if (memberIndex !== 0) {
                    y2 += spread / (memberList.length - 1);
                    elements.push(_react2.default.createElement(_Endpoint.Endpoint, {
                        x: x2,
                        y: y2,
                        key: "endpoint-" + (memberIndex + 1),
                        style: member.endpointStyle,
                        labelPosition: _this2.props.endpointLabelPosition,
                        offset: _this2.props.endpointLabelOffset,
                        label: member.endpointLabelZ
                    }));
                    elements.push(_react2.default.createElement(_Connection.Connection, {
                        x1: x1,
                        x2: x2,
                        y1: y1,
                        y2: y2,
                        key: "circuit-1" + (memberIndex + 1),
                        curveDirection: "left",
                        bendOffset: member.styleProperties.bendOffset,
                        position: member.styleProperties.position,
                        style: member.styleProperties.style,
                        lineShape: member.styleProperties.lineShape,
                        label: member.circuitLabel,
                        labelPosition: _this2.props.connectionLabelPosition,
                        labelOffsetY: yOffset,
                        noNavigate: member.styleProperties.noNavigate,
                        navTo: member.navTo,
                        onSelectionChange: _this2.props.onSelectionChange
                    }));
                }

                /*y2 =
                    y1 -
                    spread / (memberList.length ) +
                    (memberIndex / memberList.length - 1) * spread;
                console.log(
                    "y1, y2, memberIndex+1, spread, memberList.length",
                    y1,
                    y2,
                    memberIndex + 1,
                    spread,
                    memberList.length,
                    memberIndex / memberList.length
                );*/
            });
            return _react2.default.createElement(
                "g",
                null,
                elements
            );
        }
    }, {
        key: "render",
        value: function render() {
            var circuitContainer = {
                normal: {
                    borderTopStyle: "solid",
                    borderBottomStyle: "solid",
                    borderWidth: 1,
                    borderTopColor: "#FFFFFF",
                    borderBottomColor: "#EFEFEF",
                    width: "100%",
                    height: this.props.height
                },
                disabled: {
                    width: "100%",
                    height: this.props.height
                }
            };

            var className = "circuit-container";
            var svgStyle = void 0;

            if (this.props.disabled) {
                className += " disabled";
                svgStyle = circuitContainer.disabled;
            } else {
                svgStyle = circuitContainer.normal;
            }

            var viewBox = this.props.viewBox ? this.props.viewBox : "0 0 " + this.props.width + " " + this.props.height;

            return _react2.default.createElement(
                "svg",
                { className: className, style: svgStyle, onClick: this._deselect },
                _react2.default.createElement(
                    "svg",
                    { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                    this.renderCircuitTitle(this.props.title),
                    this.renderCircuitElements(),
                    this.renderParentNavigation(this.props.parentId),
                    this.renderDisabledOverlay(this.props.disabled)
                )
            );
        }
    }]);

    return MultipointCircuit;
}(_react2.default.Component);

MultipointCircuit.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    noNavigate: false,
    squareWidth: 25,
    roundedX: 5,
    roundedY: 5,
    spread: 40
};