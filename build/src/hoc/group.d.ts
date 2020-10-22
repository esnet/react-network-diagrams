/**
 *  Copyright (c) 2015 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { FieldValue } from "../components/Form";
import "../style/group.css";
import "../style/icon.css";
/**
 * Groups are intended to be used within the `Form` and provide a shorthand
 * method of adding a widget and its label to a form, including support for
 * managing missing and error fields automatically and inline editing.
 *
 * A group has two main purposes:
 *
 *  * Wrap a form widget such that it is shown with a label and arranged
 *    within a flexbox horizontal layout.
 *  * Expect standard props that are added to each of the wrapped form
 *    components (attrName, placeholder, validation etc) as a 'attr' object.
 *
 * Within ESDB we display the same form layout for each form element over and over.
 * This component is used to reduce all that boiler plate code. As such this
 * component is pretty hard coded in terms of its layout. The Group is also meant
 * to be used with a `Form`. This provides a `getAttrProps()` call that extracts
 * data such as existing formValues, meta info such as label name, placeholder
 * name, etc. In addition it also supplies callbacks for missing and error counts
 * as well as value changed that are attached to functions that callback into the
 * users code.
 */
export interface FormGroupProps {
    name?: string;
    width?: number;
    field?: string;
    label?: string;
    labelWidth?: number;
    isBeingEdited?: boolean;
    isRequired?: boolean;
    showRequired?: boolean;
    isDisabled?: boolean;
    value?: FieldValue;
    initialValue?: FieldValue;
    displayView?: string | ((value: FieldValue) => React.ReactElement<any>);
    placeholder?: string;
    help?: string;
    validation?: any;
    isHidden?: boolean;
    isSelected?: boolean;
    allowEdit?: boolean;
    layout?: string;
    onSelectItem?: (fieldName: string | undefined) => void;
    onErrorCountChange?: (fieldName: string | undefined, count: number) => void;
    onMissingCountChange?: (fieldName: string | undefined, count: number) => void;
    onChange?: (fieldName: string | undefined, d: any) => void;
    onBlur?: (fieldName: string | undefined) => void;
    onEditItem?: (fieldName: string | undefined) => void;
}
export interface FormGroupState {
    error: boolean;
    over: boolean;
}
export declare function formGroup<ControlProps>(Control: any): (props: FormGroupProps & ControlProps) => JSX.Element;
