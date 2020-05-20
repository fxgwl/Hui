// pages/classify/goods_details.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
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

    indicatorColor: "#6ab5e1",//指示点颜色
    activeColor: "#1074bc",//当前选中的指示点颜色
    autoplay: false, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 500, //滑动时间
    gnormsId:'',
    good:{},
    myCar:[],
    myCarNum:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gnormsId: options.gnormsId
    })
    this.getGoodDetails();
    this.getCar();
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
    if (!wx.getStorageSync('openid') || !wx.getStorageSync("memberId")){
      wx.reLaunch({
        url: '../home/home'
      })
    }
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
  },

  getGoodDetails: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/get_product_detail",
      data: {
        guiGeId: that.data.gnormsId,
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log(res);
        }
        if (res.data.code == 1) {
          that.setData({
            good:res.data.data,
          })
          if (res.data.data.goodsPicsList!=null){
            that.data.imgUrls=[];
            for (var i = 0; i < res.data.data.goodsPicsList.length;i++){
              var pics={};
              pics.link="";
              pics.url=res.data.data.goodsPicsList[i];
              that.data.imgUrls.push(pics);
            }
            that.setData({
              imgUrls: that.data.imgUrls
            })
          }
        }
        //that.getCar();
      }
    })
  },
  getCar: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/cart_info",
      data: {
        memberId: wx.getStorageSync("memberId"),
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("mycar", res);
        }
        var num=0;
        if (res.data.code == 1) {
          that.setData({
            myCar: res.data.data.list
          })
          for (var i = 0; i < that.data.myCar.length; i++) {
            num+=that.data.myCar[i].gnormsNum
          }
          that.setData({
            myCarNum: num,
          })
        }
      }
    })
  },
  addCar: function (event) {
    var that = this;
    var gnormsId = event.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.hostUrl + "app/addCart",
      data: {
        gnormsNum: "1",
        memberId: wx.getStorageSync("memberId"),
        gnormsId: gnormsId
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.getCar();
          if (app.globalData.conIsCan) {
            console.log("添加成功");
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '添加失败，请稍后重试',
          })
        }
      }
    })
  }
})