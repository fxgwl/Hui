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
    currentId: '',
    classGoods:[],
    section:[]
    // section: [{
    //   name: '蔬菜',
    //   typeId: '1',
    //   goods: '蔬菜'
    // }, {
    //   name: '水果',
    //   typeId: '2',
    //   goods: '水果'
    // }, {
    //   name: '肉禽',
    //   typeId: '3',
    //   goods: '肉禽'
    // }, {
    //   name: '主食',
    //   typeId: '4',
    //   goods: '主食'
    // }, {
    //   name: '其他',
    //   typeId: '5',
    //   goods: '蔬菜'
    // }],

  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id,
        classGoods:[]
      })
      this.getGoods();
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
    this.getClass();//获取商品品类
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

  },
  getClass:function(){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl +"app/get_category",
      success:function(res){
        console.log(res);
        if(res.data.code==1){
          that.setData({
            section: res.data.data.list,
            currentId: res.data.data.list[0].gclassId
          })
          that.getGoods();
        }
      }
    })
  },
  getGoods: function (id) {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/get_product",
      data:{
        category:this.data.currentId,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 1) {
          that.setData({
            classGoods:res.data.data.list
          })
        }
      }
    })
  }
})