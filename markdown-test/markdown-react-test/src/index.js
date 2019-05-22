import React from "react";
import ReactDOM from "react-dom";
import MarkdownRender from "@nteract/markdown";
import CodeBlock from "./CodeBlock";

class HelloMessage extends React.Component {
    render() {
        var content = document.getElementById('contentArea').value;
        return (
            <MarkdownRender
                source={content}
                renderers={{ code: CodeBlock }}
            />
        );
    }
}

var markdownDiv = document.getElementById("markdownDiv");
ReactDOM.render(<HelloMessage />, markdownDiv);