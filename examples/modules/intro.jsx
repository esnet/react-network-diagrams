/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";

export default React.createClass({

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Introduction</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                    The Maps library is used by the ESnet Portal to
                    display subway style weather maps of the
                    current state of the ESnet network.

                    <p />

                    Main features:

                    <ul>
                        <li>Low level pieces, such as edges and nodes</li>
                        <li>Higher level map topology builder</li>
                        <li>Network traffic and route mapping</li>
                        <li>Legends</li>
                    </ul>

                    </div>
                </div>
            </div>
        );
    }
});
