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
import { ListItemProps } from "../hoc/list";
import "../style/icon.css";
import "../style/list.css";
interface ListProps {
    items: React.ReactElement<ListItemProps>[];
    canAddItems: boolean;
    canRemoveItems: boolean;
    canEditItems: boolean;
    buttonIndent: number;
    plusWidth: number;
    plusElement: React.ReactElement | null;
    hideEditRemove: boolean;
    canCommitItem: boolean;
    onAddItem: () => void;
    onRevertItem: (index: number) => void;
    onRemoveItem: (index: number) => void;
    onSelectItem: (index: number | null) => void;
}
interface ListState {
    hover: boolean;
}
/**
 * Editing of a list of widgets. This widgets themselves are passed in as 'items'.
 *
 * A ListEditView is created within the ListEditorMixin, so you do not generally need
 * to use this component directly.
 *
 * The user of this component should supply event handlers to manage the list
 * when items are added or removed:
 *   * `onAddItem()`
 *   * `onRemoveItem()`
 *
 * Each item passed in should have an id set (item.props.id). This is used to
 * uniquely identify each row so that removing a row happens correctly.
 *
 * Finally
 *   * `canAddItems()` - lets you hide the [+] icon for instance if there's no
 *                       possible items that can be added from a list).
 */
export default class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps);
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    addItem(): void;
    removeItem(index: number): void;
    selectItem(index: number | null): void;
    revertItem(index: number): void;
    handleDeselect(): void;
    render(): JSX.Element;
}
export {};
