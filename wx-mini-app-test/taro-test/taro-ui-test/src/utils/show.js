import Taro from '@tarojs/taro'

function warn(msg, duration) {
    Taro.showToast({
        title: msg,
        icon: 'none',
        duration: duration || 2000 // 持续的时间
    })
}

function info(msg, duration) {
    Taro.showToast({
        title: msg,
        icon: 'none',
        duration: duration || 1000
    })
}

function success(msg, duration) {
    Taro.showToast({
        title: msg,
        icon: 'success',
        duration: duration || 1000
    })
}

export function confirm(obj) {
    Taro.showModal(obj)
        .then(res => {
            if (res.confirm) {
                obj.onOk()
            }
        })
}

module.exports.warn = warn;
module.exports.info = info;
module.exports.success = success;