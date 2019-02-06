"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CircuitContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Navigate = require("./Navigate");

var _constants = require("../js/constants");

var _ParallelCircuit = require("./ParallelCircuit");

var _MultipointCircuit = require("./MultipointCircuit");

var _ConcatenatedCircuit = require("./ConcatenatedCircuit");

var _BasicCircuit = require("./BasicCircuit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CircuitContainer = exports.CircuitContainer = function (_React$Component) {
    _inherits(CircuitContainer, _React$Component);

    function CircuitContainer() {
        _classCallCheck(this, CircuitContainer);

        return _possibleConstructorReturn(this, (CircuitContainer.__proto__ || Object.getPrototypeOf(CircuitContainer)).apply(this, arguments));
    }

    _createClass(CircuitContainer, [{
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
            if (disabled) {
                var overlayStyle = {
                    fill: "#FDFDFD",
                    fillOpacity: "0.65"
                };
                return _react2.default.createElement("rect", {
                    className: "circuit-overlay",
                    style: overlayStyle,
                    x: "0",
                    y: "0",
                    width: this.props.width,
                    height: this.props.height
                });
            } else {
                return null;
            }
        }
    }, {
        key: "renderCircuits",
        value: function renderCircuits() {
            var _this2 = this;

            var combined = this.props.combinedList;
            var elements = [];
            var start = this.props.margin;
            var increment = this.props.width / combined.length - start;
            _underscore2.default.each(combined, function (circuitSet, circuitSetIndex) {
                switch (circuitSet.type) {
                    case "parallel":
                        elements.push(_react2.default.createElement(_ParallelCircuit.ParallelCircuit, {
                            key: "group-" + (circuitSetIndex + 1),
                            hideTitle: circuitSet.hideTitle,
                            title: circuitSet.title,
                            titleOffsetX: start,
                            titleOffsetY: 50,
                            memberList: circuitSet.values,
                            disabled: circuitSet.disabled,
                            onSelectionChange: circuitSet.handleSelectionChange,
                            endpointLabelA: circuitSet.endpointLabelA,
                            endpointLabelZ: circuitSet.endpointLabelZ,
                            endpointStyle: circuitSet.endpointStyle,
                            endpointLabelOffset: circuitSet.endpointLabelOffset,
                            parentId: circuitSet.parentId,
                            start: start,
                            height: _this2.props.height,
                            end: start + increment,
                            viewBox: "0 0 " + _this2.props.width + " " + _this2.props.height
                        }));
                        break;
                    case "concatenated":
                        break;
                    case "multipoint":
                        elements.push(_react2.default.createElement(_MultipointCircuit.MultipointCircuit, {
                            key: "group-" + (circuitSetIndex + 1),
                            hideTitle: circuitSet.hideTitle,
                            title: circuitSet.title,
                            memberList: circuitSet.values,
                            disabled: circuitSet.disabled,
                            onSelectionChange: circuitSet.handleSelectionChange,
                            endpointStyle: circuitSet.endpointStyle,
                            endpointLabelOffset: circuitSet.endpointLabelOffset,
                            parentId: circuitSet.parentId,
                            titleOffsetX: start,
                            titleOffsetY: 50,
                            start: start,
                            spread: _this2.props.spread,
                            height: _this2.props.height,
                            end: start + increment,
                            viewBox: "0 0 " + _this2.props.width + " " + _this2.props.height
                        }));
                        break;
                    case "basic":
                        break;
                    default:
                        break;
                }
                start += increment;
            });
            return elements;
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

            var viewBox = "0 0 " + this.props.width + " " + this.props.height;

            return _react2.default.createElement(
                "svg",
                { className: className, style: svgStyle, onClick: this._deselect },
                _react2.default.createElement(
                    "svg",
                    { viewBox: viewBox, preserveAspectRatio: "xMinYMin" },
                    this.renderCircuitTitle(this.props.title),
                    this.renderCircuits(),
                    this.renderParentNavigation(this.props.parentId),
                    this.renderDisabledOverlay(this.props.disabled)
                )
            );
        }
    }]);

    return CircuitContainer;
}(_react2.default.Component);

CircuitContainer.defaultProps = {
    width: 851,
    height: 250,
    disabled: false,
    titleOffsetX: 10,
    titleOffsetY: 15,
    margin: 100,
    spread: 40,
    noNavigate: false,
    lineShape: "linear"
};