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
import { TextAnchor, VerticalAlign } from "./Label";
import { SelectableStyle } from "./types";
/**
 * LinearPath
 */
export interface LinearPathProps {
    id: string;
    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /** The path stroke width, i.e how thick the line is. */
    width?: number;
    /** The color of the path */
    color?: string;
    /**
     * Controls the angle of the offset from the center of the path. This will
     * cause the line to bend out as it leaves the start point and then back in
     * as it approaches the end point. You can use this to assemble parallel
     * lines between two points.
     */
    position?: number;
    /**
     *
     */
    offset?: number;
    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * `arrowWidth` and `arrowHeight` property.
     */
    arrow?: boolean;
    /** Size of the arrowhead */
    arrowWidth?: number;
    /** Size of the arrowhead */
    arrowHeight?: number;
    /**
     * A label to display along the path
     */
    label?: string;
    labelStyle?: SelectableStyle;
    labelTextAnchor?: TextAnchor;
    /**
     * Tweak the label position in the x direction
     */
    labelOffsetX?: number;
    /**
     * Tweak the label position in the y direction
     */
    labelOffsetY?: number;
    /**
     * Position the label above, below or on the line. This props should be
     * either VericalAlign.Top, VericalAlign.Bottom, or VericalAlign.Center.
     */
    labelVerticalAlign?: VerticalAlign;
    /**
     * Display the path selected
     */
    selected?: boolean;
    /**
     * Display the path muted
     */
    muted?: boolean;
    /**
     * Don't display this path at all
     */
    invisible?: boolean;
    /**
     * CSS class to add onto this path
     */
    classed?: string;
    onSelectionChange?: (type: string, id: string) => void;
}
/**
 * This component draws a linear path between a source and target. The
 * source and target are specified as props 'x1', 'y1' and 'x2', 'y2'.
 *
 * The path may have a bend, which is controlled with the prop 'position'.
 *
 * An arrow may be added by passing an `arrow` prop of true and may be
 * customized by supplying `arrowWidth` and/or `arrowHeight`. If the path
 * has a bend then the final section of the path is skipped and replaced
 * with just the arrow.
 *
 * The `color` and `width` of the path may also be supplied.
 */
export declare const LinearPath: (props: LinearPathProps) => ReactElement;
