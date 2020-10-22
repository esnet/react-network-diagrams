import React, { ReactElement } from "react";
import { PathProps, PathShape } from "./Path";
import { VerticalAlign } from "./Label";
import { CurveDirection } from "./types";
declare const _default: {
    title: string;
    component: {
        (props: PathProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
        defaultProps: {
            color: string;
            width: number;
            position: number;
            selected: boolean;
            muted: boolean;
            invisible: boolean;
            arrow: boolean;
            fillColor: string;
        };
    };
    argTypes: {
        color: {
            control: {
                type: string;
            };
        };
        curveDirection: {
            control: {
                options: string[];
                type: string;
            };
        };
        labelVerticalAlign: {
            control: {
                options: string[];
                type: string;
            };
        };
        shape: {
            control: {
                options: string[];
                type: string;
            };
        };
        offset: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        position: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        width: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        size: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        x1: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        x2: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        y1: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        y2: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
    };
};
export default _default;
export declare const basic: {
    (args: PathProps): ReactElement;
    args: {
        shape: PathShape;
        arrow: boolean;
        color: string;
        id: string;
        label: string;
        curveDirection: CurveDirection;
        labelVerticalAlign: VerticalAlign;
        offset: number;
        position: number;
        width: number;
        size: number;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
};
