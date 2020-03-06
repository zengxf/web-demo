import { View } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { AtDrawer, AtFloatLayout, AtNavBar, AtButton, AtTabBar, AtToast } from "taro-ui"

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
            isWaitReview: true,
            typeName: 'x',
            title: 'y',
            content: 'z',
            reviewList: [],
            reviewVisible: false
        }
    }

    findItemInfo = (reviewId, noteId, isWaitReview) => {
        this.setState({ loading: true, reviewId, noteId, isWaitReview })
        http.get("/api/note/note/find-one/" + noteId, {}, res => {
            this.setState({
                loading: false,
                typeName: res.typeName,
                title: res.title,
                content: res.content || ' ' // 空的话，不会重新渲染内容
            })
        })
    }

    onTabBarClick = (index) => {
        let funArr = [
            this.props.showPrevious,
            this.onUpdateStatus,
            this.props.showNext,
        ]
        funArr[index]()
    }

    onUpdateStatus = () => {
        if (this.state.isWaitReview) {
            http.put2("/api/note/review/update-to-reviewed/" + this.state.reviewId)
                .then(res => {
                    show.success(`标为已复习`)
                    this.props.showNext()
                })
        } else {
            http.put2("/api/note/review/update-to-not-reviewed/" + this.state.reviewId)
                .then(res => {
                    show.success(`标为未复习`)
                    this.props.showNext()
                })
        }
    }

    onEdit = () => {

    }
    onDelete = () => {
        show.confirm({
            title: `删除【${this.state.title}】`,
            content: "确认是否删除",
            onOk: () => {
                http.del2("/api/note/note/delete/" + this.state.noteId)
                    .then(res => {
                        show.success(`删除成功`)
                        this.props.showNext()
                    })
            }
        })
    }
    onFindReview = () => {
        http.get2("/api/note/review/findList", { noteId: this.state.noteId })
            .then(res => {
                this.setState({ reviewList: res, reviewVisible: true })
            })
    }
    onMenuClick = (index) => {
        let funArr = [
            this.onEdit,
            this.onFindReview,
            this.onDelete,
        ]
        funArr[index]()
    }
    onResetReviewPlan = () => { // 重置复习计划
        show.confirm({
            title: '重置复习计划',
            content: '确认是否重置',
            onOk: () => {
                http.post2("/api/note/review/resetReviewPlan?noteId=" + this.state.noteId)
                    .then(res => {
                        show.success(`重置成功`)
                        this.setState({
                            reviewVisible: false,
                        })
                    })
            }
        })
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
                    onClickRgIconSt={() => { this.setState({ showMenu: true }) }}
                />
                <AtDrawer
                    show={this.state.showMenu}
                    mask={true}
                    right={true}
                    items={['修改笔记', '查看计划', '删除笔记']}
                    onItemClick={this.onMenuClick}
                    onClose={() => { this.setState({ showMenu: false }) }}
                />
                <AtFloatLayout
                    title="复习计划"
                    isOpened={this.state.reviewVisible}
                    onClose={() => { this.setState({ reviewVisible: false }) }}
                >
                    <AtButton type='primary' onClick={this.onResetReviewPlan} >重置复习计划</AtButton>
                    {
                        this.state.reviewList.map(reviewObj => {
                            return (
                                <View key={reviewObj.id}>
                                    第 {reviewObj.frequency} 次（{format.dateYmd(reviewObj.reviewDate)}）：{reviewObj.status == 1 ? "未复习" : "已复习"}
                                </View>
                            )
                        })
                    }
                </AtFloatLayout>

                <h4>【{this.state.typeName}】{this.state.title}</h4>
                <wemark md={this.state.content} link highlight type='wemark' />

                <AtTabBar
                    tabList={[
                        { title: '上一个', iconType: 'chevron-left' },
                        {
                            title: this.state.isWaitReview ? '已记住' : '未记住',
                            iconType: this.state.isWaitReview ? 'check' : 'close'
                        },
                        { title: '下一个', iconType: 'chevron-right' }
                    ]}
                    fixed={true}
                    onClick={this.onTabBarClick.bind(this)}
                    current={1}
                />
            </View >
        )
    }
}
