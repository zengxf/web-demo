import React from "react";
import ReactDOM from "react-dom";
import ReactMarkdown from "react-markdown";
import { CodeBlock, MyMathJax, MyMathJaxInline } from "./CodeBlock";
import RemarkMathPlugin from "remark-math";
import './my-md-table.css';

var area = document.getElementById('contentArea');

class HelloMessage extends React.Component {
    render() {
        var content = area.value;
        return (
            <ReactMarkdown
                source={content}
                plugins={[RemarkMathPlugin]}
                renderers={{
                    code: CodeBlock,
                    math: MyMathJax,
                    inlineMath: MyMathJaxInline
                }}
            />
        );
    }
}

function onAreaChange() {
    var markdownDiv = document.getElementById("markdownDiv");
    ReactDOM.render(<HelloMessage />, markdownDiv);
}


onAreaChange();
area.addEventListener("keyup", onAreaChange);