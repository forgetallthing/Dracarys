//index.js
//获取应用实例
var app = getApp();
var isShow = false;
var lastTime = 0;
var x = 0,
  y = 0,
  z = 0,
  lastX = 0,
  lastY = 0,
  lastZ = 0;
var shakeSpeed = 110;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    rotate: "",
    pic: "../img/none.png",
    is_req: false,
    food_name:"摇出什么吃什么~",
    id:"",
    food_tag:"",
    yao_from:"all"
  },
  //事件处理函数
  bindButtonTap: function () {
    wx.navigateTo({
      url: '/pages/index/list'
    })
  },
  onShow: function () {
    isShow = true;
    var y_from = wx.getStorageSync('yao_from') || "all";
    this.setData({
      yao_from : y_from
    })
    wx.onAccelerometerChange(this.shake);
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      wx.showToast({
        title: '你好啊~' + app.globalData.userInfo.nickName,
        image: "../img/welcome.png",
        duration: 2000
      })
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showToast({
        title: '你好啊~',
        image: "../img/welcome.png",
        duration: 2000
      })
    }
  },
  onHide: function () {
    isShow = false;
  },
  getUserInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  to_food:function(){
    var cid = this.data.id;
    if (cid){
      wx.navigateTo({
        url: '/pages/index/detailMethod?id=' + cid
      })
    }
  },
  shake: function (acceleration) {
    if (!isShow) {
      return
    }
    var nowTime = new Date().getTime();
    if (nowTime - lastTime > 100) {
      var diffTime = nowTime - lastTime;
      lastTime = nowTime;
      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;
      var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
      if (speed > shakeSpeed) {
        if (!this.data.is_req) {
          if (this.data.yao_from=="all"){
            var random_num = Math.ceil(Math.random() * 50000);
          } else {
            var cur_co= wx.getStorageSync('collect').co||[];
            if (cur_co.length==0){
              wx.showModal({
                title: '提示',
                content: '还没有收藏菜品哦~将在全部菜品中随机~',
                success: function (res) {
                }
              })
              var random_num = Math.ceil(Math.random() * 50000);
            } else{
              var random = Math.floor((Math.random() * cur_co.length));
              var random_num = cur_co[random];
            }          
          }
          var that = this;
          this.setData({
            rotate: "anim",
            pic: "../img/none.png",
            food_name: "摇出吃什么~",
            is_req:true,
            id: random_num,
            food_tag:""
          });
          wx.request({
            url: 'https://way.jd.com/jisuapi/detail?appkey=1cf11451ee616fe74ecffd323cf59511',
            data: {
              'id': random_num
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data.result.result);
              var cur_pic = res.data.result.result;
              that.setData({
                pic: res.data.result.result.pic,
                is_req: false,
                food_name: res.data.result.result.name,
                food_tag: "标签:" + res.data.result.result.tag
              })
            }
          })
          setTimeout(function () {
            that.setData({
              rotate: "",
            });
          }, 1000)
        }
      }
      lastX = x;
      lastY = y;
      lastZ = z;
    }
  }
})

