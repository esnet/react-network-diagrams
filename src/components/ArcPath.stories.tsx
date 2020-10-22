import React, { ReactElement } from "react";
import { ArcPath, ArcPathProps } from "./ArcPath";
import { VerticalAlign } from "./Label";
import { CurveDirection } from "./types";

/* eslint-disable sort-keys */

export default {
    title: "Paths/ArcPath",
    component: Node,
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
        x1: {
            control: {
                max: 300,
                min: 20,
                step: 1,
                type: "range",
            },
        },
        x2: {
            control: {
                max: 750,
                min: 400,
                step: 1,
                type: "range",
            },
        },
        y1: {
            control: {
                max: 250,
                min: 20,
                step: 1,
                type: "range",
            },
        },
        y2: {
            control: {
                max: 250,
                min: 20,
                step: 1,
                type: "range",
            },
        },
    },
};

export const basic = (args: ArcPathProps): ReactElement => (
    <svg width={900} height={300}>
        <ArcPath
            id={args.id}
            x1={args.x1}
            y1={args.y1}
            x2={args.x2}
            y2={args.y2}
            label={args.label}
            width={args.width}
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
    arrow: false,
    color: "steelblue",
    id: "1234",
    label: "CHIC-CR5",
    curveDirection: CurveDirection.Right,
    labelVerticalAlign: VerticalAlign.Top,
    offset: 40,
    position: -15,
    width: 3,
    x1: 200,
    x2: 700,
    y1: 75,
    y2: 250,
};
