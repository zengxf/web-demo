import Taro from '@tarojs/taro'

function warn(msg) {
    Taro.showToast({
        title: msg,
        icon: 'none',
        duration: 2000 // 持续的时间
    })
}

module.exports.warn = warn;