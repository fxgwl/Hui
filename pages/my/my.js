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
    user:{}
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
    })
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
  }
})