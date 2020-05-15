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
    section:[],
    myCar:[],
    picUrl: app.globalData.picUrl,
    myAddress: wx.getStorageSync("myAddress"),
    timeGoods:[]
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
    this.getClass();//获取商品品类
    this.getTimeGoods();//限时秒杀中的商品
    this.setData({
      myAddress:wx.getStorageSync("myAddress")
    })
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
        if(app.globalData.conIsCan){
          console.log(res);
        }
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
        if (app.globalData.conIsCan) {
          console.log(res);
        }
        if (res.data.code == 1) {
          that.setData({
            classGoods:res.data.data.list
          })
        }
        that.getCar();
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
        if (res.data.code == 1) {
          that.setData({
            myCar: res.data.data.list
          })
          for(var i=0;i<that.data.myCar.length;i++){
            for (var j = 0; j < that.data.classGoods.length; j++) {
              if (that.data.classGoods[j].gnormsId == that.data.myCar[i].gnormsId){
                that.data.classGoods[j].car=that.data.myCar[i];
              }
          }
          }
          that.setData({
            classGoods: that.data.classGoods
          })
          if(app.globalData.conIsCan){
            console.log("goods==", that.data.classGoods)
          }
        }
      }
    })
  },
  addCar: function (event) {
    var that = this;
    if (!wx.getStorageSync('memberId')) {
      wx.navigateTo({
        url: '../login/warrant'
      })
      return;
    }
    if(wx.getStorageSync("myAddress").address_id==undefined){
      wx.showToast({
        title: '请先选择小区',
        icon:"none"
      })
      return;
    }
    var gnormsId = event.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.hostUrl + "app/addCart",
      data: {
        gnormsNum:"1",
        memberId: wx.getStorageSync("memberId"),
        gnormsId: gnormsId
      },
      success: function (res) {
        if (res.data.code == 1) {
          for(var i=0;i<that.data.classGoods.length;i++){
            if (gnormsId == that.data.classGoods[i].gnormsId){
              if(that.data.classGoods[i].car==undefined){
                var car={};
                car.gnormsNum=1;
                that.data.classGoods[i].car=car;
              }else{
                that.data.classGoods[i].car.gnormsNum++;
              }
            }
          }
          that.setData({
            classGoods: that.data.classGoods
          })
          if(app.globalData.conIsCan){
            console.log("加入成功");
          }
        }
      }
    })
  },
  delCar: function (event) {
    var that = this;
    var gnormsId = event.currentTarget.dataset.id;
    if (!wx.getStorageSync('memberId')) {
      wx.navigateTo({
        url: '../login/warrant'
      })
      return;
    }
    wx.request({
      url: app.globalData.hostUrl + "app/addCart",
      data: {
        gnormsNum: "-1",
        memberId: wx.getStorageSync("memberId"),
        gnormsId: gnormsId
      },
      success: function (res) {
        if (res.data.code == 1) {
          for (var i = 0; i < that.data.classGoods.length; i++) {
            if (gnormsId == that.data.classGoods[i].gnormsId) {
              if (that.data.classGoods[i].car == undefined) {
              } else {
                that.data.classGoods[i].car.gnormsNum--;
              }
            }
          }
          that.setData({
            classGoods: that.data.classGoods
          })
          if(app.globalData.conIsCan){
            console.log("加入成功");
          }
        }
      }
    })
  },
  getTimeGoods: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/get_product",
      data: {
        area: "2",
      },
      success: function (res) {
        if(app.globalData.conIsCan){
          console.log("timeGoods==", res);
        }
        if (res.data.code == 1) {
          that.setData({
            timeGoods: res.data.data.list
          })
        }
      }
    })
  },
})