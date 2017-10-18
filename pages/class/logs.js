//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    classicalItem:[],
    state:"",
    classid:"",
    vegList:[],
    colors: ["#F3FFBD", "#247BA0", "#BEE2DC", "#FF1654", "#FFCAD4", "#FFE5D9", "#A8DADC", "#FA7921", "#9BC53D", "#5BC0EB"]
  },
  bindClassicalTap:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/class/list?id=' + id
    })

  },
  bindAllClassical:function(){
    var that = this
    //调用应用实例的方法获取全局数据
    //显示所有分类
    wx.request({
      url: 'https://way.jd.com/jisuapi/recipe_class?appkey=1cf11451ee616fe74ecffd323cf59511',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var result = res.data.result.result[0].list
        for(var i = 0;i<result.length;i++){
          var random = Math.ceil(Math.random() * 10)-1;
          var random2 = Math.ceil(Math.random() * 10)-1;
          while (random == random2){
            var random2 = Math.ceil(Math.random() * 10)-1;
          }
          result[i].big_c = that.data.colors[random];
          result[i].small_c = that.data.colors[random2];
        } 
        that.setData({
          logs: result,
          state: 1
        })
      }
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中~',
    })
    this.bindAllClassical();
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})

