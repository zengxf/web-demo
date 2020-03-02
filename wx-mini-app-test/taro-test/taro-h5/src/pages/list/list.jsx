import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'

export default class List extends Component {

    componentWillMount() {
        console.log(this.$router.params)
    }

    config = {
        navigationBarTitleText: 'List Page'
    }

    onBack = () => {
        Taro.navigateBack({ delta: 1 })
    }

    render() {
        return (
            <View className='index'>
                <Text>Hello world!</Text>
                <AtIcon value='clock' size='30' color='#F00'></AtIcon>
                <AtButton type="primary" onClick={this.onBack} >返回</AtButton>
            </View>
        )
    }
}
