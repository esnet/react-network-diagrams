import React, { ReactElement } from "react";
import { BidirectionalPathProps } from "./BidirectionalPath";
import { PathShape } from "./Path";
import { CurveDirection } from "./types";
declare const _default: {
    title: string;
    component: (props: BidirectionalPathProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
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
        shape: {
            control: {
                options: string[];
                type: string;
            };
        };
        curveOffset: {
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
    (args: BidirectionalPathProps): ReactElement;
    args: {
        arrow: boolean;
        color: string;
        id: string;
        shape: PathShape;
        curveDirection: CurveDirection;
        curveOffset: number;
        position: number;
        width: number;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
};
