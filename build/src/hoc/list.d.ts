/**
 *  Copyright (c) 2015 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import Immutable from "immutable";
import React, { ComponentType } from "react";
import { FieldValue } from "../components/Form";
export interface ListItemProps {
    key: string;
    name: string;
    innerForm: boolean;
    hideMinus: boolean;
    types: any;
    value: Immutable.Map<string, FieldValue>;
    initialValue?: Immutable.Map<string, FieldValue>;
    editable: boolean;
    edit: boolean;
    onErrorCountChange: (name: string, errorCount: number) => void;
    onMissingCountChange: (name: string, missingCOunt: number) => void;
    onChange: (name: string, value: Immutable.Map<string, FieldValue>) => void;
}
export interface ListManagerProps {
    name: string;
    initialValue: Immutable.List<Immutable.Map<string, FieldValue>>;
    value: Immutable.List<Immutable.Map<string, FieldValue>>;
    edit: boolean;
    types: any;
    canAddItems: boolean;
    canRemoveItems: boolean;
    onChange: (fieldName: string, value: Immutable.List<Immutable.Map<string, FieldValue>>) => void;
    onMissingCountChange: (fieldName: string, missingCount: number) => void;
    onErrorCountChange: (fieldName: string, errorCount: number) => void;
}
export interface ListManagerState {
    selected: number | null;
    oldValue?: Immutable.Map<string, FieldValue>;
}
/**
 * A Higher-order component -- a function that takes the item Component class and returns a new
 * Component (the ListManager) that manages a list of those components.
 */
export declare function formList(ItemComponent: ComponentType<ListItemProps>, hideEditRemove: boolean, itemButtonIndent: number, initialItemValue: Immutable.Map<string, FieldValue>): {
    new (props: ListManagerProps): {
        errors: number[];
        missing: number[];
        handleSelectItem(i: number | null): void;
        handleRevertItem(i: number): void;
        handleChangeItem(i: number, value: Immutable.Map<string, FieldValue>): void;
        handleMissingCountChange(i: number, missingCount: number): void;
        handleErrorCountChange(i: number, errorCount: number): void;
        handleRemovedItem(i: number): void;
        handleAddItem(): void;
        numMissing(): number;
        numErrors(): number;
        render(): JSX.Element;
        context: any;
        setState<K extends "selected" | "oldValue">(state: ListManagerState | ((prevState: Readonly<ListManagerState>, props: Readonly<ListManagerProps>) => ListManagerState | Pick<ListManagerState, K> | null) | Pick<ListManagerState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<ListManagerProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<ListManagerState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<ListManagerProps>, nextState: Readonly<ListManagerState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<ListManagerProps>, prevState: Readonly<ListManagerState>): any;
        componentDidUpdate?(prevProps: Readonly<ListManagerProps>, prevState: Readonly<ListManagerState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<ListManagerProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<ListManagerProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<ListManagerProps>, nextState: Readonly<ListManagerState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<ListManagerProps>, nextState: Readonly<ListManagerState>, nextContext: any): void;
    };
    contextType?: React.Context<any> | undefined;
};
