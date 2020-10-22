import React, { ReactElement } from "react";
import { Path, PathProps, PathShape } from "./Path";
import { VerticalAlign } from "./Label";
import { CurveDirection } from "./types";

/* eslint-disable sort-keys */

export default {
    title: "Paths/Path",
    component: Path,
    argTypes: {
        color: {
            control: {
                type: "color",
            },
        },
        curveDirection: {
            control: {
                options: ["Left", "Right"],
                type: "select",
            },
        },
        labelVerticalAlign: {
            control: {
                options: ["Top", "Bottom"],
                type: "select",
            },
        },
        shape: {
            control: {
                options: ["Curved", "Linear", "Square"],
                type: "select",
            },
        },
        offset: {
            control: {
                max: 30,
                min: 1,
                step: 1,
                type: "range",
            },
        },
        position: {
            control: {
                max: 20,
                min: -20,
                step: 1,
                type: "range",
            },
        },
        width: {
            control: {
                max: 8,
                min: 1,
                step: 0.1,
                type: "range",
            },
        },
        size: {
            control: {
                max: 8,
                min: 1,
                step: 0.1,
                type: "range",
            },
        },
        x1: {
            control: {
                max: 200,
                min: 20,
                step: 1,
                type: "range",
            },
        },
        x2: {
            control: {
                max: 480,
                min: 300,
                step: 1,
                type: "range",
            },
        },
        y1: {
            control: {
                max: 200,
                min: 20,
                step: 1,
                type: "range",
            },
        },
        y2: {
            control: {
                max: 200,
                min: 20,
                step: 1,
                type: "range",
            },
        },
    },
};

export const basic = (args: PathProps): ReactElement => (
    <svg width={600} height={300}>
        <Path
            shape={args.shape}
            id={args.id}
            x1={args.x1}
            y1={args.y1}
            x2={args.x2}
            y2={args.y2}
            label={args.label}
            width={args.width}
            size={args.size}
            offset={args.offset}
            labelVerticalAlign={args.labelVerticalAlign}
            curveDirection={args.curveDirection}
            position={args.position}
            arrow={args.arrow}
            color={args.color}
        />
    </svg>
);

basic.args = {
    shape: PathShape.Curved,
    arrow: false,
    color: "steelblue",
    id: "1234",
    label: "CHIC-CR5",
    curveDirection: CurveDirection.Left,
    labelVerticalAlign: VerticalAlign.Bottom,
    offset: 20,
    position: 15,
    width: 3,
    size: 100,
    x1: 100,
    x2: 500,
    y1: 70,
    y2: 70,
};
