import React from "react";
import ReactDOM from "react-dom";
import MarkdownRender from "@nteract/markdown";
import CodeBlock from "./CodeBlock";

var area = document.getElementById('contentArea');

class HelloMessage extends React.Component {
    render() {
        var content = area.value;
        return (
            <MarkdownRender
                source={content}
                renderers={{ code: CodeBlock }}
            />
        );
    }
}

function onAreaChange(e) {
    console.info(e)
    var markdownDiv = document.getElementById("markdownDiv");
    ReactDOM.render(<HelloMessage />, markdownDiv);
}

onAreaChange();

area.addEventListener("keydown", onAreaChange);