// pages/message/message.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    slides: [],
    cate: [],
    currentId: '1',
    section: [{
      name: '蔬菜',
      typeId: '1',
      goods: '蔬菜'
    }, {
      name: '水果',
      typeId: '2',
      goods: '水果'
    }, {
      name: '肉禽',
      typeId: '3',
      goods: '肉禽'
    }, {
      name: '主食',
      typeId: '4',
      goods: '主食'
    }, {
      name: '其他',
      typeId: '5',
      goods: '蔬菜'
    }],
  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.request({
    //url: 'https://locally.xxx.com/slides',
    //success: res => {
    //this.setData({ slides:res.data })
    // }
    // })
    app.editTabbar();
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

  }
})