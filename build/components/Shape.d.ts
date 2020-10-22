/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import { SelectableStyle } from "./types";
import { LabelPosition } from "./Label";
/**
 * Example:
 * ```
 * const shapeStyle = {
 *     shape: {
 *         normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
 *         selected: {fill: "none", stroke: "#B1B1B1", strokeWidth: 6},
 *         muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2, opacity: 0.6, cursor: "pointer"}
 *     },
 *     label: {
 *         normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
 *         selected: {fill: "#333",stroke: "none", fontSize: 11},
 *         muted: {fill: "#696969", stroke: "none", fontSize: 9, opacity: 0.6}
 *     }
 * }
 * ```
 */
export interface ShapeStyle {
    shape: SelectableStyle;
    label: SelectableStyle;
}
export declare enum ShapeType {
    Circle = 1,
    Square = 2,
    Cloud = 3
}
export interface ShapeProps {
    id: string;
    x: number;
    y: number;
    /**
     * Base offset to move label away from center of the Shape. If not supplied
     * one will be determined automatically
     */
    offset?: number;
    /**
     * When the shape is a `circle`, this controls the size of that circle
     */
    radius?: number;
    /**
     * When the shape is a `square`, this controls the radius of corners
     */
    rx?: number;
    /**
     * When the shape is a `square`, this controls the radius of corners
     */
    ry?: number;
    /**
     * The type of the shape, which is one of:
     *  * `ShapeType.Circle`
     *  * `ShapeType.Square`
     *  * `ShapeType.Cloud`
     */
    shape?: ShapeType;
    /**
     * The text label to display next to the Shape
     */
    label?: string;
    /**
     * The positioning of the label. e.g. `LabelPosition.TopRight`
     */
    labelPosition?: LabelPosition;
    /**
     * The label will be automatically positioned, but you can also add
     * an offset to it to tweak the positioning for specific cases.
     */
    labelOffsetX?: number;
    /**
     * The label will be automatically positioned, but you can also add
     * an offset to it to tweak the positioning for specific cases.
     */
    labelOffsetY?: number;
    /**
     * The style of the `Shape` has two components, one for the
     * shape itself and one for the label. Each group has three
     * different possible options depending on the way the
     * shape should be rendered:
     *
     *  * `normal` provides the standard view of the shape
     *  * `selected` for when the shape is moused over
     *  * `muted` for when the shape is not selected, but something else is.
     *
     * For example:
     *
     * ```
     * const shapeStyle = {
     *     shape: {
     *         normal: {fill: "none", stroke: "#DBDBDB", strokeWidth: 4},
     *         selected: {fill: "none", stroke: "#B1B1B1", strokeWidth: 6},
     *         muted: {fill: "none", stroke: "#DBDBDB", strokeWidth: 2, opacity: 0.6, cursor: "pointer"}
     *     },
     *     label: {
     *         normal: {fill: "#9D9D9D", fontSize: 10, fontFamily: "verdana, sans-serif"},
     *         selected: {fill: "#333",stroke: "none", fontSize: 11},
     *         muted: {fill: "#696969", stroke: "none", fontSize: 9, opacity: 0.6}
     *     }
     * }
     * ```
     */
    style?: ShapeStyle;
    /**
     * Display the Shape as selected
     */
    selected?: boolean;
    /**
     * Display the Shape as highlighted
     */
    highlighted?: boolean;
    /**
     * Display the Shape as muted
     */
    muted?: boolean;
    onSelectionChange?: (type: string, id: string) => void;
    onMouseDown?: (id: string, e: any) => void;
}
/**
 * Low level primitive to render a shape, such as a circle, rectangle (with or without
 * rounded corners) or a cloud. The shape will be optionally rendered with a label
 * whose placement can be controlled with a variety of controls.
 *
 * The intention is for a `Shape` to be a visual representation of a `Node`.
 */
export declare const Shape: (props: ShapeProps) => JSX.Element;
