//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  
  onLoad: function () {
    // setTimeout(function () {
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })
    // }, 1000);
    this.pushMsg();
  },
  onReady: function () {
    
  },
 pushMsg: function () {
    wx.getSetting({
      success: (res) => {
        console.log(res);
        console.log(res.authSetting['scope.userLocation']);
        if (res.authSetting['scope.userLocation'] == undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '提示',
            content: '需要获取您的地理位置，请前往授权，否则将无法使用信息发布！',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");

              } else if (res.confirm) {
                wx.navigateTo({
                  url: '../my/setting',
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
