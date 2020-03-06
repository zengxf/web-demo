import { Picker, View } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { AtAccordion, AtDivider, AtInput, AtList, AtListItem, AtSwitch, AtToast } from "taro-ui"
import { NoteItem } from './note-item'

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
            isWaitReview: true,
            dateStr: format.dateYmd(new Date()),
            noteId: 0,
            data: [],
            hiddenItem: true
        }
    }

    componentDidMount() {
        this.onSearch()
    }

    // --- 显示
    showList = () => {
        this.setState({ hiddenItem: true })
        this.onSearch()
    }
    showItem = (reviewId, noteId) => {
        this.setState({ hiddenItem: false, noteId })
        this.noteItemRef.findItemInfo(reviewId, noteId, this.state.isWaitReview)
    }

    // --- 上一页、下一页
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
            if (this.state.isWaitReview) {
                this.fetchNotReview()
            }
            return
        } else if (sign < 0 && curIndex == 0) {
            show.info("已是第一项")
            return
        }
        let reviewNote = arr[curIndex + sign]
        this.showItem(reviewNote.reviewId, reviewNote.noteId)
    }
    fetchNotReview = () => {
        http.get("/api/note/review/find-not-review-recent-date", {}, res => {
            let date = res.map.recent_date
            if (date && date !== this.state.dateStr) {
                show.confirm({
                    title: `【${date}】还有笔记待复习`,
                    content: "是否直接跳转",
                    onOk: () => {
                        this.setState({ dateStr: date }, this.showList)
                    }
                })
            }
        })
    }

    // --- 搜索
    onDateChange = (e) => {
        this.setState({ dateStr: e.detail.value }, this.onSearch)
    }
    onStatusChange = (isWaitReview) => {
        this.setState({ isWaitReview }, this.onSearch)
    }
    onSearch = () => {
        this.setState({ loading: true })
        let reviewStatus = this.state.isWaitReview ? 1 : 2
        http.get("/api/note/review/find-list", { status: reviewStatus, date: this.state.dateStr }, res => {
            this.setState({ loading: false, data: res })
            this.delNoteIds = []
        })
    }

    render() {
        return (
            <View>
                <AtToast isOpened={this.state.loading} text="加载中" icon="loading"></AtToast>
                <View hidden={!this.state.hiddenItem}>
                    <View>
                        <AtAccordion
                            title='搜索-复习计划'
                            icon={{ value: 'search', size: '15' }}
                            open={this.state.searchOpen}
                            onClick={(v) => this.setState({ searchOpen: v })}

                        >
                            <Picker mode='date' onChange={this.onDateChange}>
                                <AtInput
                                    title='日期' type='text'
                                    placeholder='请选择日期'
                                    value={this.state.dateStr} />
                            </Picker>
                            <AtSwitch
                                title={this.state.isWaitReview ? '待复习' : '已复习'}
                                checked={true}
                                onChange={this.onStatusChange} />
                        </AtAccordion>
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
