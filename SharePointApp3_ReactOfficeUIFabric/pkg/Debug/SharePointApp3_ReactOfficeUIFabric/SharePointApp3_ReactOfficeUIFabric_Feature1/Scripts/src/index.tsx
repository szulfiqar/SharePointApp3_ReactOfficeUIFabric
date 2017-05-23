import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from './components/Main';

const element: React.ReactElement<any> = React.createElement(
    Main, null
);

ReactDOM.render(
    element,
    document.getElementById("rootContainer")
);

//ReactDOM.render(
//    <div>
//        <Main />
//    </div>,
//    document.getElementById("rootContainer")
//);