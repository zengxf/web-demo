import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtNavBar, AtToast, AtDivider, AtButton, AtTabBar } from "taro-ui"

const show = require('../../utils/show.js')
const http = require('../../utils/http.js')
const format = require('../../utils/format.js')

export default class NoteItem extends Component {
    config = {
        usingComponents: {
            wemark: '../../wemark/wemark'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            reviewId: 0,
            noteId: 0,
            typeName: 'x',
            title: 'y',
            content: 'z'
        }
    }

    findItemInfo = (reviewId, noteId) => {
        this.setState({ loading: true, reviewId, noteId })
        http.get("/api/note/note/find-one/" + noteId, {}, res => {
            this.setState({
                loading: false,
                typeName: res.typeName,
                title: res.title,
                content: res.content || ' ' // 空的话，不会重新渲染内容
            })
        })
    }

    handleClick = (value) => {
        let funArr = [
            this.props.showPrevious,
            this.onUpdateStatus,
            this.props.showNext,
        ]
        funArr[value]()
    }

    onUpdateStatus = () => {
        http.put("/api/note/review/update-to-reviewed/" + this.state.reviewId, {}, res => {
            show.success(`标记【${this.state.title}】为已复习`)
            this.props.showNext()
        })
    }

    onMore = () => {

    }

    render() {
        return (
            <View>
                <AtToast isOpened={this.state.loading} text="加载中" icon="loading"></AtToast>

                <AtNavBar
                    color='#6190E8'
                    title='笔记详情'
                    leftIconType='chevron-left'
                    onClickLeftIcon={this.props.showList}
                    rightFirstIconType='bullet-list'
                    onClickRgIconSt={this.onMore}
                />

                <h4>【{this.state.typeName}】{this.state.title}</h4>
                <wemark md={this.state.content} link highlight type='wemark' />

                <AtTabBar
                    tabList={[
                        { title: '上一个', iconType: 'chevron-left' },
                        { title: '已记住', iconType: 'check' },
                        { title: '下一个', iconType: 'chevron-right' }
                    ]}
                    fixed={true}
                    onClick={this.handleClick.bind(this)}
                    current={1}
                />
            </View>
        )
    }
}
