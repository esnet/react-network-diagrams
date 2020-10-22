import React, { ReactElement } from "react";
import { VerticalAlign } from "./Label";
import { LinearPath, LinearPathProps } from "./LinearPath";

/* eslint-disable sort-keys */

export default {
    title: "Paths/LinearPath",
    component: Node,
    argTypes: {
        color: {
            control: {
                type: "color",
            },
        },
        labelVerticalAlign: {
            control: {
                options: ["Top", "Bottom"],
                type: "select",
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

export const basic = (args: LinearPathProps): ReactElement => (
    <svg width={600} height={300}>
        <LinearPath
            id={args.id}
            x1={args.x1}
            y1={args.y1}
            x2={args.x2}
            y2={args.y2}
            label={args.label}
            width={args.width}
            labelVerticalAlign={args.labelVerticalAlign}
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
    labelVerticalAlign: VerticalAlign.Bottom,
    position: 15,
    thickness: 1.5,
    x1: 100,
    x2: 500,
    y1: 70,
    y2: 70,
};
