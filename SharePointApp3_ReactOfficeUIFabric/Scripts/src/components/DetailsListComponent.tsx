/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';



let _items = [];

let _columns = [
    {
        key: 'column1',
        name: 'Id',
        fieldName: 'Id',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    {
        key: 'column2',
        name: 'Title',
        fieldName: 'Title',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    },
    ,
    {
        key: 'column3',
        name: 'Email',
        fieldName: 'EmailAddress',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
    }
];

export class DetailsListComponent extends React.Component<any, any> {
    private _selection: Selection;

    constructor() {
        super();

        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });

        this.state = {
            selectionDetails: this._getSelectionDetails()
        };

        this._onDelete = this._onDelete.bind(this);
    }

    public render() {

        let { selectionDetails } = this.state;
        let { items } = this.props;

        return (
            <div>

                {/*<TextField
                    label='Filter by name:'
                    onChanged={text => this.setState({ items: text ? this.props.items.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this.props.items })}
                />*/}

                <div>{selectionDetails}</div>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        columns={_columns}
                        setKey='set'
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        //onRenderItemColumn={this._onRenderItemColumn}
                        onItemInvoked={(item) => alert(`Item invoked: ${item.Title}`)}
                    />
                </MarqueeSelection>

                <DefaultButton
                    data-automation-id='test'
                    iconProps={{ iconName: 'Delete Item' }}
                    description='Delete description'
                    text='Delete'
                    href='#'
                    onClick={() => this._onDelete()}
                />
            </div>
        );
    }

    /*private _onRenderItemColumn(item, index, column) {

        if (column.key === 'column2') {
            console.log(column.key);
            return <Link data-selection-invoke={true}>{item[column.key]}</Link>;
        }

        //return item[column.key];
    }*/

    private _onDelete() {
        var c = confirm("Are you sure you want to do that?");
        if (c == true) {
            this.setState({
                selectionDetails: null
            });
            this.props.sendData(this._selection.getSelection());
        }
    }

    private _getSelectionDetails(): string {
        let selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: Id: ' + (this._selection.getSelection()[0] as any).Id + ', with Title :' + (this._selection.getSelection()[0] as any).Title;
            default:
                return `${selectionCount} items selected`;
        }
    }
}