import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtDivider } from "taro-ui"
import { TaroRichText } from 'taro_rich_text';

const http = require('../../utils/http.js')
const format = require('../../utils/format.js')

export default class Item extends Component {
    config = {
        navigationBarTitleText: '详情',
        usingComponents: {
            "wxparser": "plugin://wxparserPlugin/wxparser"
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
        var rt = `
        # test-h1
        - test
          - test-11
                `
        console.info("rt", rt)
        this.setState({ richText: rt })
        // this.setState({ loading: true })
        // http.get("/api/note/review/find-list", { status: this.state.listSign, date: this.state.dateStr }, res => {
        //     this.setState({ loading: false, data: res })
        // })
    }

    render() {
        return (
            <View >
                <TaroRichText
                    raw={false}
                    type='markdown'
                    richText={this.state.richText}
                />
            </View>
        )
    }
}
