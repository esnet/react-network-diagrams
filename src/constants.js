/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import keyMirror from "keymirror";

module.exports = {

    Positions: keyMirror({
        TOP: null,
        BOTTOM: null,
        LEFT: null,
        RIGHT: null
    }),

    Directions: keyMirror({
        NORTH: null,
        SOUTH: null,
        EAST: null,
        WEST: null
    }),

    CircuitTypes: keyMirror({
        BASIC_CIRCUIT: null,
        CONCATENATED_CIRCUIT: null,
        PARALLEL_CIRCUIT: null
    }),

    EndpointLinks: keyMirror({
        PARENT_BEGIN: null,
        PARENT_END: null,
        PREVIOUS_END: null,
        NEXT_BEGIN: null
    }),

    CircuitSegmentTypes: keyMirror({
        CIRCUIT: null,
        ENDPOINT: null
    })
};
