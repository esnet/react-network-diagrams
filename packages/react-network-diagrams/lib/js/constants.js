"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CircuitSegmentTypes = exports.EndpointLinks = exports.CircuitTypes = exports.Directions = exports.Positions = undefined;

var _keymirror = require("keymirror");

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Positions = (0, _keymirror2.default)({
    TOP: null,
    BOTTOM: null,
    LEFT: null,
    RIGHT: null
}); /**
     *  Copyright (c) 2018, The Regents of the University of California,
     *  through Lawrence Berkeley National Laboratory (subject to receipt
     *  of any required approvals from the U.S. Dept. of Energy).
     *  All rights reserved.
     *
     *  This source code is licensed under the BSD-style license found in the
     *  LICENSE file in the root directory of this source tree.
     */

var Directions = (0, _keymirror2.default)({
    NORTH: null,
    SOUTH: null,
    EAST: null,
    WEST: null
});

var CircuitTypes = (0, _keymirror2.default)({
    BASIC_CIRCUIT: null,
    CONCATENATED_CIRCUIT: null,
    PARALLEL_CIRCUIT: null
});

var EndpointLinks = (0, _keymirror2.default)({
    PARENT_BEGIN: null,
    PARENT_END: null,
    PREVIOUS_END: null,
    NEXT_BEGIN: null
});

var CircuitSegmentTypes = (0, _keymirror2.default)({
    CIRCUIT: null,
    ENDPOINT: null
});

exports.Positions = Positions;
exports.Directions = Directions;
exports.CircuitTypes = CircuitTypes;
exports.EndpointLinks = EndpointLinks;
exports.CircuitSegmentTypes = CircuitSegmentTypes;