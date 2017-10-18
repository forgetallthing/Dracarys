// detailMethod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vegMethod: {
      "pic": "../img/welcome.png",
      "name": "超级美食"
    },
    id: "",
    co_img: "../img/co_g.png",
    co: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中~'
    })
    var that = this;
    var collects = wx.getStorageSync('collect') || {"co":[]};
    if (collects.co.indexOf(options.id) != -1) {
      this.setData({
        co_img: "../img/co.png",
        co: true,
        id: options.id
      })
    } else {
      this.setData({
        id: options.id
      })
    }
    wx.request({
      url: 'https://way.jd.com/jisuapi/detail?appkey=1cf11451ee616fe74ecffd323cf59511',
      data: {
        'id': that.data.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        res.data.result.result.content = res.data.result.result.content.replace(/<br\s\/>/g, "\n");
        for (var i = 0; i < res.data.result.result.process.length; i++) {
          res.data.result.result.process[i].pcontent = res.data.result.result.process[i].pcontent.replace(/<br\s\/>/g, "");
        }
        wx.hideLoading();
        that.setData({
          vegMethod: res.data.result.result
        })
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  collect: function () {
    if(this.data.co){
      wx.showToast({
        title: '取消收藏成功',
      })
      var cur_co = wx.getStorageSync('collect') || { "co": [] };
      var ind = cur_co.co.indexOf(this.data.id);
      cur_co.co.splice(ind,1)
      wx.setStorageSync('collect', cur_co);
      this.setData({
        co_img: "../img/co_g.png", 
        co: false,
      })
    }else{
      wx.showToast({
        title: '收藏成功',
      })
      var cur_co = wx.getStorageSync('collect') || { "co": [] };
      cur_co.co.push(this.data.id)
      wx.setStorageSync('collect', cur_co);
      this.setData({
        co_img: "../img/co.png",
        co: true,
      })
    }
  }
})