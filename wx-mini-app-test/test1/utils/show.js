function warn(msg) {
  wx.showToast({
    title: msg,
    icon: 'warn',
    duration: 2000 // 持续的时间
  })
}

module.exports.warn = warn;