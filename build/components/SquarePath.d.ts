/**
 *  Copyright (c) 2018, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import { ReactElement } from "react";
import { TextAnchor, VerticalAlign } from "./Label";
import { SelectableStyle } from "./types";
export interface SquarePathProps {
    id: string;
    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /** The size of the box */
    size: number;
    /** Radius of the box corners */
    roundedX: number;
    /** Radius of the box corners */
    roundedY: number;
    /**
     * Display a centerline, dividing the box in half
     */
    showCenterLine?: boolean;
    /** The color of outline of the box */
    color?: string;
    /** The color to fill the inside of the box */
    fillColor?: string;
    /** The opacity of the box */
    opacity?: number;
    /** The stroke width of the box outline */
    thickness?: number;
    /** A label to display along the path */
    label?: string;
    /** CSS style for the label */
    labelStyle?: SelectableStyle;
    /** Text positioning of the label */
    labelTextAnchor?: TextAnchor;
    /** Tweak the label position in the x direction */
    labelOffsetX?: number;
    /** Tweak the label position in the y direction */
    labelOffsetY?: number;
    /**
     * Position the label above, below or on the line. This props should be
     * either VericalAlign.Top, VericalAlign.Bottom, or VericalAlign.Center.
     */
    labelVerticalAlign?: VerticalAlign;
    /** Display the path selected */
    selected?: boolean;
    /** Display the path muted */
    muted?: boolean;
    /** Display the path or not */
    invisible?: boolean;
    /** Callback which is called when the user selects this path */
    onSelectionChange?: (type: string, id: string) => void;
    classed?: string;
}
export declare const SquarePath: {
    (props: SquarePathProps): ReactElement;
    defaultProps: {
        thickness: number;
        roundedX: number;
        roundedY: number;
        color: string;
        arrow: boolean;
        selected: boolean;
        muted: boolean;
        height: number;
    };
};
