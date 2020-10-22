import React, { ReactElement } from "react";
import { VerticalAlign } from "./Label";
import { SquarePath, SquarePathProps } from "./SquarePath";

/* eslint-disable sort-keys */

export default {
    title: "Paths/SquarePath",
    component: SquarePath,
    parameters: {
        docs: {
            description: {
                component:
                    "The `SquarePath` is a low level component which renders a box between to points. The size of the box \
                is the distance between the two points by the supplied `size`. The box can display a center line. Such a box \
                can bbe used to display a connector. Typically you would use one of the higher level components which will also \
                provide connection point rendering.",
            },
        },
    },
    argTypes: {
        color: {
            control: {
                type: "color",
            },
        },
        fillColor: {
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
        size: {
            control: {
                max: 200,
                min: 5,
                step: 1,
                type: "range",
            },
        },
        thickness: {
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

export const basic = (args: SquarePathProps): ReactElement => (
    <svg width={600} height={300}>
        <SquarePath
            id={args.id}
            size={args.size}
            x1={args.x1}
            y1={args.y1}
            x2={args.x2}
            y2={args.y2}
            label={args.label}
            labelVerticalAlign={args.labelVerticalAlign}
            thickness={args.thickness}
            color={args.color}
            fillColor={args.fillColor}
            opacity={args.opacity}
            showCenterLine={true}
            roundedX={5}
            roundedY={5}
        />
    </svg>
);

basic.args = {
    arrow: false,
    color: "steelblue",
    fillColor: "#B4D4F0",
    opacity: 1,
    id: "1234",
    label: "CHIC-CR5",
    labelVerticalAlign: VerticalAlign.Bottom,
    position: 15,
    size: 100,
    thickness: 1.5,
    x1: 100,
    x2: 500,
    y1: 70,
    y2: 70,
};
