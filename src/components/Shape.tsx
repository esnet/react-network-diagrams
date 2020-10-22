/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { SelectableStyle } from "./types";
import { Label, LabelPosition, LABEL_DEFAULT_STYLE } from "./Label";

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

const SHAPE_DEFAULT_STYLE: SelectableStyle = {
    normal: { fill: "none", stroke: "#DBDBDB", strokeWidth: 4 },
    selected: { fill: "none", stroke: "#B1B1B1", strokeWidth: 6 },
    muted: { fill: "none", stroke: "#DBDBDB", strokeWidth: 2, opacity: 0.6, cursor: "pointer" },
};

const DEFAULT_STYLE: ShapeStyle = {
    shape: SHAPE_DEFAULT_STYLE,
    label: LABEL_DEFAULT_STYLE,
};

export enum ShapeType {
    Circle = 1,
    Square,
    Cloud,
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
export const Shape = (props: ShapeProps) => {
    const {
        id,
        label,
        x,
        y,
        radius = 5,
        rx = 0,
        ry = 0,
        shape = ShapeType.Circle,
        labelPosition = LabelPosition.Top,
        labelOffsetX = 0,
        labelOffsetY = 0,
        style = DEFAULT_STYLE,
        selected = false,
        highlighted = false,
        muted = false,
        onSelectionChange,
        onMouseDown,
    } = props;

    const handMouseClick = (e: any) => {
        e.stopPropagation();
        if (onSelectionChange) {
            onSelectionChange("node", id);
        }
    };

    const handleMouseOver = () => {};

    const handleMouseDown = (e: any) => {
        e.stopPropagation();
        if (onMouseDown) {
            onMouseDown(id, e);
        }
    };

    let shapeClasses = "shape";
    let labelClasses = "shape-label";
    let styleModifier = "normal";

    if (selected) {
        styleModifier = "selected";
        shapeClasses += " selected";
        labelClasses += " selected";
    }
    if (muted) {
        styleModifier = "muted";
        shapeClasses += " muted";
        labelClasses += " muted";
    }
    if (highlighted) {
        styleModifier = "highlighted";
        shapeClasses += " highlighted";
        labelClasses += " highlighted";
    }

    // Label position is adjusted below to accound for different shapes
    // Those adjustments are held in the deltaLabel variables
    let deltaLabelX = labelOffsetX;
    let deltaLabelY = labelOffsetY;

    let shapeElement;
    if (shape === ShapeType.Cloud) {
        shapeClasses += " shape-cloud";
        labelClasses += " shape-label-cloud";

        let cloudPath = `M${x},${y + 5}`;
        cloudPath += "l-25,0 c-10,0 -10,-10 -5,-15";
        cloudPath += "c5,-5 15,-5 15,0 c0,-15 25,-15 25,-5 c10,-10 25,15 10,20 Z";

        shapeElement = (
            <path d={cloudPath} style={style.shape[styleModifier]} className={shapeClasses} />
        );

        switch (labelPosition) {
            case LabelPosition.Top:
            case LabelPosition.TopRight:
            case LabelPosition.TopLeft:
                deltaLabelY += 7;
                break;
            case LabelPosition.Bottom:
            case LabelPosition.BottomLeft:
            case LabelPosition.BottomRight:
                deltaLabelY -= 15;
                break;
            default:
                break;
        }
        deltaLabelX -= 3;
    } else if (shape === ShapeType.Square) {
        shapeClasses += " shape-square";
        labelClasses += " shape-shape-square";
        const posx = x - radius;
        const posy = y - radius;
        const width = 2 * radius;
        shapeElement = (
            <rect
                x={posx}
                y={posy}
                rx={rx}
                ry={ry}
                width={width}
                height={width}
                style={style.shape[styleModifier]}
                className={shapeClasses}
            />
        );

        switch (labelPosition) {
            case LabelPosition.Left:
                deltaLabelX -= 2;
                break;
            case LabelPosition.Right:
                deltaLabelX += 2;
                break;
            default:
                break;
        }
    } else {
        shapeClasses += " shape-circle";
        labelClasses += " label-circle";
        shapeElement = (
            <circle
                cx={x}
                cy={y}
                r={radius}
                style={style.shape[styleModifier]}
                className={shapeClasses}
            />
        );
    }

    let labelElement;
    if (label) {
        labelElement = (
            <Label
                label={label}
                x={x + deltaLabelX}
                y={y + deltaLabelX}
                xOffset={deltaLabelX}
                yOffset={deltaLabelY}
                labelPosition={labelPosition}
                labelRadialDistance={radius + 3}
                labelClassed={labelClasses}
                style={style.label[styleModifier]}
            />
        );
    }

    return (
        <g onClick={handMouseClick} onMouseOver={handleMouseOver} onMouseDown={handleMouseDown}>
            {shapeElement}
            {labelElement}
        </g>
    );
};
