"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

exports["default"] = _react2["default"].createClass({
    displayName: "map-node-label",

    render: function render() {
        var textAnchor = undefined;
        switch (this.props.labelPosition) {
            case "left":
                textAnchor = "end";
                break;
            case "top":
            case "bottom":
                textAnchor = "middle";
                break;
            default:
                textAnchor = "start";
        }

        return _react2["default"].createElement(
            "text",
            { x: this.props.x,
                y: this.props.y,
                label: this.props.label,
                textAnchor: textAnchor,
                className: "map-label" },
            this.props.label
        );
    }
});
module.exports = exports["default"];