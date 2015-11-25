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

var _keymirror = require("keymirror");

var _keymirror2 = _interopRequireDefault(_keymirror);

module.exports = {

    Positions: (0, _keymirror2["default"])({
        TOP: null,
        BOTTOM: null,
        LEFT: null,
        RIGHT: null
    }),

    Directions: (0, _keymirror2["default"])({
        NORTH: null,
        SOUTH: null,
        EAST: null,
        WEST: null
    }),

    CircuitTypes: (0, _keymirror2["default"])({
        BASIC_CIRCUIT: null,
        CONCATENATED_CIRCUIT: null,
        PARALLEL_CIRCUIT: null
    }),

    EndpointLinks: (0, _keymirror2["default"])({
        PARENT_BEGIN: null,
        PARENT_END: null,
        PREVIOUS_END: null,
        NEXT_BEGIN: null
    }),

    CircuitSegmentTypes: (0, _keymirror2["default"])({
        CIRCUIT: null,
        ENDPOINT: null
    })
};