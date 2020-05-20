// pages/index/apply_open.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
    area:'',
    name:"",
    tel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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


  getArea: function (event) {
    this.setData({
      area: event.detail.value
    })
  },
  getName: function (event) {
    this.setData({
      name: event.detail.value
    })
  },
  getTel: function (event) {
    this.setData({
      tel: event.detail.value
    })
  },
  pushSubmit: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/set_suggestion",
      data: {
        memberId: wx.getStorageSync('memberId'),
        suggestionContent: that.data.area+" "+that.data.name+" "+that.data.tel
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("index/apply_open.js>>pushSubmit==", res)
        }
        if (res.data.code == 1) {
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})