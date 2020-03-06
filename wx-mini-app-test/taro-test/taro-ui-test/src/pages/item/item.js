import { View } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import 'taro-parse/dist/style/main.scss'
import TaroParser from 'taro-parse'

const http = require('../../utils/http.js')
const format = require('../../utils/format.js')

export default class Item extends Component {
    config = {
        navigationBarTitleText: '详情',
        usingComponents: {
            wemark: '../../wemark/wemark'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            richText: ""
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        // var rt = '# h1\n## h2\n- test\n  - test-11'
        var rt = `
# Markdown 
- ddd
  - ssb
  - 334
1. abc
2. bcd
    - efg
- [百度](https://www.baidu.com)
- 公式1 $a = b - \\sqrt{c}$
- 公式2 
    - $$ a = b - \\sqrt{c} $$
- aa: \`bb\`

## code
\`\`\`
function test() {
    return "test";
}
\`\`\`
    `
        console.info("rt", rt)
        this.setState({ richText: rt })
    }
    imgClick = (src) => {
        Taro.previewImage({ urls: [src] })
    }
    linkClick = (href) => {
        Taro.setClipboardData({ data: href }).then(() => {
            Taro.showToast({ title: '链接已复制' })
        })
    }

    render() {
        return (
            <View >
                {/* <wemark md={this.state.richText} link highlight type='wemark' /> */}
                <TaroParser
                    type='markdown'
                    theme='light'
                    onImgClick={this.imgClick}
                    onLinkClick={this.linkClick}
                    yumlApi='https://md.werfei.com/?yuml'
                    latexApi='https://md.werfei.com/?tex'
                    content={this.state.richText}
                />
            </View>
        )
    }
}
