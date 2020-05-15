//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    picUrl: app.globalData.picUrl,
  },
  
  onLoad: function () {
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }, 2000);
    // setTimeout(function () {
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })
    // }, 1000);
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //     var wechatNick = encodeURI(app.globalData.userInfo.nickName);
    //     var wechatHeadPic = encodeURI(app.globalData.userInfo.avatarUrl);
    //     console.log(wechatNick);
    //     wx.request({
    //       url: 'https://hui.lyhuiqiao.com/app/wechatLogin',
    //       data: {
    //         wechatUid: wx.getStorageSync('openid'),
    //         wechatNick: wechatNick,
    //         wechatHeadPic: wechatHeadPic},
    //       success:function(res){
    //         console.log(res);
    //         wx.setStorageSync("memberId", res.data.data.memberId);
    //       }
    //     })
        // setTimeout(function () {
        //   wx.switchTab({
        //     url: '/pages/home/home',
        //   })
        // }, 1000);
      //}
    //})
    //this.pushMsg();
  },
  onReady: function () {
    
  },
 pushMsg: function () {
    wx.getSetting({
      success: (res) => {
        if (app.globalData.conIsCan) {
          console.log(res);
          console.log(res.authSetting['scope.userLocation']);
        }
        if (res.authSetting['scope.userLocation'] == undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '提示',
            content: '需要获取您的地理位置，请前往授权，否则将无法使用信息发布！',
            success: function (res) {
              if (res.cancel) {
                if (app.globalData.conIsCan){
                  console.info("1授权失败返回数据");
                }
              } else if (res.confirm) {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              }
            }
          })
        } else {
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 1000);
        }
      }
    })
  }, 
})
