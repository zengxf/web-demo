import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

    config = {
        navigationBarTitleText: '首页 123'
    }

    test = () => {
        console.info("test")
        Taro.navigateTo({
            url: '/pages/list/list?test=1&name=aa中xx'
        })
    }

    login = () => {
        console.info("login")
        Taro.login({
            success: function (res) {
                if (res.code) {
                    // 发起网络请求
                    console.info("code =>", res)
                    console.info("env =>", Taro.getEnv())
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }

    render() {
        return (
            <View className='index'>
                <Text>Hello world!</Text>
                <AtButton onClick={this.test} type='primary'>按钮文案</AtButton>
                <AtButton onClick={this.login} type='primary'>登录</AtButton>
            </View>
        )
    }
}
