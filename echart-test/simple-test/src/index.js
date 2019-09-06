import React from "react";
import ReactDOM from "react-dom";
import echarts from "echarts";

class HelloMessage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById('test1')) // 初始化 echarts 实例
        var option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        }
        myChart.setOption(option)
    }

    randerChart = () => {
        var myChart = echarts.init(document.getElementById('main')) // 初始化 echarts 实例
        myChart.setOption({ // 绘制图表
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        })
    }

    render() {
        return (
            <div>
                <div>Hello World</div>
                <div id="test1" style={{ width: 400, height: 400 }}></div>
                <div id="main" style={{ width: 400, height: 400 }}>
                    test - <button onClick={this.randerChart}>渲染柱状图</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<HelloMessage />, document.getElementById("root"));