// pages/classify/goods_classify.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    currentId: '1',
    num: 0,
    classify: [
      { name: "蔬菜水果", Id: '1'},
      { name: "蔬菜水果", Id: '2'},
      { name: "蔬菜水果", Id: '3'},
      { name: "蔬菜水果", Id: '4'}
    ]
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
  // 加入购物车
  
  openCounter: function(){
    var that = this;
    that.setData({
      "num" :1,
    }) 
  },
  // 商品数量加
  addCount: function (e) {
    console.log("刚刚您点击了加1");
    var num = this.data.num;
    // 总数量-1  
    if (num < 1000) {
      this.data.num++;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },
  // 商品数量减
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var num = this.data.num;
    // 商品总数量-1
    if (num > 0) {
      this.data.num--;
    }
    // 将数值与状态写回  
    this.setData({
      num: this.data.num
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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