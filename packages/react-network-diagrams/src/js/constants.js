/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import keyMirror from "keymirror";

const Positions = keyMirror({
    TOP: null,
    BOTTOM: null,
    LEFT: null,
    RIGHT: null
});

const Directions = keyMirror({
    NORTH: null,
    SOUTH: null,
    EAST: null,
    WEST: null
});

const CircuitTypes = keyMirror({
    BASIC_CIRCUIT: null,
    CONCATENATED_CIRCUIT: null,
    PARALLEL_CIRCUIT: null
});

const EndpointLinks = keyMirror({
    PARENT_BEGIN: null,
    PARENT_END: null,
    PREVIOUS_END: null,
    NEXT_BEGIN: null
});

const CircuitSegmentTypes = keyMirror({
    CIRCUIT: null,
    ENDPOINT: null
});

export { Positions, Directions, CircuitTypes, EndpointLinks, CircuitSegmentTypes };
