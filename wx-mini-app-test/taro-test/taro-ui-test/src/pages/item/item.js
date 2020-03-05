import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtDivider } from "taro-ui"

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
        var rt = '# h1\n## h2\n- test\n  - test-11'
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
                <wemark md={this.state.richText} link highlight type='wemark' />
            </View>
        )
    }
}
