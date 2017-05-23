// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from "react";
import pnp from "sp-pnp-js";
import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';
import { DetailsListComponent } from './DetailsListComponent';
import { InputFormComponent } from './InputFormComponent';
import { ModalBasicExample } from './modalComponent';

export interface IListItem {
    Title?: string;
    Email?: string;
    Id: number;
}

export class Main extends React.Component<any, any> {

    public state: any = null;
    private _menuButtonElement: HTMLElement;

    public divStyle: any;
    public divStyle1: any;
    public divStyle2: any;
    private stateChange: boolean = true;

    public appWebUrl: string;
    public hostWebUrl: string;

    public constructor() {
        super();

        //this.pnpWeb = new Web("https://tyccon.sharepoint.com/sites/dcdeveloper");

        this.state = { conditionInput: false, conditionList: false, items: null };
        this._getResposeFromInputForm = this._getResposeFromInputForm.bind(this);
        this._getResposeFromListFormActionDelete = this._getResposeFromListFormActionDelete.bind(this);
        this.readListItems = this.readListItems.bind(this);

        this.hostWebUrl = this.getUrlParamByName("SPHostUrl");
        this.appWebUrl = this.getUrlParamByName("SPAppWebUrl");


        console.log("Host Web: " + this.hostWebUrl);
        console.log("App Web: " + this.appWebUrl);

        this.divStyle = {
            width: "100%",
        };

        this.divStyle1 = {
            width: "25%",
            float: "left"
        };

        this.divStyle2 = {
            width: "75%",
            float: "right"
        };
    }

    readListItems = function () {
        pnp.sp.web.lists.getByTitle("Test App1")
            .items.select('Title', 'Id', 'EmailAddress').get()
            .then((items: IListItem[]): void => {
                if (items != undefined && items != null) {
                    console.log(items);
                    this.setState({ items });
                    this.setState({ conditionList: true });
                }
            }, (error: any): void => {
                console.log(error);
            });
    }

    getUrlParamByName(name: string) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    }

    deleteItemInList = function (id: number) {
        pnp.sp.web.lists.getByTitle("Test App1").items.getById(id).delete().
            then((r: any): void => {
                console.log(r);
                this._getResposeFromInputForm(true);
            }, (error: any): void => {
                console.log(error);
            });
    }

    _onClickHandler(e: React.MouseEvent<HTMLElement>) {
        this.setState({ conditionInput: !this.state.conditionInput });
        return false;
    }

    _onReadList() {
        this._getResposeFromInputForm(true);
    }

    _getResposeFromInputForm(conditionInput: boolean) {
        this.setState({ conditionInput });
        this.readListItems();
    }

    _getResposeFromListFormActionDelete(datatoDelete: any) {
        if (datatoDelete != null) {
            for (var i = 0; i < datatoDelete.length; i++) {
                this.deleteItemInList(datatoDelete[i].Id);
            }
        }
    }

    public render() {
       
        return (
            <div>
                <ModalBasicExample />
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-lg4">
                            <div className='ms-NavExample-LeftPane'>
                                <Nav
                                    groups={
                                        [
                                            {
                                                links:
                                                [
                                                    {
                                                        name: 'Home',
                                                        url: 'http://example.com',
                                                        links: [{
                                                            name: 'Add/Update',
                                                            url: '#',
                                                            icon: 'Edit',
                                                            onClick: this._onClickHandler.bind(this),
                                                            key: 'key1'
                                                        },
                                                        {
                                                            name: 'Read',
                                                            url: '#',
                                                            onClick: this._onReadList.bind(this),
                                                            icon: 'List',
                                                            key: 'key2'
                                                        }],
                                                        isExpanded: true
                                                    },

                                                ]
                                            }
                                        ]
                                    }
                                    expandedStateText={'expanded'}
                                    collapsedStateText={'collapsed'}
                                    selectedKey={'key3'}
                                />
                            </div>
                        </div>
                        <div className="ms-Grid-col ms-u-lg8">
                            {
                                this.state.conditionInput == true && this.state.conditionList == true && <DetailsListComponent items={this.state.items} sendData={this._getResposeFromListFormActionDelete} />
                            }
                            {
                                this.state.conditionInput == false && <InputFormComponent sendData={this._getResposeFromInputForm} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}