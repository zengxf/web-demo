const http = require('../../utils/http.js')

Page({
  onLoad() {
    http.get("/api/note/review/find-list?date=2020-02-27&status=1", (data) => {
      console.info(data)
    })
  },
  gotoLogs() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoLogs2() {
    wx.redirectTo({
      url: '../logs/logs'
    })
  },
  gotoList() {
    wx.redirectTo({
      url: '../list/list?test=21222'
    })
  }
})