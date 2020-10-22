export declare const colors: {
    ERROR_COLOR: string;
    ERROR_COLOR_BG: string;
    MISSING_COLOR_BG: string;
    PRIMARY_ACTION_COLOR: string;
    PRIMARY_ACTION_COLOR_DISABLED: string;
    SECONDARY_ACTION_COLOR: string;
};
export declare function inlineDoneButtonStyle(marginLeft: number, enabled: boolean): {
    padding: number;
    marginLeft: number;
    fontSize: number;
    height: number;
    borderStyle: string;
    borderWidth: number;
    borderColor: string;
    borderRadius: number;
    color: string;
    cursor: string;
};
export declare function inlineCancelButtonStyle(): {
    padding: number;
    marginLeft: number;
    marginBottom: number;
    height: number;
    color: string;
    cursor: string;
    fontSize: number;
};
export declare function inlineStyle(hasError: boolean, isMissing: boolean): {
    color: string;
    background: string;
    width: string;
    height: number;
    paddingLeft: number;
};
export declare function inlineTextAreaStyle(hasError: boolean, isMissing: boolean): {
    color: string;
    background: string;
    height: string;
    width: string;
    minHeight: number;
    paddingLeft: number;
};
export declare function inlineChooserStyle(hasError: boolean, isMissing: boolean, isView: boolean): {
    color: string;
    background: string;
    minHeight: number;
    width: string;
    paddingLeft: number;
    height?: undefined;
} | {
    color: string;
    background: string;
    height: number;
    width: string;
    paddingLeft: number;
    minHeight?: undefined;
};
