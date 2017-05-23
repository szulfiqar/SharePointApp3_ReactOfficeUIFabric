/// <reference types="react" />
import * as React from "react";
export interface IListItem {
    Title?: string;
    Email?: string;
    Id: number;
}
export declare class Main extends React.Component<any, any> {
    state: any;
    private _menuButtonElement;
    divStyle: any;
    divStyle1: any;
    divStyle2: any;
    private stateChange;
    appWebUrl: string;
    hostWebUrl: string;
    constructor();
    readListItems: () => void;
    getUrlParamByName(name: string): string;
    deleteItemInList: (id: number) => void;
    _onClickHandler(e: React.MouseEvent<HTMLElement>): boolean;
    _onReadList(): void;
    _getResposeFromInputForm(conditionInput: boolean): void;
    _getResposeFromListFormActionDelete(datatoDelete: any): void;
    render(): JSX.Element;
}
