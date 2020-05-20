// pages/index/select_station.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
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

 
  gohome: function(event){
    var that=this;
    var addressId = event.currentTarget.dataset.id;
    for(var i=0;i<that.data.addressList.length;i++){
      if (addressId == that.data.addressList[i].address_id){
        wx.setStorageSync("myAddress", that.data.addressList[i])
      }
    }
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  getAddress : function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/get_adress_list",
      data: {
        pageval: 1,
        pagesize:10
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            addressList: res.data.data.list
          })
        }
      }
    })
  },
})