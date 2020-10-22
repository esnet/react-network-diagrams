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
import { SelectableStyle } from "./types";
export declare enum VerticalAlign {
    Top = "Top",
    Bottom = "Bottom",
    Center = "Center"
}
export declare enum TextAnchor {
    Start = "Start",
    "Middle" = "Middle",
    "End" = "End"
}
export declare enum LabelPosition {
    Top = "Top",
    Bottom = "Bottom",
    Left = "Left",
    Right = "Right",
    TopLeft = "TopLeft",
    TopRight = "TopRight",
    BottomLeft = "BottomLeft",
    BottomRight = "BottomRight",
    TopLeftAngled = "TopLeftAngled",
    TopRightAngled = "TopRightAngled",
    BottomLeftAngled = "BottomLeftAngled",
    BottomRightAngled = "BottomRightAngled"
}
export declare const LABEL_DEFAULT_STYLE: SelectableStyle;
export interface LabelProps {
    /**
     * Used as the rendered text key
     */
    id?: string;
    /**
     * The label text itself.
     */
    label: string;
    /**
     * Position of the label, radially, from the x and y center
     */
    labelPosition?: LabelPosition;
    /**
     * The distance from the x and y center to the origin of the label. Works in
     * conjunction with the `labelPosition` to situate the label relative to
     * another object such as a `Node`
     */
    labelRadialDistance?: number;
    /**
     * The x position the label is positioned relative to.
     */
    x?: number;
    /**
     * The y position the label is positioned relative to.
     */
    y?: number;
    /**
     * The angle of rotation
     */
    angle?: number;
    /**
     * One of the possible set positions to render the label relative to the center
     */
    textVerticalAlign?: VerticalAlign;
    /**
     * Horizontal distance from the center line to offset the connection label.
     */
    xOffset?: number;
    /**
     * Vertical distance from the center line to offset the connection label.
     */
    yOffset?: number;
    /**
     * CSS text anchor position. Possible values are "start", "middle" or "end".
     */
    labelTextAnchor?: TextAnchor;
    /**
     * The CSS style of the SVG label text
     */
    style?: React.CSSProperties;
    /**
     * Bounding box offset
     */
    bboxOffset?: number;
    /**
     * Put a class on the label
     */
    labelClassed?: string;
    /**
     * Debug bounding box rendering
     */
    debug?: boolean;
}
/**
 * Gets an `x`, `y`, `labelPosition`, `labelTextAnchor` and an `angle` and renders a label based on the position.
 * The label should be a string. Alternatively a `labelPosition` and `labelRadialDistance` can be used (e.g.)
 * "topleft" 12px from the x,y center would display the label in the top left corner of a shape.
 */
export declare const Label: (props: LabelProps) => ReactElement;
