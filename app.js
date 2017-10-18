//app.js
App({
  onLaunch: function () {
    wx.getUserInfo({
      withCredentials: false,
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})