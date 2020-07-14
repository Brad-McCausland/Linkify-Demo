import React from "react";
import * as ReactDOM from "react-dom";

import { Linkify } from './Linkify';

class App extends React.Component
{
    render()
    {
        return (
            <div>
                <li>
                    {Linkify("Use linkify with a string and a keyword/url pair to insert a working link into the string.", {text: " link ", url: "https://www.tavour.com"})}
                </li>
                <li>
                    {Linkify("Linkify can, uh, replace, uh, an arbitrary number of substrings, uh, with a single keyword/url pair.", {text: " uh, ", url: "https://www.google.com"})}
                </li>
                <li>
                    {Linkify("Linkify can also handle an arbitrary number of keyword/url pairs", {text: " can ", url: "https://www.linkedin.com"}, {text: " handle ", url: "https://greatescape.co/"}, {text: " number ", url: "https://5e.tools/"})}
                </li>
                <li>
                    {Linkify("If no keywords are found, the function will return the text unchanged.", {text: " Diogenes ", url: "https://www.reddit.com"})}
                </li>
            </div>
        );
    }
}

ReactDOM.render (
    <App/>,
    document.getElementById("output")
);
