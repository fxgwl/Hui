// pages/login/warrant.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
    hasUserInfo: false,
    canIUse: wx.canIUse('request.object.method.GET')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // if (wx.getStorageSync('openid') && wx.getStorageSync('memberId')) {
    //   wx.navigateTo({
    //     url: '../index/index'
    //   })
      
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //   wx.request({
    //     url: 'https://wx.gangmaijiaw.com/steel/SelectByOpenId.do',
    //     data: {
    //       openId: wx.getStorageSync('openid').openid,
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
     //}
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
  close:function() {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  getUserInfo: function (e) {
    if (app.globalData.conIsCan) {
      console.log(e);
    }
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync('userInfo', e.detail.userInfo) 
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    // if (this.data.hasUserInfo == true) {
    //   wx.navigateTo({
    //     url: '../index/index'
    //   })
    // }
    var wechatNick = encodeURI(app.globalData.userInfo.nickName);
    var wechatHeadPic = encodeURI(app.globalData.userInfo.avatarUrl);
    if (app.globalData.conIsCan) {
      console.log(wechatNick);
    }
    wx.request({
      url: 'https://hui.lyhuiqiao.com/app/wechatLogin',
      data: {
        wechatUid: wx.getStorageSync('openid'),
        wechatNick: wechatNick,
        wechatHeadPic: wechatHeadPic
      },
      success: function (res) {
        if(app.globalData.conIsCan){
        console.log(res);
        }
        wx.setStorageSync("memberId", res.data.data.memberId);
        wx.navigateTo({
          url: '../index/index'
        })
      },
      fail : function(res){
        wx.showModal({
          title: '提示',
          content: '登录失败，请稍后重试',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  }
})