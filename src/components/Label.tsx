/**
 *  Copyright (c) 2018-2020, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { ReactElement, useLayoutEffect, useRef, useState } from "react";
import { SelectableStyle } from "./types";

export enum VerticalAlign {
    Top = "Top",
    Bottom = "Bottom",
    Center = "Center",
}

export enum TextAnchor {
    Start = "Start",
    "Middle" = "Middle",
    "End" = "End",
}

export enum LabelPosition {
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
    BottomRightAngled = "BottomRightAngled",
}

export const LABEL_DEFAULT_STYLE: SelectableStyle = {
    muted: {
        fill: "#696969",
        fontSize: 9,
        opacity: 0.6,
        stroke: "none",
    },
    normal: {
        fill: "#9D9D9D",
        fontFamily: "verdana, sans-serif",
        fontSize: 10,
    },
    selected: {
        fill: "#333",
        fontSize: 11,
        stroke: "none",
    },
};

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
export const Label = (props: LabelProps): ReactElement => {
    const {
        id = "label",
        label,
        x = 0,
        y = 0,
        angle = 0,
        labelRadialDistance = 5,
        labelPosition,
        labelTextAnchor = TextAnchor.Middle,
        textVerticalAlign = VerticalAlign.Center,
        xOffset = 0,
        yOffset = 0,
        bboxOffset = 0,
        style = {},
        labelClassed,
        debug = false,
    } = props;

    let labelX = x;
    let labelY = y;
    let labelR = angle;

    // Default rotation
    let rotate = `rotate(${labelR} ${labelX}, ${labelY})`;

    // Determine the bounding box of the label so we can style that
    const ref = useRef<SVGTextElement>(null);

    const useDims = (labelRef: React.RefObject<SVGTextElement>) => {
        const [dim, setDim] = useState({
            x: 0,
            y: 0,
            height: 0,
            width: 0,
        });

        useLayoutEffect(() => {
            if (labelRef && labelRef.current) {
                const { height: bbh, width: bbw, x: bbx, y: bby } = labelRef.current.getBBox();
                const boundingBox = { x: bbx, y: bby, width: bbw, height: bbh };
                if (JSON.stringify(dim) !== JSON.stringify(boundingBox)) {
                    setDim(boundingBox);
                }
            }
        });

        return dim;
    };

    // Get the bounding bbox with each time it renders
    const bbox = useDims(ref);

    // Quick and dirty guage as to the size of the font
    const halfLabelHeight = bbox.height / 2;

    let textAnchor = "start";
    switch (labelTextAnchor) {
        case TextAnchor.Start:
            textAnchor = "start";
            break;

        case TextAnchor.End:
            textAnchor = "end";
            break;

        case TextAnchor.Middle:
            textAnchor = "middle";
            break;
    }

    // If a labelPostion is specified then we set the postion relative to the x,y
    // supplied by the user. We also automatically determine the anchor and rotation.
    if (labelPosition) {
        const d = Math.sqrt((labelRadialDistance * labelRadialDistance) / 2);
        switch (labelPosition) {
            case LabelPosition.Left:
                labelX -= labelRadialDistance;
                labelY += 5;
                textAnchor = "end";
                break;

            case LabelPosition.Right:
                labelX += labelRadialDistance;
                labelY += 5;
                textAnchor = "start";
                break;

            case LabelPosition.Top:
                labelY -= labelRadialDistance + 4;
                break;

            case LabelPosition.TopRight:
                labelY -= d;
                labelX += d;
                textAnchor = "start";
                break;

            case LabelPosition.TopLeft:
                labelY -= d;
                labelX -= d;
                textAnchor = "end";
                break;

            case LabelPosition.Bottom:
                labelY += labelRadialDistance + halfLabelHeight + 6;
                break;

            case LabelPosition.BottomRight:
                labelY += d + halfLabelHeight;
                labelX += d;
                textAnchor = "start";
                break;

            case LabelPosition.BottomLeft:
                labelY += d + halfLabelHeight;
                labelX -= d;
                textAnchor = "end";
                break;

            case LabelPosition.BottomLeftAngled:
                labelX += 2;
                labelY += d + halfLabelHeight;
                labelR = -45;
                rotate = `rotate(${labelR} ${labelX}, ${labelY})`;
                textAnchor = "end";
                break;

            case LabelPosition.BottomRightAngled:
                labelX -= 2;
                labelY += d + halfLabelHeight;
                labelR = 45;
                rotate = `rotate(${labelR} ${labelX}, ${labelY})`;
                textAnchor = "start";
                break;

            case LabelPosition.TopLeftAngled:
                labelY -= d;
                labelR = 45;
                rotate = `rotate(${labelR} ${labelX}, ${labelY})`;
                textAnchor = "end";
                break;

            case LabelPosition.TopRightAngled:
                labelY -= d;
                labelR = -45;
                rotate = `rotate(${labelR} ${labelX}, ${labelY})`;
                textAnchor = "start";
                break;

            default:
                break;
        }

        labelX += xOffset;
        labelY += yOffset;
    } else {
        // Y position, based on the specified vertical alignment
        switch (textVerticalAlign) {
            case VerticalAlign.Top:
                labelY = y - yOffset;
                break;

            case VerticalAlign.Bottom:
                labelY = y + yOffset + halfLabelHeight + 2;
                break;

            case VerticalAlign.Center:
                labelY = y + halfLabelHeight / 2 + yOffset;
                break;
            default:
                break;
        }

        // X position is just the `x` prop, offset by the `xOffset` if there is one
        labelX += xOffset;
    }

    const box =
        bbox && debug ? (
            <rect
                transform={rotate}
                x={bbox.x - bboxOffset}
                y={bbox.y - bboxOffset}
                width={bbox.width + bboxOffset * 2}
                height={bbox.height + bboxOffset * 2}
                style={{ stroke: "bisque", fill: "none" }}
            />
        ) : null;

    const text = (
        <text ref={ref} textAnchor={textAnchor} style={style} key={id} transform={rotate} className={labelClassed}>
            <tspan x={labelX} y={labelY} key={"label-line"}>
                {label}
            </tspan>
        </text>
    );

    return (
        <g>
            {box}
            {text}
        </g>
    );
};
