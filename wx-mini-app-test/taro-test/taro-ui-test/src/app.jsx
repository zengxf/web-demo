import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import 'taro-ui/dist/style/index.scss'

class App extends Component {

    componentDidMount() { }

    config = {
        pages: [
            'pages/test/test-echarts',
            'pages/test/test-md',
            'pages/index/index',
            'pages/login/login',
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black'
        }
        // , plugins: {
        //     "wxparserPlugin": {
        //         "version": "0.1.0",
        //         "provider": "wx9d4d4ffa781ff3ac"
        //     }
        // }
    }

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Index />
        )
    }
}

Taro.render(<App />, document.getElementById('app'))