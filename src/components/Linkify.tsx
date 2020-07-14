import * as React from "react";
import { Link } from "react-router-dom";

export interface inLineTextLinkPair
{
    text: string,
    url: string,
}

/*
 * Function Linkify takes a string and an arbitrary number of substring/link pairs, and returns an array of text and link snippets which can be wrapped in a text element
 * Input
 *     - text: a string which contains substrings that need to be converted into links.
 *     - substrings: an arbitrary amount of substring/url pairs to be inserted into the text.
 * 
 * Note: removing this code from the website project caused a warning: "Each child in a list should have a unique "key" prop." Issue resolved by mapping each component into a <span>
 */

export function Linkify(text: string, ...linkWords: inLineTextLinkPair[]): any
{
    var content = recursiveSplicer(text, ...linkWords);

    // if the result of the recursive operation is a string, then it did not find any keywords and the function should spit back the input.
    if (typeof(content) === "string")
    {
        return text;
    }
    // Otherwise, the elements in the array should be assigned keys before being returned.
    else
    {
        return content.map((item: any, index: number) => <span key = {index}>{item}</span>);
    }
}

/*
 * Function recursiveSplicer identifies a linkWord in the given string and splits the string into the text before the link word, the linkified link word, and the remaining text after the link word.
 * The preceding and trailing substrings are recursed upon to find more key words. The function returns the link object plus the result of the recursive calls on the leading and trailing substrings.
 */
function recursiveSplicer(input: string, ...wordLinkPairs: inLineTextLinkPair[]): any[]
{
    var returnText: any = input;

    var substringStart = -1;
    var currentWordLinkPair = null;

    // Find the first occurance of a link word and set substringStart, currentWordLinkPair
    for (currentWordLinkPair of wordLinkPairs)
    {
        substringStart = input.toLowerCase().indexOf(currentWordLinkPair.text.toLowerCase());
        if (substringStart > -1)
        {
            // No need to continue if a match is found
            break;
        }
    }

    // If linkword found, split input into two substrings on either side of the linkword, recurse on both substrings, then set returnText equal to the combined result
    if (substringStart > -1 && currentWordLinkPair !== null)
    {
        const substringEnd = substringStart + currentWordLinkPair.text.length;

        var firstSubstring = input.slice(0, substringStart);

        // Create new text/url pair with original text from input to preserve capitalization
        var link = clickableTextLink(
            {
                text: input.slice(substringStart, substringEnd),
                url: currentWordLinkPair.url
            });

        var secondSubstring = input.slice(substringEnd);

        returnText = [recursiveSplicer(firstSubstring, ...wordLinkPairs), link, recursiveSplicer(secondSubstring, ...wordLinkPairs)];

        // Flatten results for good measure
        returnText = [].concat.apply([], returnText);
    }
    
    return returnText;
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