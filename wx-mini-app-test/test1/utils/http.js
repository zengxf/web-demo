const show = require('./show.js')
const constant = require("./constant")

var host = 'http://localhost:8899'
var loginPage = '/pages/login/login'

/** POST 请求 */
function post(url, jsonData, doSuccess, doFail) {
  request(url, "POST", jsonData, doSuccess, doFail)
}

/** GET 请求，不需传参，直接 URL 调用 */
function get(url, doSuccess, doFail) {
  request(url, "GET", null, doSuccess, doFail)
}

/** 请求的封装 */
function request(url, method, data, doSuccess, doFail) {
  wx.request({
    url: host + url,
    method: method,
    data,
    success: function(res) {
      if (res.statusCode == 200) {
        doSuccess(res.data);
      } else if (res.statusCode == 401) {
        console.info("error 401: ", res)
        show.warn('请先登录')
        wx.redirectTo({
          url: loginPage
        })
      } else {
        console.info("error others: ", res)
        show.warn('请求失败：' + res.data.message)
      }
    },
    fail: doFail || function(res) {
      console.info("error: ", res)
      show.warn('未知原因请求失败')
    },
    dataType: "json",
    header: {
      "content-type": "application/json;charset=UTF-8",
      "authentication-token": wx.getStorageSync(constant.USER_TOKEN_KEY)
      // , "{{constant.USER_TOKEN_KEY}}": wx.getStorageSync(constant.USER_TOKEN_KEY)
    },
    timeout: 3000,
  })
}

module.exports.post = post
module.exports.get = get
module.exports.request = request