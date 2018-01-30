"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerNode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Node = require("./Node");

var _Label = require("./Label");

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

var PowerNode = exports.PowerNode = function (_React$Component) {
    _inherits(PowerNode, _React$Component);

    function PowerNode(props) {
        _classCallCheck(this, PowerNode);

        var _this = _possibleConstructorReturn(this, (PowerNode.__proto__ || Object.getPrototypeOf(PowerNode)).call(this, props));

        _this.state = {
            highlighted: false
        };
        _this.handleMouseOut = _this.handleMouseOut.bind(_this);
        _this.handleMouseOver = _this.handleMouseOver.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    /**
     * User hovers over the power node
     */


    _createClass(PowerNode, [{
        key: "handleMouseOver",
        value: function handleMouseOver() {
            if (!this.props.noNavigate) {
                this.setState({ highlighted: true });
            }
        }

        /**
         * Use stops hovering over power node
         */

    }, {
        key: "handleMouseOut",
        value: function handleMouseOut() {
            if (!this.props.noNavigate) {
                this.setState({ highlighted: false });
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick(e) {
            if (this.props.onSelectionChange) {
                this.props.onSelectionChange("power Node", this.props.name);
            }
            e.stopPropagation();
        }
    }, {
        key: "drawLabel",
        value: function drawLabel(x, y, label, position, offset) {
            var cy = y;
            if (offset) {
                cy = y + 20;
            }
            var labelClassed = "power-node-label";
            var labelElement = _react2.default.createElement(_Label.Label, {
                key: "power-node-label",
                x: x,
                y: cy,
                classed: labelClassed,
                style: this.props.labelStyle.normal,
                label: label,
                labelPosition: position
            });
            return labelElement;
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                powerNode = _props.powerNode,
                key = _props.key;

            var muted = false;
            if (powerNode.equipment.length === 0 && !this.props.selected) {
                muted = true;
            }
            return _react2.default.createElement(
                "g",
                {
                    key: "powerNode-" + key,
                    onMouseOver: this.handleMouseOver,
                    onMouseOut: this.handleMouseOut,
                    onClick: this.handleClick
                },
                _react2.default.createElement(_Node.Node, {
                    x: powerNode.x,
                    y: powerNode.y,
                    key: powerNode.label + "-" + powerNode.id,
                    style: powerNode.style.node,
                    radius: this.props.radius,
                    shape: "circle",
                    label: powerNode.label,
                    labelPosition: "right",
                    labelStyle: this.props.labelStyle,
                    highlighted: this.state.highlighted,
                    selected: this.props.selected,
                    muted: muted
                }),
                this.drawLabel(powerNode.x, powerNode.y, "" + powerNode.type, "center")
            );
        }
    }]);

    return PowerNode;
}(_react2.default.Component);

;

PowerNode.defaultProps = {
    radius: 15
};