// pages/logs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    vegList:[],
    scrollHeight:"",
    num:20
  },
  bindList: function (e) {
    var classId = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/index/detailMethod?id=' + classId
    })
  },
  bindaccocdingClass:function(){
    wx.showLoading({
      title: '努力加载中~'
    })
    var that = this
    //调用应用实例的方法获取全局数据
    //根据菜谱分类搜索
    wx.request({
      url: 'https://way.jd.com/jisuapi/byclass?appkey=1cf11451ee616fe74ecffd323cf59511',
      data: {
        "classid": that.data.id,
        "start": 0,
        "num": this.data.num
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        that.setData({
          vegList: res.data.result.result.list
        })
      }
    })
  },
  lower: function (e) {
  },
  onLoad: function (options) {
    var that =this;
    this.setData({
      id: options.id
    }) 
    this.bindaccocdingClass();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})