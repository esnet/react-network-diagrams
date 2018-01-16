"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Resizable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import createReactClass from "create-react-class";

/**
 * This takes a single child and inserts a prop 'width' on it that is the
 * current width of the this container. This is handy if you want to surround
 * a diagram and have this drive the width.
 */
var Resizable = exports.Resizable = function (_React$Component) {
    _inherits(Resizable, _React$Component);

    function Resizable(props) {
        _classCallCheck(this, Resizable);

        var _this = _possibleConstructorReturn(this, (Resizable.__proto__ || Object.getPrototypeOf(Resizable)).call(this, props));

        _this.state = {
            width: 0
        };
        return _this;
    }

    _createClass(Resizable, [{
        key: "handleResize",
        value: function handleResize() {
            this.setState({ width: this.refs.container.offsetWidth });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            window.addEventListener("resize", this.handleResize); //eslint-disable-line
            this.handleResize();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this.handleResize); //eslint-disable-line
        }
    }, {
        key: "render",
        value: function render() {
            var props = { width: this.state.width };
            if (this.props.aspect) {
                props.height = this.state.width / this.props.aspect;
            }
            var child = _react2.default.Children.only(this.props.children);
            var childElement = this.state.width ? _react2.default.cloneElement(child, props) : null;
            return _react2.default.createElement(
                "div",
                { ref: "container", style: this.props.style },
                childElement
            );
        }
    }]);

    return Resizable;
}(_react2.default.Component);

;