import React, { ReactElement } from "react";

import { Label, VerticalAlign, LabelProps, TextAnchor, LabelPosition } from "./Label";

/* eslint-disable sort-keys */

export default {
    title: "Primitives/Label",
    component: Label,
    argTypes: {
        angle: {
            control: {
                max: 360,
                min: 0,
                step: 15,
                type: "range",
            },
        },
        labelPosition: {
            control: {
                options: [
                    "Top",
                    "Bottom",
                    "Left",
                    "Right",
                    "TopLeft",
                    "TopRight",
                    "BottomLeft",
                    "BottomRight",
                    "TopLeftAngled",
                    "TopRightAngled",
                    "BottomLeftAngled",
                    "BottomRightAngled",
                ],
                type: "select",
            },
        },
        labelTextAnchor: {
            control: {
                options: ["Start", "Middle", "End"],
                type: "select",
            },
        },
        textVerticalAlign: {
            control: {
                options: ["Top", "Bottom", "Center"],
                type: "select",
            },
        },
        x: {
            control: {
                max: 200,
                min: 20,
                step: 1,
                type: "range",
            },
        },
        y: {
            control: {
                max: 200,
                min: 20,
                step: 1,
                type: "range",
            },
        },
    },
};

export const basic = (args: LabelProps): ReactElement => (
    <svg width={300} height={300}>
        <line x1="0" y1={args.y} x2="300" y2={args.y} stroke="bisque" />
        <line x1={args.x} y1="0" x2={args.x} y2="300" stroke="bisque" />
        <Label
            debug
            x={args.x}
            y={args.y}
            angle={args.angle}
            label={args.label}
            textVerticalAlign={args.textVerticalAlign}
            labelTextAnchor={args.labelTextAnchor}
        />
    </svg>
);

basic.args = {
    angle: 0,
    id: "1234",
    label: "Chicago",
    labelTextAnchor: TextAnchor.Start,
    textVerticalAlign: VerticalAlign.Top,
    x: 100,
    y: 100,
};

export const position = (args: LabelProps): ReactElement => (
    <svg width={300} height={300}>
        <line x1="0" y1={args.y} x2="300" y2={args.y} stroke="bisque" />
        <line x1={args.x} y1="0" x2={args.x} y2="300" stroke="bisque" />
        <circle cx={args.x} cy={args.y} r={args.labelRadialDistance} stroke="bisque" fill="none" />
        <Label
            debug
            x={args.x}
            y={args.y}
            label={args.label}
            labelPosition={args.labelPosition}
            labelRadialDistance={args.labelRadialDistance}
        />
    </svg>
);

position.args = {
    angle: 0,
    id: "1234",
    label: "New York",
    labelPosition: LabelPosition.BottomRight,
    labelRadialDistance: 20,
    x: 100,
    y: 100,
};
