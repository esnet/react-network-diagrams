import React, { ReactElement } from "react";
import { BidirectionalPath, BidirectionalPathProps } from "./BidirectionalPath";
import { VerticalAlign } from "./Label";
import { PathShape } from "./Path";
import { CurveDirection } from "./types";

/* eslint-disable sort-keys */

export default {
    title: "Paths/BidirectionalPath",
    component: BidirectionalPath,
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
        shape: {
            control: {
                options: ["Linear", "Curved"],
                type: "select",
            },
        },
        curveOffset: {
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

interface CrossHairsProps {
    x: number;
    y: number;
    size?: number;
}

const CrossHairs = (props: CrossHairsProps) => {
    const { x, y, size = 25 } = props;
    return (
        <g>
            <line x1={x - size} y1={y} x2={x + size} y2={y} stroke="bisque" />
            <line x1={x} y1={y - size} x2={x} y2={y + size} stroke="bisque" />
        </g>
    );
};

export const basic = (args: BidirectionalPathProps): ReactElement => (
    <svg width={900} height={300}>
        <CrossHairs x={args.x1} y={args.y1} />
        <CrossHairs x={args.x2} y={args.y2} />

        <BidirectionalPath
            id={args.id}
            x1={args.x1}
            y1={args.y1}
            x2={args.x2}
            y2={args.y2}
            sourceTargetWidth={args.width}
            targetSourceWidth={args.width}
            shape={args.shape}
            curveOffset={args.curveOffset}
            curveDirection={args.curveDirection}
        />
    </svg>
);

basic.args = {
    arrow: false,
    color: "steelblue",
    id: "1234",
    shape: PathShape.Curved,
    curveDirection: CurveDirection.Left,
    curveOffset: 40,
    position: -15,
    width: 3,
    x1: 50,
    x2: 520,
    y1: 140,
    y2: 80,
};
