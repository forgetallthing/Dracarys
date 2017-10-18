Page({
  data: {
    collect_list: [],
    list: [],
    show: "none",
    array: ['摇一摇:在全部菜品中随机', '摇一摇:在收藏菜品中随机']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中~'
    })
    var that = this;
    var collect_lists = this.data.collect_list;
    var list_length = collect_lists.length;
    var flag = 0;
    if (list_length == 0) {
      wx.hideLoading();
      this.setData({
        show: "block"
      })
    } else {
      this.setData({
        show: "none"
      })
      for (var i = 0; i < collect_lists.length; i++) {
        wx.request({
          url: 'https://way.jd.com/jisuapi/detail?appkey=1cf11451ee616fe74ecffd323cf59511',
          data: {
            'id': collect_lists[i]
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            flag++;
            if (res.data.msg === "查询成功") {
              var curList = {
                name: res.data.result.result.name,
                id: res.data.result.result.id,
                tag: res.data.result.result.tag,
                cookingtime: res.data.result.result.cookingtime,
                pic: res.data.result.result.pic,
                unique: "unique" + res.data.result.result.id
              }
              var lists = that.data.list;
              lists.push(curList)
              that.setData({
                list: lists
              })
            }
            if (flag == list_length) {
              wx.hideLoading();
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindPickerChange:function(e){
    if (e.detail.value==0){
      wx.showToast({
        title: '切换成功~',
      })
      wx.setStorageSync('yao_from', "all");
    } else if (this.data.collect_list.length>=1){
      wx.showToast({ 
        title: '切换成功~',
      })
      wx.setStorageSync('yao_from', "collect");
    }else{
      wx.showModal({
        title: '提示',
        content: '还没有收藏菜品哦~',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var co_l = this.data.collect_list;
    var collects = wx.getStorageSync('collect') || { "co": [] };
    if (JSON.stringify(co_l) != JSON.stringify(collects.co)) {
      this.setData({
        list: [],
        collect_list: collects.co,
      });
      this.onLoad()
    }
  },
  bindList: function (e) {
    var classId = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/index/detailMethod?id=' + classId
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