// pages/cart/order_finish.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
    bg: true,
    orderId:"",
    pickupTime:'',
    goodList:[],
    list1:[],
    list2:[],
    order:{}
  },
  change: function () {
    if (this.data.bg) {
      this.setData({
        goodList: this.data.list2,
        bg: false
      })
    } else {
      this.setData({
        goodList: this.data.list1,
        bg: true
      })
    }
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId
    })
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
          if (res.data.data.harlan_sporder_gnorms.length>2){
            that.data.list1.push(res.data.data.harlan_sporder_gnorms[0]);
            that.data.list1.push(res.data.data.harlan_sporder_gnorms[1]);
            that.data.goodList.push(res.data.data.harlan_sporder_gnorms[0]);
            that.data.goodList.push(res.data.data.harlan_sporder_gnorms[1]);
          }else{
            that.data.list1 = res.data.data.harlan_sporder_gnorms,
            that.data.goodList = res.data.data.harlan_sporder_gnorms
          }
          that.setData({
            order:res.data.data,
            goodList: that.data.goodList,
            list1:that.data.list1,
            list2: res.data.data.harlan_sporder_gnorms
          })
          that.getPickupTime(that.data.order.sporderTime);
        }
      }
    })
  },
  getPickupTime : function(orderTime){
    var that = this;
    var time1=new Date(orderTime*1000);
    if(time1.getHours()>=11){
      that.setData({
        pickupTime: (time1.getMonth() + 1) + "月" + (time1.getDate()+1)+"日",
      })
    }else{
      that.setData({
        pickupTime: (time1.getMonth() + 1) + "月" + time1.getDate() + "日",
      })
    }
  },
  goHome : function(){
    wx.switchTab({
      url: '../home/home',
    })
  }
})