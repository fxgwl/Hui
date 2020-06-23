// pages/classify/goods_classify.js
//获取应用实例
const app = getApp()
var pageval=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    picUrl: app.globalData.picUrl,
    currentId: '',
    num: 0,
    classify: [],
    classGoods: [],
    section: [],
    myCar: [],
    searchTxt:'', 
    windowHeight:"",    
  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let id = e.currentTarget.dataset.id;
    if (id) {
      this.setData({
        currentId: id,
        classGoods: []
      })
      pageval=1;
      this.getGoods();
    }
  },

  // 加入购物车
  
  openCounter: function(){
    var that = this;
    that.setData({
      "num" :1,
    }) 
  },
  inputData: function (event){
    this.setData({
      searchTxt: event.detail.value
    })
  },
  getSearch : function(){
    var txt = this.data.searchTxt
    if (txt == '') {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none',
        duration: 1500
      })
    }else {
      pageval=1
      this.setData({
        currentId:""
      })
      this.getGoods();
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabbar();
    //可视窗口x,y坐标
    this.busPos = {};
    this.busPos['x'] = app.globalData.ww * .7;
    this.busPos['y'] = app.globalData.hh * 1.1;
    this.getClass();
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight : res.windowHeight
        })
      }
    })

   
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
    var that = this;
    that.getGoods();
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
    pageval++;
    this.getGoods();
  },

  
  getClass: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/get_category",
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log(res);
        }
        if (res.data.code == 1) {
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
    let data = { page: that.data.page, size: that.data.size};
    var classGoodsTem = this.data.classGoods
    wx.request({
      url: app.globalData.hostUrl + "app/get_product",
      data: {
        category: that.data.currentId,
        searchtxt: that.data.searchTxt == undefined ? "" : that.data.searchTxt,
        pageval:pageval
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log(res);
        }
        if (res.data.code == 1) {
            that.setData({
              classGoods: res.data.data.list
            })
          if(res.data.data.list.length==0){
            wx.showToast({
              title: '暂无商品',
              icon:"none"
            })
          }
        }
        that.getCar();
      },
      complete:function(){
        that.setData({
          searchTxt:""
        })
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
          for (var i = 0; i < that.data.myCar.length; i++) {
            for (var j = 0; j < that.data.classGoods.length; j++) {
              if (that.data.classGoods[j].gnormsId == that.data.myCar[i].gnormsId) {
                that.data.classGoods[j].car = that.data.myCar[i];
              }
            }
          }
          that.setData({
            classGoods: that.data.classGoods
          })
          if (app.globalData.conIsCan) {
            console.log("mycar", res);
          }
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
          for (var i = 0; i < that.data.classGoods.length; i++) {
            if (gnormsId == that.data.classGoods[i].gnormsId) {
              if (that.data.classGoods[i].car == undefined) {
                var car = {};
                car.gnormsNum = 1;
                that.data.classGoods[i].car = car;
              } else {
                that.data.classGoods[i].car.gnormsNum++;
              }
            }
          }
          that.setData({
            classGoods: that.data.classGoods
          })
          if (app.globalData.conIsCan) {
            console.log("加入成功");
          }
        }else if (res.data.code == 400){
          wx.showToast({
            title: '此商品已售罄',
            icon:'none'
          })
        }
      }
    })
  },
  delCar: function (event) {
    var that = this;
    var gnormsId = event.currentTarget.dataset.id;
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
          if (app.globalData.conIsCan) {
            console.log("加入成功");
          }
        }
      }
    })
  },
})