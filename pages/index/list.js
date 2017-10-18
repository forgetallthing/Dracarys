//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputValue: "",
    vegMethod: [],
    motto: 'TO  最爱的人',
    userInfo: {},
    state: "",
    isShow: false,
    num: 10,
    vegList: [],
    scrollHeight: "",
    scrollTop: 0,
    csum: 0,
    lock: false
  },
  //事件处理函数
  bindButtonTap: function () {
    if (this.data.inputValue.trim() == "") {
      wx.showToast({
        title: '你要找什么呢~',
      })
    } else {
      wx.showLoading({
        title: '努力查菜中~'
      })
      var that = this
      wx.request({
        url: 'https://way.jd.com/jisuapi/search?appkey=1cf11451ee616fe74ecffd323cf59511',
        data: {
          "keyword": this.data.inputValue,
          "num": this.data.num
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.result.msg != "ok") {
            wx.showToast({
              title: '没有查到哦~',
              image: '../img/search.png',
              duration: 2000
            })
          } else {
            var sum = res.data.result.result.list.length;
            if (sum == that.data.csum) {
              wx.showToast({
                title: '没有更多了哦~',
              })
            } else {
              that.setData({
                vegList: res.data.result.result.list,
                state: 2,
                csum: sum
              })
            }
          }
          that.setData({
            lock: false,
          })
        }
      })
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
      num: 10,
      csum: 0,
      scrollTop: 1
    })
  },
  bindList: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/index/detailMethod?id=' + id
    })
  },
  lower: function (e) {
    if (!this.data.lock){
      this.setData({
        lock: true
      });
      wx.showLoading({
        title: '努力加载中...'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1500)
      this.data.num = this.data.num + 10;
      this.bindButtonTap();
    }
  },
  onShow: function () {
    var that = this;
    this.data.isShow = true;
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onHide: function () {
    this.data.isShow = false;
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight - 74
        });
      }
    });
  },
})
