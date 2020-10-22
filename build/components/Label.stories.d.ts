import React, { ReactElement } from "react";
import { VerticalAlign, LabelProps, TextAnchor, LabelPosition } from "./Label";
declare const _default: {
    title: string;
    component: (props: LabelProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    argTypes: {
        angle: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        labelPosition: {
            control: {
                options: string[];
                type: string;
            };
        };
        labelTextAnchor: {
            control: {
                options: string[];
                type: string;
            };
        };
        textVerticalAlign: {
            control: {
                options: string[];
                type: string;
            };
        };
        x: {
            control: {
                max: number;
                min: number;
                step: number;
                type: string;
            };
        };
        y: {
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
    (args: LabelProps): ReactElement;
    args: {
        angle: number;
        id: string;
        label: string;
        labelTextAnchor: TextAnchor;
        textVerticalAlign: VerticalAlign;
        x: number;
        y: number;
    };
};
export declare const position: {
    (args: LabelProps): ReactElement;
    args: {
        angle: number;
        id: string;
        label: string;
        labelPosition: LabelPosition;
        labelRadialDistance: number;
        x: number;
        y: number;
    };
};
