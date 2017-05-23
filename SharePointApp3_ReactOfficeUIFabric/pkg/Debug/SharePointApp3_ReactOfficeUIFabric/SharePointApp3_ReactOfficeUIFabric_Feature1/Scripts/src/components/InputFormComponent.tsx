import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
//import { Web } from "sp-pnp-js";

import pnp from "sp-pnp-js";

export class InputFormComponent extends React.Component<any, any> {

    public state: any = null;
    //public pnpWeb: Web;

    public appWebUrl: string;
    public hostWebUrl: string;

    constructor() {
        super();
        this.state = { title: "", Email: "" };
        //this.pnpWeb = new Web("https://tyccon.sharepoint.com/sites/dcdeveloper");

        this.appWebUrl = decodeURIComponent(this.getQueryStringParameter("SPHostUrl"));
        this.hostWebUrl = decodeURIComponent(this.getQueryStringParameter("SPAppWebUrl"));
    }

    getQueryStringParameter(paramToRetrieve: string) {
        var params = document.URL.split("?")[1].split("&amp;");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve) return singleParam[1];
        }
    }

    public render() {
        return (
            <div>
                <div id="inputForm">
                    <TextField value={this.state.title}
                        label='Title:' onChanged={this._onChangedTitle.bind(this)} />

                    <TextField value={this.state.Email}
                        label='Email:' onChanged={this._onChangedEmail.bind(this)} />

                    <PrimaryButton
                        data-automation-id='test'
                        text='Add Item'
                        href='#'
                        onClick={() => this._onAdd()}
                    />
                </div>
            </div>
        );
    }

    private _onChangedTitle(title: string) {
        this.setState({ title });
    }

    private _onChangedEmail(Email: string) {
        this.setState({ Email });
    }

    private _onInitialize() {
        this.setState({ title: "", Email: "" });
    }

    private _onAdd() {
        pnp.sp.web.lists.getByTitle("Test App1").items.add({
            Title: this.state.title,
            EmailAddress: this.state.Email
        }).then((r: any): void => {
            // this result will have two properties "data" and "item"
            // data is what was returned from SharePoint after the add operation
            // and item is an object of type item representing the REST query to that item
            // so you can immediately chain off that

            //console.log(r);
            // this will add an attachment to the item we just created
            //r.item.attachmentFiles.add("file.txt", "Here is some file content.");

            this._onInitialize();
            this.props.sendData(true);

        });



        //this.pnpWeb.lists.getByTitle("Test App").items.add({
        //    Title: this.state.title
        //}).then((r: any): void => {
        //    // this result will have two properties "data" and "item"
        //    // data is what was returned from SharePoint after the add operation
        //    // and item is an object of type item representing the REST query to that item
        //    // so you can immediately chain off that

        //    //console.log(r);
        //    // this will add an attachment to the item we just created
        //    //r.item.attachmentFiles.add("file.txt", "Here is some file content.");

        //    this._onInitialize();
        //    this.props.sendData(true);
        //});
    }
}