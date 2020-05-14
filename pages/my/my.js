// pages/profile/profile.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    showModal: false,
    showModalEat: false,
    user:{},
    textContent:''
  },


//  在线客服弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {
  },
  ok: function () {
    this.setData({
      showModal: false
    })
  },
  toggleDialog:function () {
    this.setData({
      showModal: false
    })
  },
  // 我想吃弹窗
  btnEat: function () {
    this.setData({
      showModalEat: true
    })
  },
  okEat: function () {
    this.setData({
      showModalEat: false
    })
  },
  toggleDialogEat:function () {
    this.setData({
      showModalEat: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabbar();
    that.setData({
      user: app.globalData.userInfo
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

  },
  /**
   * 权限设置
   */
  gotoSet : function(){
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  getContent : function(event){
    this.setData({
      textContent: event.detail.value
    })
  },
  pushSubmit : function(){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/set_suggestion",
      data:{
        memberId: wx.getStorageSync('memberId'),
        suggestionContent:that.data.textContent
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("my/my.js>>pushSubmit==", res)
        }
        if(res.data.code==1){
          wx.showToast({
            title: '提交成功',
          })
          that.toggleDialogEat();
        }
      }
    })
  },
  /**
   * 用户签到
   */
  goSign: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/user_signin",
      data: {
        memberId: wx.getStorageSync('memberId')
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("my/my.js>>goSign==", res);
        }
        if (res.data.code == 1) {
          wx.showToast({
            title: '签到成功',
          })
        }else if(res.data.code == 1103){
          wx.showToast({
            title: '今天已经签到',
            icon:'none'
          })
        }
      }
    })
  }
})