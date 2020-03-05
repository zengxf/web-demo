import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { NoteItem } from './note-item'
import { AtList, AtListItem, AtToast, AtDivider, AtInput, AtSwitch } from "taro-ui"

const show = require('../../utils/show.js')
const http = require('../../utils/http.js')
const format = require('../../utils/format.js')

export default class Index extends Component {
    config = {
        navigationBarTitleText: '极简笔记'
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            listSign: 1,
            dateStr: format.dateYmd(new Date()),
            noteId: 0,
            data: [],
            hiddenItem: true
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

    showList = () => {
        this.setState({ hiddenItem: true })
        this.fetch()
    }

    showItem = (reviewId, noteId) => {
        this.setState({ hiddenItem: false, noteId })
        this.noteItemRef.findItemInfo(reviewId, noteId)
    }

    // ---
    showPrevious = () => {
        this.updateToReviewed(-1)
    }

    showNext = () => {
        this.updateToReviewed(+1)
    }

    updateToReviewed = (sign) => {
        let arr = []
        this.state.data.forEach(type => { arr = [...arr, ...type.notes] })
        let curIndex = arr.findIndex(note => note.noteId == this.state.noteId)
        if (sign > 0 && curIndex + 1 == arr.length) {
            show.info("已是最后一项")
            // this.fetchNotReview()
            return
        } else if (sign < 0 && curIndex == 0) {
            show.info("已是第一项")
            return
        }
        let reviewNote = arr[curIndex + sign]
        this.showItem(reviewNote.reviewId, reviewNote.noteId)
    }
    // ---

    onDateChange = (e) => {
        this.setState({ dateStr: e.detail.value })
    }

    onStatusChange = (v) => {
        this.setState({ listSign: v ? 1 : 2 })
    }

    render() {
        return (
            <View >
                <AtToast isOpened={this.state.loading} text="加载中" icon="loading"></AtToast>
                <View hidden={!this.state.hiddenItem}>
                    <View className='page-section'>
                        <Text>日期选择器</Text>
                        <View>
                            <Picker mode='date' onChange={this.onDateChange}>
                                <AtInput
                                    title='日期'
                                    type='text'
                                    placeholder='请选择日期'
                                    value={this.state.dateStr}
                                />
                            </Picker>
                            <AtSwitch
                                title={this.listSign == 1 ? '待复习' : '已复习'}
                                checked={this.listSign == 1}
                                onChange={this.onStatusChange} />
                        </View>
                    </View>
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
                                                        onClick={() => this.showItem(note.reviewId, note.noteId)}
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
                <View hidden={this.state.hiddenItem}>
                    <NoteItem
                        ref={(ref) => { this.noteItemRef = ref }}
                        showList={this.showList}
                        showPrevious={this.showPrevious}
                        showNext={this.showNext}
                    />
                </View>
            </View>
        )
    }
}
