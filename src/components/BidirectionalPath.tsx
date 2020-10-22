/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { ReactElement } from "react";

import { ArcPath } from "./ArcPath";
import { LinearPath } from "./LinearPath";
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

export const BidirectionalPath = (props: BidirectionalPathProps): ReactElement => {
    const {
        id,
        x1,
        y1,
        x2,
        y2,
        width,
        sourceTargetWidth = 1,
        sourceTargetColor = "#C9CACC",
        targetSourceWidth = 1,
        targetSourceColor = "#C9CACC",
        shape = PathShape.Linear,
        curveDirection = CurveDirection.Left,
        curveOffset = 18,
        selected = false,
        muted = false,
        classed,
        onSelectionChange,
    } = props;

    // Position of the bidirectional paths relative to the center line
    const sw = sourceTargetWidth || width || 3;
    const tw = targetSourceWidth || width || 3;
    const edgeSpacing = ((sw + tw) / 2) * 0.75;

    if (shape === PathShape.Curved) {
        return (
            <g>
                <ArcPath
                    key={`arc-source-target-${id}`}
                    id={id}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    arrow={true}
                    position={edgeSpacing}
                    color={sourceTargetColor}
                    width={sourceTargetWidth}
                    classed={classed}
                    curveDirection={curveDirection}
                    offset={curveOffset}
                    selected={selected}
                    muted={muted}
                    onSelectionChange={onSelectionChange}
                />

                <ArcPath
                    key={`arc-target-source-${id}`}
                    id={id}
                    x1={x2}
                    y1={y2}
                    x2={x1}
                    y2={y1}
                    arrow={true}
                    position={edgeSpacing}
                    color={targetSourceColor}
                    width={targetSourceWidth}
                    classed={classed}
                    curveDirection={curveDirection}
                    offset={curveOffset}
                    selected={selected}
                    muted={muted}
                    onSelectionChange={onSelectionChange}
                />

                <ArcPath
                    id={id}
                    key={`arc-event-${id}`}
                    x1={x2}
                    y1={y2}
                    x2={x1}
                    y2={y1}
                    position={0}
                    width={5}
                    classed={classed}
                    onSelectionChange={onSelectionChange}
                    curveDirection={curveDirection}
                    offset={curveOffset}
                    invisible={true}
                />
            </g>
        );
    } else {
        return (
            <g>
                <LinearPath
                    id={id}
                    key={`linear-source-target-${id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    arrow={true}
                    color={sourceTargetColor}
                    width={sourceTargetWidth}
                    position={edgeSpacing}
                    classed={classed}
                    selected={selected}
                    muted={muted}
                    onSelectionChange={onSelectionChange}
                />

                <LinearPath
                    id={id}
                    key={`arc-target-source-${id}`}
                    x1={x2}
                    y1={y2}
                    x2={x1}
                    y2={y1}
                    arrow={true}
                    color={targetSourceColor}
                    width={targetSourceWidth}
                    position={edgeSpacing}
                    classed={classed}
                    selected={selected}
                    muted={muted}
                    onSelectionChange={onSelectionChange}
                />

                <LinearPath
                    id={id}
                    key={`linear-event-${id}`}
                    x1={x2}
                    y1={y2}
                    x2={x1}
                    y2={y1}
                    width={5}
                    position={0}
                    classed={classed}
                    onSelectionChange={onSelectionChange}
                    invisible={true}
                />
            </g>
        );
    }
};
