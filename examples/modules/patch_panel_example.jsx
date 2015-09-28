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
import _ from "underscore";
import Markdown from "react-markdown-el";
import locationCouplers from "../data/empty_patch_panel.json";
import LocationPanelDiagram from "../../src/location-diagram-panel";

export default React.createClass({

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Patch Panel Example</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <LocationPanelDiagram couplers={locationCouplers}/>
                    </div>
                </div>
            </div>
        );
    }
});
