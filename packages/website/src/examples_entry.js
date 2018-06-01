/**
 *  Copyright (c) 2016-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

//
// Export all of the examples
//

import basic from "./examples/basic/Index";
import concatenated from "./examples/concatenated/Index";
import connection from "./examples/connection/Index";
import editor from "./examples/editor/Index";
import endpoint from "./examples/endpoint/Index";
import legend from "./examples/legend/Index";
import map from "./examples/map/Index";
import parallel from "./examples/parallel/Index";
import patchpanel from "./examples/patchpanel/Index";
import paths from "./examples/paths/Index";
import equipment from "./examples/equipment/Index";
import rack from "./examples/rack/Index";

export default {
    ...basic,
    ...concatenated,
    ...connection,
    ...editor,
    ...endpoint,
    ...legend,
    ...map,
    ...parallel,
    ...patchpanel,
    ...paths,
    ...equipment,
    ...rack
};
