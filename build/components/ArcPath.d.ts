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
import { SelectableStyle, CurveDirection } from "./types";
export interface ArcPathProps {
    id: string;
    /**
     * The coordinates of the path's line from (x1, y1) connected to (x2, y2)
     */
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /** An offset to the position of the label which can be used for fine tuning */
    offset: number;
    /** The path stroke width, i.e how thick the line is. */
    width?: number;
    /** The color of the path */
    color?: string;
    /** Determines if the arc curves to the left or right */
    curveDirection?: CurveDirection;
    /**
     * Boolean value that controls if a directional arrow is drawn instead of line-caps.
     * When arrow is set to "true", the vector between x1, y1 and x2, y2 will have the
     * Line-caps replaced with a directional arrow. Arrowheads can be sized using the
     * arrowWidth and arrowHeight property.
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
     * Controls the angle of the offset from the center of the line.
     */
    position?: number;
    /** Display the path selected */
    selected?: boolean;
    /** Display the path muted */
    muted?: boolean;
    /** Display the path or not */
    invisible?: boolean;
    /** CSS class to put on the end */
    classed?: string;
    /** Callback which is called when the user selects this path */
    onSelectionChange?: (type: string, id: string) => void;
}
/**
 * This component draws a curved path between a source and target. The
 * source and target are specified as props x1, y1 and x2, y2.
 *
 * The curve of the path arcs through a point offset from the mid-point
 * of the line between source and target. This is specified as the prop
 * `offset`. The offset may curve "left" or "right" as specified as `curveDirection`.
 *
 * An arrow may be added by passing an 'arrow' prop of true and may be
 * customized by supplying `arrowWidth` and/or `arrowHeight`. It defaults to
 * being the `width * 1.5` wide and `width * 2` long.
 *
 * Stroke `color` and `width` can also be supplied.
 */
export declare const ArcPath: (props: ArcPathProps) => ReactElement;
