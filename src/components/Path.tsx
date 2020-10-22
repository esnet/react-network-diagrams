/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import _ from "lodash";
import React, { ReactElement } from "react";

// import { AngledEdge } from "./AngledEdge";
import { SquarePath, SquarePathProps } from "./SquarePath";
import { ArcPath, ArcPathProps } from "./ArcPath";
import { LinearPath, LinearPathProps } from "./LinearPath";

export enum PathShape {
    Curved = "Curved",
    Linear = "Linear",
    Square = "Square",
    Angular = "Angular",
}

export type PathProps = {
    id: string;

    /**
     * The shape to display this path. The value of this prop
     * switches out different path types. The value can be:
     *  * Curved
     *  * Linear
     *  * Square
     *  * Angular
     */
    shape: PathShape;
} & ArcPathProps &
    SquarePathProps &
    LinearPathProps;

export const Path = (props: PathProps): ReactElement => {
    const { id, shape } = props;

    const coords = _.pick(props, ["x1", "y1", "x2", "y2"]);
    const labelProps = _.pick(props, [
        "label",
        "labelVerticalAlign",
        "labelStyle",
        "labelOffsetX",
        "labelOffsetY",
        "labelTextAnchor",
    ]);
    const arrowProps = _.pick(props, ["arrow", "arrowWidth", "arrowHeight"]);
    const appearance = _.pick(props, ["color", "width"]);
    const state = _.pick(props, "selected", "muted", "invisible");
    const events = _.pick(props, "onSelectionChange");

    // Render based on shape
    switch (shape) {
        case PathShape.Curved:
            return (
                <ArcPath
                    id={id}
                    position={props.position}
                    curveDirection={props.curveDirection}
                    offset={props.offset}
                    {...coords}
                    {...labelProps}
                    {...arrowProps}
                    {...appearance}
                    {...state}
                    {...events}
                />
            );
        case PathShape.Square:
            return (
                <SquarePath
                    id={id}
                    size={props.size}
                    {...coords}
                    {...labelProps}
                    {...appearance}
                    {...state}
                    {...events}
                />
            );
        case PathShape.Linear:
            return (
                <LinearPath
                    id={id}
                    position={props.position}
                    {...coords}
                    {...labelProps}
                    {...arrowProps}
                    {...appearance}
                    {...state}
                    {...events}
                />
            );
        default:
            return <g />;
    }
};

Path.defaultProps = {
    color: "#ddd",
    width: 4,
    position: 0,
    selected: false,
    muted: false,
    invisible: false,
    arrow: false,
    fillColor: "none",
};
