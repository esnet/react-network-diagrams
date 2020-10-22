/**
 *  Copyright (c) 2015 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import React, { FunctionComponent } from "react";
import { FormGroupProps } from "../../hoc/group";
import "../../style/textedit.css";
import { FieldValue } from "../Form";
export interface TextEditProps {
    /**
     * Required on all Controls
     */
    field: string;
    /**
     * Customize the horizontal size of the TextEdit box
     */
    width?: number;
    /**
     * The TextEdit type, such as "password" (standard html text input widget types)
     */
    type?: string;
    /**
     * Rules to apply
     */
    rules?: any;
    /**
     * Optional view component to render when the field
     * isn't being editted.
     */
    view?: (value: FieldValue) => React.ReactElement<any>;
}
export declare type TextEditControlProps = TextEditProps & FormGroupProps;
/**
 * A `TextEditGroup` is a `TextEditControl` wrapped by the `formGroup()` HOC. This is the
 * component which can be rendered by the Form when the user adds a `TextEdit` to their `Form`.
 */
export declare const TextEditGroup: (props: FormGroupProps & TextEditProps) => JSX.Element;
/**
 * A control which allows the user to type into a single line input control
 */
export declare const TextEdit: FunctionComponent<TextEditProps>;
