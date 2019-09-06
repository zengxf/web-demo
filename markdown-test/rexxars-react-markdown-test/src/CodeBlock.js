import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

export class CodeBlock extends React.PureComponent {
    constructor(props) {
        super(props)
        this.setRef = this.setRef.bind(this)
    }

    setRef(el) {
        this.codeEl = el
    }

    componentDidMount() {
        hljs.highlightBlock(this.codeEl)
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={`language-${this.props.language || 'js'}`}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}

export class MyMathJax extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BlockMath math={this.props.value} />
        )
    }
}

export class MyMathJaxInline extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <InlineMath math={this.props.value} />
        )
    }
}
