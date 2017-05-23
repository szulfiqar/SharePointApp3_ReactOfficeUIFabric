import * as React from 'react';
export declare class InputFormComponent extends React.Component<any, any> {
    state: any;
    appWebUrl: string;
    hostWebUrl: string;
    constructor();
    getQueryStringParameter(paramToRetrieve: string): string;
    render(): JSX.Element;
    private _onChangedTitle(title);
    private _onChangedEmail(Email);
    private _onInitialize();
    private _onAdd();
}
