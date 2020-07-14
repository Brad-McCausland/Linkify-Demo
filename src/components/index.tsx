import React from "react";
import * as ReactDOM from "react-dom";

import { Linkify, inLineTextLinkPair } from './Linkify';

class App extends React.Component
{
    render()
    {
        let linkPair: inLineTextLinkPair = {text: "here", url: "https://www.google.com"}
        return (
            <h1>
                {Linkify("Click here to go to google", linkPair)}
            </h1>
        );
    }
}

ReactDOM.render (
    <App/>,
    document.getElementById("output")
);
