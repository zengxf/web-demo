const constant = require("../../utils/constant")
const http = require("../../utils/http")
const show = require("../../utils/show")

var indexPage = '/pages/index/index'

Page({
  formSubmit: function(e) {
    const body = e.detail.value
    console.log('form发生了submit事件，携带数据为：', body)
    if (!body.account) {
      show.warn("请输入用户名")
      return
    }
    if (!body.password) {
      show.warn("请输入密码")
      return
    }
    http.post("/api/security/login", body, (data) => {
      if (data.login == "ok") {
        console.info("登录成功", data)
        wx.setStorageSync(constant.USER_TOKEN_KEY, data.token)
        wx.redirectTo({
          url: indexPage
        })
      } else {
        show.warn("登录失败，用户名或密码不对")
      }
    })
  }
})