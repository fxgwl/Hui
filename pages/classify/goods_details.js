// pages/classify/goods_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '',
        url: 'https://app.tjhengrun.cn/image/goods1.png'
      }, {
        link: '',
        url: 'https://app.tjhengrun.cn/image/fiult.png'
      }, {
        link: '',
        url: 'https://app.tjhengrun.cn/image/goods1.png'
      }
    ],
    indicatorDots: true, //小点
    indicatorColor: "white",//指示点颜色
    activeColor: "coral",//当前选中的指示点颜色
    autoplay: false, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  opencart: function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  }
})