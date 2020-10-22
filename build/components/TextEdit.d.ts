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
import "../style/textedit.css";
import { FieldEditorProps, FieldValue } from "./Form";
interface Props {
    type: string;
    rules: any;
    view: (value: FieldValue) => React.ReactElement<any>;
}
export interface TextEditState {
    value: FieldValue;
    oldValue: FieldValue;
    isFocused: boolean;
    touched: boolean;
    selectText: boolean;
    hover: boolean;
}
export declare type TextEditProps = Props & FieldEditorProps;
declare const _default: {
    new (props: any): {
        render(): JSX.Element;
        context: any;
        setState<K extends "error" | "over">(state: import("../group").FormGroupState | ((prevState: Readonly<import("../group").FormGroupState>, props: Readonly<import("../group").FormGroupProps>) => import("../group").FormGroupState | Pick<import("../group").FormGroupState, K> | null) | Pick<import("../group").FormGroupState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<import("../group").FormGroupProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<import("../group").FormGroupState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<import("../group").FormGroupProps>, nextState: Readonly<import("../group").FormGroupState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<import("../group").FormGroupProps>, prevState: Readonly<import("../group").FormGroupState>): any;
        componentDidUpdate?(prevProps: Readonly<import("../group").FormGroupProps>, prevState: Readonly<import("../group").FormGroupState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<import("../group").FormGroupProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<import("../group").FormGroupProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<import("../group").FormGroupProps>, nextState: Readonly<import("../group").FormGroupState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<import("../group").FormGroupProps>, nextState: Readonly<import("../group").FormGroupState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
export default _default;
