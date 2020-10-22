import { ReactElement } from "react";
import { LabelPosition } from "./Label";
import { ShapeProps, ShapeType } from "./Shape";
declare const _default: {
    title: string;
    component: {
        new (): Node;
        prototype: Node;
        readonly ATTRIBUTE_NODE: number;
        readonly CDATA_SECTION_NODE: number;
        readonly COMMENT_NODE: number;
        readonly DOCUMENT_FRAGMENT_NODE: number;
        readonly DOCUMENT_NODE: number;
        readonly DOCUMENT_POSITION_CONTAINED_BY: number;
        readonly DOCUMENT_POSITION_CONTAINS: number;
        readonly DOCUMENT_POSITION_DISCONNECTED: number;
        readonly DOCUMENT_POSITION_FOLLOWING: number;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
        readonly DOCUMENT_POSITION_PRECEDING: number;
        readonly DOCUMENT_TYPE_NODE: number;
        readonly ELEMENT_NODE: number;
        readonly ENTITY_NODE: number;
        readonly ENTITY_REFERENCE_NODE: number;
        readonly NOTATION_NODE: number;
        readonly PROCESSING_INSTRUCTION_NODE: number;
        readonly TEXT_NODE: number;
    };
    argTypes: {
        x: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
        y: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
        labelPosition: {
            control: {
                type: string;
                options: string[];
            };
        };
        radius: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
        rx: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
        ry: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
        };
    };
};
export default _default;
export declare const basic: {
    (args: ShapeProps): ReactElement;
    args: {
        id: string;
        label: string;
        labelPosition: LabelPosition;
        x: number;
        y: number;
        radius: number;
    };
};
export declare const box: {
    (args: ShapeProps): ReactElement;
    args: {
        id: string;
        label: string;
        labelPosition: LabelPosition;
        x: number;
        y: number;
        rx: number;
        ry: number;
        radius: number;
        shape: ShapeType;
    };
};
