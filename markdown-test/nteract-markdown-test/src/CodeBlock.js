import React from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

class CodeBlock extends React.PureComponent {
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

    componentDidUpdate() {
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

export default CodeBlock