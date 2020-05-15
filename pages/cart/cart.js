//获取应用实例
const app = getApp()
var numbers = 1;
Page({
  data: {
    tabbar: {},
    picUrl: app.globalData.picUrl,
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    list: [],
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: true, // 全选状态，默认全选
    hostUrl:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.editTabbar();
    that.setData({
      hostUrl:app.globalData.hostUrl+"upload/",
    })
  },
  onShow() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })
    this.getMyCart();
    
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  // 提交订单
  btn_submit_order: function () {
    var that = this;
    var cartsId="";
    for(var i=0;i<that.data.list.length;i++){
      if(that.data.list[i].selected){
        if(cartsId==""){
          cartsId=that.data.list[i].cartId;
        }else{
          cartsId+=","+that.data.list[i].cartId;
        }
      }
    }
    // 调起支付
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
    if (cartsId==""){
      wx.showModal({
        title: '提示',
        content: '您还没有选择商品',
      })
      return;
    }
    wx.navigateTo({
      url: 'submit_order?cartsId='+cartsId,
    })
  },
  // 收藏
  btn_collert: function () {
    wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })
  },
  /**
   * 计算总价
   */
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].gnormsNum * list[i].harlan_gnorms.goodsMallprice;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },
  getMyCart: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/cart_info",
      data: {
        memberId: wx.getStorageSync('memberId'),
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.setData({
            list:res.data.data.list
          })
          for(var i=0;i<that.data.list.length;i++){
            that.data.list[i].selected=true
            if(that.data.list[i].gnormsNum==0){
              that.delOneGoodOfCar(that.data.list[i].cartId);
            }
          }
          // that.setData({
          //   list: that.data.list
          // })
          // 价格方法
          that.count_price();
          if(app.globalData.conIsCan){
            console.log("myCart==", that.data.list);
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
          for(var i=0;i<that.data.list.length;i++){
            if (that.data.list[i].gnormsId == gnormsId){
              that.data.list[i].gnormsNum++;
            }
          }
          that.setData({
            list: that.data.list
          })
          that.count_price();
          if (app.globalData.conIsCan) {
            console.log("加入成功");
          }
        }
      }
    })
  },
  jianCar: function (event) {
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
          for (var i = 0; i < that.data.list.length; i++) {
            if (that.data.list[i].gnormsId == gnormsId) {
              that.data.list[i].gnormsNum--;
              if (that.data.list[i].gnormsNum==0){
                that.delOneGoodOfCar(that.data.list[i].cartId);
              }
            }
          }
          that.setData({
            list: that.data.list
          })
          that.count_price();
          if (app.globalData.conIsCan) {
            console.log("减去成功");
          }
        }
      }
    })
  },
  //删除购物车里单件商品
  delOneGoodOfCar: function (cartId) {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/del_cart_info",
      data: {
        cartId: cartId
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.getMyCart();
          if (app.globalData.conIsCan) {
            console.log("减去成功");
          }
        }
      }
    })
  },
  //删除购物车里多件商品
  delAllGoodOfCar: function () {
    var that = this;
    var cartIds='';
    for(var i=0;i<that.data.list.length;i++){
      if(that.data.list[i].selected){
        if(cartIds==''){
          cartIds=that.data.list[i].cartId;
        }else{
          cartIds+=","+that.data.list[i].cartId;
        }
      }
    }
    cartIds=encodeURI(cartIds);
    wx.request({
      url: app.globalData.hostUrl + "app/del_cart_multi",
      data: {
        cartIds: cartIds
      },
      success: function (res) {
        if (res.data.code == 1) {
          that.getMyCart();
          if (app.globalData.conIsCan) {
            console.log("减去多个商品成功");
          }
        }
      }
    })
  },
})

