// pages/my/my_order.js
//获取应用实例
const app = getApp()
var pageval=1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPay:false,
    picUrl: app.globalData.picUrl,
    currentId: '',
    section: [{
      name: '全部',
      typeId: '1',
      goods:'蔬菜'
    }, {
        name: '待付款',
      typeId: '2',
      goods:'水果'
    },{
        name: '待自提',
      typeId: '3',
      goods:'肉禽'
    },{
      name: '已完成',
      typeId: '4',
      goods:'主食'
    }, {
      name: '已取消',
      typeId: '5',
      goods:'蔬菜'
    }],
    status: '',
    orderList:[]
  },
  //点击每个导航的点击事件
  handleTap: function(e) {
    var that = this;
    let id = e.currentTarget.id;
    var state="";
    switch(id){
      case "1":
        state=" ";
      break;
      case "2":
        state = "0";
        break;
      case "3":
        state = "1";
        break;
      case "4":
        state = "3";
        break;
      case "5":
        state = "4";
        break;
    }
    that.setData({
      currentId: id,
      status: state,
      orderList:[]
    })
    pageval="1";
    that.getOrderList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num=options.type;
    var state="";
    switch (num) {
      case "1":
        state = "";
        break;
      case "2":
        state = "0";
        break;
      case "3":
        state = "1";
        break;
      case "4":
        state = "3";
        break;
      case "5":
        state = "4";
        break;
    }
    this.setData({
      currentId: num,
      status: state
    })
    this.getOrderList();
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
    this.setData({showPay:false})
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

  getOrderList : function(){
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.request({
      url: app.globalData.hostUrl + "app/user_order",
      data: {
        memberId: wx.getStorageSync('memberId'),
        pageval: pageval,
        status: that.data.status
      },
      success: function (res) {
        if(app.globalData.conIsCan){
          console.log(res);
        }
        if(res.data.code==1){
          if(res.data.data.list.length>0){
            that.setData({
              orderList: res.data.data.list
            })
          }else{
            that.setData({
              orderList: []
            })
            wx.showToast({
              title: '你还没有订单',
              icon:'none'
            })
          }
        }
      },
      complete:function(res){
        wx.hideLoading();
      }
    })
  },
  /*获取微信sign*/
  gotoPay: function (event) {
    var that = this;
    let {showPay} = that.data;
    var orderId = event.currentTarget.dataset.id;
    if(!showPay) {
      that.setData({showPay:true});
    wx.request({
      url: app.globalData.hostUrl + "app/order_wechat_sign",
      data: {
        orderid: orderId,
        openId: wx.getStorageSync("openid"),
        uid: wx.getStorageSync("memberId")
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("wechatSign==", res)
        }
        if (res.data.code == 1) {
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.sign,
            success(res) {
              that.goNextPage(true, orderId);
              if (app.globalData.conIsCan) {
                console.log("requestPayment==", res)
              }
            },
            fail(res) {
              that.goNextPage(false, orderId);
            }
          })
        } else {
          that.goNextPage(false, orderId);
        }
      }
    })
    }
  },
  // 去下一页
  goNextPage: function (NoIsYes, orderId) {
    if (NoIsYes) {
      wx.showToast({
        title: '支付成功',
        icon: 'none',
        duration: 1500
      });
    } else {
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 1500
      });
    }
    wx.redirectTo({
      url: '../cart/order_finish?orderId=' + orderId,
    });
  },
  /**
   * 取消订单，确认收货,用户删除cgval=6
   * cgval=4,cgval=3;orderid
   */
  setOrderState: function (event) {
    var that = this;
    var cgval = event.currentTarget.dataset.state;
    var orderid = event.currentTarget.dataset.id
    wx.request({
      url: app.globalData.hostUrl + "app/handle_order",
      data: {
        cgval: cgval,
        iscgpare:"0",
        orderid: orderid
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("my/my.js>>setOrderState==", res);
        }
        if (res.data.code == 1) {
          wx.showToast({
            title: '成功',
          })
          that.getOrderList();
        }
      }
    })
  },
  // 删除订单
  delOrder:function(event){
    var that = this;
    var orderid = event.currentTarget.dataset.id;
    var cgval = event.currentTarget.dataset.state;
    wx.showModal({
      title: '提示',
      content: '是否要删除订单',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.hostUrl + "app/handle_order",
            data: {
              cgval: cgval,
              iscgpare: "0",
              orderid: orderid
            },
            success: function (res) {
              wx.showToast({
                title: '删除成功',
                icon: 'none',
                duration: 1500
              });
              that.getOrderList();
            },
            fail:function(res){

            }
          })
        }else if (res.cancel) {

        }
      }
    })
  },
  goGoodDetail : function(event){
    var that = this;
    var sporderId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../my/order_details?orderId='+sporderId,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log("my_order==",data)
          if(data.data==1){
            that.getOrderList();
          }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        }
      },
    })
  }
})