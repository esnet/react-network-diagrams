/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import { ReactElement } from "react";
import { SquarePathProps } from "./SquarePath";
import { ArcPathProps } from "./ArcPath";
import { LinearPathProps } from "./LinearPath";
export declare enum PathShape {
    Curved = "Curved",
    Linear = "Linear",
    Square = "Square",
    Angular = "Angular"
}
export declare type PathProps = {
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
} & ArcPathProps & SquarePathProps & LinearPathProps;
export declare const Path: {
    (props: PathProps): ReactElement;
    defaultProps: {
        color: string;
        width: number;
        position: number;
        selected: boolean;
        muted: boolean;
        invisible: boolean;
        arrow: boolean;
        fillColor: string;
    };
};
