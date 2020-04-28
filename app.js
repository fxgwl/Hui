//app.js
App({
  onLaunch: function () {
    //隐藏系统tabbar
    //wx.hideTabBar();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('code=' + res.code)
          // wx.request({
          //   url: 'https://wx.gangmaijiaw.com/steel/SendCode.do',
          //   data: {
          //     code: res.code
          //   },
          //   success: function (res) {
          //     console.log(res.data),
          //       wx.setStorageSync('openid', res.data),
          //       console.log('openid=' + res.data.openid)
          //     if (res.data.statusCode == "500") {
          //       wx.showModal({
          //         title: '提示',
          //         content: '微信登陆失败，请关闭后重新登陆！',
          //       })
          //     } else {
          //       wx.request({
          //         url: 'https://wx.gangmaijiaw.com/steel/SelectByOpenId.do',
          //         data: {
          //           openId: wx.getStorageSync('openid').openid,
          //         },
          //         success: function (res) {
          //           console.log(res)
          //           wx.setStorageSync('s_userinfo', res.data.s_userinfo)
          //           if (wx.getStorageSync('s_userinfo').use_id) {
          //             wx.reLaunch({
          //               url: '../index/index'
          //             })
          //           }
          //         },
          //       })
          //     }
          //   }
          // })
        } else {
          console.log('获取用户登陆信息失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
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
        }
      }
    })
  },
  onShow: function () {
    //隐藏系统tabbar
    //wx.hideTabBar();
  },
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },
  //全局点击事件
  editTabbar: function () {
    var tabbar = this.globalData.tabBar;
    var currentPages = getCurrentPages();
    var that = currentPages[currentPages.length - 1];
    var pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null,//客户端设备信息
    userInfo: null,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#999999",
      "selectedColor": "#0d6fb8",
      "list": [
        {
          "pagePath": "/pages/classify/goods_classify",
          "iconPath": "image/classify.png",
          "selectedIconPath": "image/classify_select.png",
          "text": "分类"
        },
        {
          "pagePath": "/pages/pickup/pickup",
          "iconPath": "image/pickup.png",
          "selectedIconPath": "image/pickup_select.png",
          "text": "取货"
        },
        {
          "pagePath": "/pages/home/home",
          "iconPath": "image/home.png",
          "isSpecial": true,
          "text": ""
        },
        {
          "pagePath": "/pages/cart/cart",
          "iconPath": "image/cart.png",
          "selectedIconPath": "image/cart_select.png",
          "text": "购物车"
        },
        {
          "pagePath": "/pages/my/my",
          "iconPath": "image/my.png",
          "selectedIconPath": "image/my_select.png",
          "text": "我的"
        }
      ]
    }
  }
})