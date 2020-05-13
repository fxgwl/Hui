// pages/cart/order_finish.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: "bg1",
    orderId:"16",
    order:{}
  },
  change: function () {
    this.setData({
      bg: "bg2"
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   orderId:options.orderId
    // })
    if (app.globalData.conIsCan) {
      console.log("order_finish.js>>orderId==", this.data.orderId)
    }
    this.getOrderDetail();
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
   * 订单详情
   */
  getOrderDetail: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/order_detail",
      data: {
        orderid : that.data.orderId,
        memberId : wx.getStorageSync('memberId'),
      },
      success: function (res) {
        if (res.data.code == 1) {
          if (app.globalData.conIsCan) {
            console.log("order_finish.js>>orderDetail==", res)
          }
          that.setData({
            order:res.data.data
          })
        }
      }
    })
  },
})