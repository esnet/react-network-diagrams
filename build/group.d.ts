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
import "./style/group.css";
import "./style/icon.css";
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
    hidden: boolean;
    width: number;
    name: string;
    label: string;
    labelWidth: number;
    key: string;
    edit: boolean;
    disabled: boolean;
    required: boolean;
    error: boolean;
    showRequired: boolean;
    onSelectItem: (name: string) => any;
    value: string | number;
    initialValue: string | number;
    layout: string;
}
export interface FormGroupState {
    error: boolean;
    over: boolean;
}
export declare function formGroup(Control: any): {
    new (props: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends "error" | "over">(state: FormGroupState | ((prevState: Readonly<FormGroupState>, props: Readonly<FormGroupProps>) => FormGroupState | Pick<FormGroupState, K> | null) | Pick<FormGroupState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<FormGroupProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<FormGroupState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<FormGroupProps>, nextState: Readonly<FormGroupState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<FormGroupProps>, prevState: Readonly<FormGroupState>): any;
        componentDidUpdate?(prevProps: Readonly<FormGroupProps>, prevState: Readonly<FormGroupState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<FormGroupProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<FormGroupProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<FormGroupProps>, nextState: Readonly<FormGroupState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<FormGroupProps>, nextState: Readonly<FormGroupState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
