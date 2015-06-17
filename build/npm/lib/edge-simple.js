"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

require("../styles/map.css");

exports["default"] = _react2["default"].createClass({
    displayName: "edge-simple",

    getDefaultProps: function getDefaultProps() {
        return {
            color: "#ddd",
            width: 4,
            position: 0,
            selected: false,
            muted: false
        };
    },

    render: function render() {
        // Class for edge
        var classed = "map-edge";
        if (this.props.selected) {
            classed += " selected";
        }
        if (this.props.muted) {
            classed += " muted";
        }
        if (!_underscore2["default"].isUndefined(this.props.classed)) {
            classed += " " + this.props.classed;
        }

        // Render based on shape
        if (this.props.shape === "curved") {
            return _react2["default"].createElement(ArcEdge, { x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                color: this.props.color,
                width: this.props.width,
                position: this.props.position,
                curveDirection: this.props.curveDirection,
                classed: this.props.classed,
                key: this.props.name,
                name: this.props.name,
                selected: this.props.selected,
                muted: this.props.muted });
        } else {
            return _react2["default"].createElement(LinearEdge, { x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                color: this.props.color,
                width: this.props.width,
                position: this.props.position,
                classed: this.props.classed,
                key: this.props.name,
                name: this.props.name,
                selected: this.props.selected,
                muted: this.props.muted });
        }
    }
});
module.exports = exports["default"];