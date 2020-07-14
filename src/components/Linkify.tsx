import * as React from "react";
import { Link } from "react-router-dom";

export interface inLineTextLinkPair
{
    text: string,
    url: string,
}

/*
 * Function clickableTextLink takes a text/link pair. If the url starts with a '/' it will be treated as an internal url and the function will return a
 * <link> component that can be routed on the client side. Otherwise, it returns an <a> component with it's href set to the supplied url.
 */
function clickableTextLink(link: inLineTextLinkPair): any
{
    // Return clint-side routed link if given an internal url
    if (link.url.charAt(0) === "/")
    {
        return (
            <Link to={link.url}>
                {link.text}
            </Link>
        )
    }
    // Else return an <a> component when given an external link
    else
    {
        return (
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {link.text}
            </a>
        )
    }
}

/*
 * Function clickableTextLink identifies a linkWord in the given string and splits the string into the text before the link word, a linkified link word, and the remaining text after the link word.
 * The preceding and trailing substrings are recursed upon to find more key words. The function returns the concatenation of the link with the text on either side.
 */
function recursiveSplicer(input: string, ...linkWords: inLineTextLinkPair[]): any[]
{
    var returnText: any = input;

    var substringStart = -1;
    var currentLinkWord = null;

    // Find the first occurance of any link word and set substringStart, currentLinkWord
    for (currentLinkWord of linkWords)
    {
        substringStart = input.toLowerCase().indexOf(currentLinkWord.text.toLowerCase());
        if (substringStart > -1)
        {
            // No need to continue if a match is found
            break;
        }
    }

    // If linkword found, split input into two substrings on either side of the linkword, recurse on both substrings, then set returnText equal to the combined result
    if (substringStart > -1 && currentLinkWord !== null)
    {
        const substringEnd = substringStart + currentLinkWord.text.length;

        var firstSubstring = input.slice(0, substringStart);
        // Create new text/url pair with text from input to preserve capitalization
        var link = clickableTextLink(
            {
                text: input.slice(substringStart, substringEnd),
                url: currentLinkWord.url
            });
        var secondSubstring = input.slice(substringEnd);

        returnText = [recursiveSplicer(firstSubstring, ...linkWords), link, recursiveSplicer(secondSubstring, ...linkWords)];
    }

    return returnText;
}

/*
 * Function Linkify takes a string and an arbitrary number of substring/link pairs, and an array of text and link snippets which can be wrapped in a text element
 * Input
 *     - text: a string which contains substrings that need to be converted into links.
 *     - substrings: an arbitrary amount of substring/url pairs to be inserted into the text.
 */

export function Linkify(text: string, ...linkWords: inLineTextLinkPair[]): any[]
{
    var content = recursiveSplicer(text, ...linkWords);
    return content.map((item: any, index: number) => <span key = {index}>{item}</span>);
}