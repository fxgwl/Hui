//app.js
App({
  onLaunch: function () {
    this.screenSize();
    //隐藏系统tabbar
    //wx.hideTabBar();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('code=' + res.code)
          wx.request({
            url: 'https://hui.lyhuiqiao.com/app/getopenid',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data.data.openid),
                wx.setStorageSync('openid', res.data.data.openid),
                console.log('openid=' + res.data.data.openid)
              if (res.data.code != "1") {
                wx.showModal({
                  title: '提示',
                  content: '微信登陆失败，请关闭后重新登陆！',
                })
              } 
              // else {
              //   wx.request({
              //     url: 'https://hui.lyhuiqiao.com/app/wechatLogin',
              //     data: {
              //       wechatUid: wx.getStorageSync('openid').openid,
              //     },
              //     success: function (res) {
              //       console.log(res)
              //       wx.setStorageSync('s_userinfo', res.data.s_userinfo)
              //       if (wx.getStorageSync('s_userinfo').use_id) {
              //         wx.reLaunch({
              //           url: '../index/index'
              //         })
              //       }
              //     },
              //   })
              // }
            }
          })
        } else {
          console.log('获取用户登陆信息失败！' + res.errMsg)
        }
      }
    })
    if(wx.getStorageSync('userInfo')){
      this.globalData.userInfo = wx.getStorageSync('userInfo');
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  console.log("userinfo==", this.globalData.userInfo)
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                },
                fail:res=>{
                  console.log("userfail==",res)
                }
              })
            }
          })
        }
      }
    })
  },
  screenSize: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        //可视窗口宽度
        var ww = res.windowWidth;
        //可视窗口高度
        var hh = res.windowHeight;
        that.globalData.ww = ww;
        that.globalData.hh = hh;
      }
    })
  },
  bezier: function (points, times) {
    // 0、以3个控制点为例，点A,B,C,AB上设置点D,BC上设置点E,DE连线上设置点F,则最终的贝塞尔曲线是点F的坐标轨迹。
    // 1、计算相邻控制点间距。
    // 2、根据完成时间,计算每次执行时D在AB方向上移动的距离，E在BC方向上移动的距离。
    // 3、时间每递增100ms，则D,E在指定方向上发生位移, F在DE上的位移则可通过AD/AB = DF/DE得出。
    // 4、根据DE的正余弦值和DE的值计算出F的坐标。
    // 邻控制AB点间距
    var bezier_points = [];
    var points_D = [];
    var points_E = [];
    const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
    // 邻控制BC点间距
    const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
    // D每次在AB方向上移动的距离
    const EACH_MOVE_AD = DIST_AB / times;
    // E每次在BC方向上移动的距离 
    const EACH_MOVE_BE = DIST_BC / times;
    // 点AB的正切
    const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
    // 点BC的正切
    const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
    // 点AB的弧度值
    const RADIUS_AB = Math.atan(TAN_AB);
    // 点BC的弧度值
    const RADIUS_BC = Math.atan(TAN_BC);
    // 每次执行
    for (var i = 1; i <= times; i++) {
      // AD的距离
      var dist_AD = EACH_MOVE_AD * i;
      // BE的距离
      var dist_BE = EACH_MOVE_BE * i;
      // D点的坐标
      var point_D = {};
      point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
      point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
      points_D.push(point_D);
      // E点的坐标
      var point_E = {};
      point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
      point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
      points_E.push(point_E);
      // 此时线段DE的正切值
      var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
      // tan_DE的弧度值
      var radius_DE = Math.atan(tan_DE);
      // 地市DE的间距
      var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
      // 此时DF的距离
      var dist_DF = (dist_AD / DIST_AB) * dist_DE;
      // 此时DF点的坐标
      var point_F = {};
      point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
      point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
      bezier_points.push(point_F);
    }
    return {
      'bezier_points': bezier_points
    };
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
    hostUrl:"https://hui.lyhuiqiao.com/",
    picUrl: "https://hui.lyhuiqiao.com/upload/image/",
    conIsCan:false,
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