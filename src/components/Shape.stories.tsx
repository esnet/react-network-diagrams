import React, { ReactElement } from "react";
import { LabelPosition } from "./Label";

import { Shape, ShapeProps, ShapeType } from "./Shape";

export default {
    title: "Primitives/Shape",
    component: Node,
    argTypes: {
        x: {
            control: {
                type: "range",
                min: 20,
                max: 200,
                step: 1,
            },
        },
        y: {
            control: {
                type: "range",
                min: 20,
                max: 200,
                step: 1,
            },
        },
        labelPosition: {
            control: {
                type: "select",
                options: ["Top", "Bottom", "Left", "Right"],
            },
        },
        radius: {
            control: {
                type: "range",
                min: 5,
                max: 20,
                step: 1,
            },
        },
        rx: {
            control: {
                type: "range",
                min: 0,
                max: 10,
                step: 0.1,
            },
        },
        ry: {
            control: {
                type: "range",
                min: 0,
                max: 10,
                step: 0.1,
            },
        },
    },
};

export const basic = (args: ShapeProps): ReactElement => (
    <svg width={300} height={300}>
        <Shape
            id={args.id}
            x={args.x}
            y={args.y}
            radius={args.radius}
            label={args.label}
            labelPosition={args.labelPosition}
        />
    </svg>
);

basic.args = {
    id: "1234",
    label: "CHIC-CR5",
    labelPosition: LabelPosition.Top,
    x: 50,
    y: 70,
    radius: 5,
};

export const box = (args: ShapeProps): ReactElement => (
    <svg width={300} height={300}>
        <Shape
            id={args.id}
            x={args.x}
            y={args.y}
            rx={args.rx}
            ry={args.ry}
            radius={args.radius}
            label={args.label}
            labelPosition={args.labelPosition}
            shape={args.shape}
        />
    </svg>
);

box.args = {
    id: "1234",
    label: "CHIC-CR5",
    labelPosition: LabelPosition.Top,
    x: 125,
    y: 70,
    rx: 2,
    ry: 2,
    radius: 15,
    shape: ShapeType.Square,
};
