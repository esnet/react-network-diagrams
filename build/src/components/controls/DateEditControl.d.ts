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
import "react-datepicker/dist/react-datepicker.css";
import { FormGroupProps } from "../../hoc/group";
import { FieldValue } from "../Form";
import "./styles.css";
export interface DateEditProps {
    /**
     * Allow picking of month and year only
     */
    monthPicker?: boolean;
    /**
     * Allow picking of day, month, year and time
     */
    timePicker?: boolean;
    /**
     * Earliest date allowed to be selected
     */
    minDate?: Date;
    /**
     * Latest date allowed to be selected
     */
    maxDate?: Date;
    /**
     * Required on all Controls
     */
    field: string;
    /**
     * Customize the horizontal size of the Chooser
     */
    width: number;
    /**
     * Show the Chooser itself as disabled
     */
    isDisabled?: boolean;
    /**
     * Optional view component to render when the field
     * isn't being editted.
     */
    displayView?: string | ((value: FieldValue) => React.ReactElement<any>);
}
/**
 * A `DateEditGroup` is a `TagsControl` wrapped by the `formGroup()` HOC. This is the
 * component which can be rendered by the Form when the user adds a `DateEdit` to their `Form`.
 */
export declare const DateEditGroup: (props: FormGroupProps & DateEditProps) => JSX.Element;
/**
 * Form control to select a date from a picker.
 */
export declare const DateEdit: FunctionComponent<DateEditProps>;
