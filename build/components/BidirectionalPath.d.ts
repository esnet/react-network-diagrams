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
import { PathShape } from "./Path";
import { CurveDirection } from "./types";
export interface BidirectionalPathProps {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /**
     * The thickness of the path between the source and target.  If this is not
     * specified the `width` is used.
     */
    sourceTargetWidth?: number;
    /**
     * The color of the path between the targte and source.
     */
    sourceTargetColor?: string;
    /**
     * The thickness of the path between the target and source. If this is not
     * specified the `width` is used.
     */
    targetSourceWidth?: number;
    /**
     * The color of the path between the targte and source.
     */
    targetSourceColor?: string;
    /**
     * The thickness of the path. Maybe overridden by using the `targetSourceWidth` or `sourceTargetWidth`.
     */
    width?: number;
    /**
     * Determines the shape of the path to be draw, which at this time should be either:
     *  * Curved
     *  * Linear
     */
    shape?: PathShape;
    /**
     * Determines if the arc curves to the left or right. Applies only
     * if the `shape` of the bidirectional path is Curved.
     */
    curveDirection?: CurveDirection;
    /**
     * Determines the curvature of the path
     */
    curveOffset?: number;
    /** Display the path as selected */
    selected?: boolean;
    /** Display the path as muted */
    muted?: boolean;
    /** Custom class prefex */
    classed?: string;
    /** Callback which is called when the user selects this path */
    onSelectionChange?: (type: string, id: string) => void;
}
export declare const BidirectionalPath: (props: BidirectionalPathProps) => ReactElement;
