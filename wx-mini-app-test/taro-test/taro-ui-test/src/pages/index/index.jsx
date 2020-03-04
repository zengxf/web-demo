import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtToast, AtDivider } from "taro-ui"
import './index.scss'

const http = require('../../utils/http.js')
const format = require('../../utils/format.js')

export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            listSign: 1,
            dateStr: format.dateYmd(new Date()),
            data: []
        }
    }

    componentDidMount() {
        this.fetch()
    }

    fetch = () => {
        this.setState({ loading: true })
        http.get("/api/note/review/find-list", { status: this.state.listSign, date: this.state.dateStr }, res => {
            this.setState({ loading: false, data: res })
        })
    }

    itemShow = (noteId) => {
        Taro.navigateTo({
            url: '/pages/item/item?noteId=' + noteId
        })
    }

    render() {
        return (
            <View >
                <AtToast isOpened={this.state.loading} text="加载中" icon="loading"></AtToast>
                {
                    this.state.data.map(type => {
                        return (
                            <View key={'type-' + type.typeId}>
                                <AtDivider content={`【${type.typeName}】`} > </AtDivider>
                                <AtList hasBorder={false} >
                                    {
                                        type.notes.map(note => {
                                            return (
                                                <AtListItem key={'note-' + note.noteId}
                                                    title={note.noteTitle}
                                                    onClick={() => this.itemShow(note.noteId)}
                                                    arrow="right" />
                                            )
                                        })
                                    }
                                </AtList>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}
