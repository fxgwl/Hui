// pages/pickup/pickup.js
//获取应用实例
const app = getApp();
var pageval="1";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabbar();
    this.getOrderList();
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
  getOrderList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/user_order",
      data: {
        memberId: wx.getStorageSync('memberId'),
        pageval: pageval,
        status: "1"
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log(res);
        }
        if (res.data.code == 1) {
          if (res.data.data.list.length > 0) {
            that.setData({
              orderList: res.data.data.list
            })
          } else {
            wx.showToast({
              title: '你还没有订单',
              icon: 'none'
            })
          }
        }
      }
    })
  },
})