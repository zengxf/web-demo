import { View } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import Chart from 'taro-echarts'

export default class TestEcharts extends Component {
    config = {
        navigationBarTitleText: '测试-EChart',
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
    }

    render() {
        return (
            <View >
                <Chart
                    option={{
                        title: { text: 'XX统计' },
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'bar',
                            barWidth: 20,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = [
                                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0', '#00'
                                        ];
                                        return colorList[params.dataIndex % colorList.length]
                                    },
                                    label: { show: true, position: 'top', formatter: '{b}\n{c}' }
                                }
                            }
                        }]
                    }}
                />
            </View>
        )
    }
}
