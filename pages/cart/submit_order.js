// pages/cart/submit_order.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg: true,
    userName: '',
    cartsId:'',
    mobile: '',
    totalValue:0,
    list:[],
    list1:[],
    list2:[],
    myAddress:wx.getStorageSync("myAddress")
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },

  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  change: function () {
    if(this.data.bg){
      this.setData({
        list2:this.data.list,
        bg:false
      })
    }else{
      this.setData({
        list2: this.data.list1,
        bg: true
      })
    }
  }, 
  goNext: function () {
    var that = this;
    var userName = this.data.userName;
    var mobile = this.data.mobile;
    var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var name = /^[u4E00-u9FA5]+$/;
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return;
    } else if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
      })
      return;
    }
    else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    //return true;
    var prodInfo="";
    var code="";
    for(var i=0;i<that.data.list.length;i++){
      if(prodInfo==""){
        prodInfo = that.data.list[i].gnormsId + '|' + that.data.list[i].gnormsNum;
      }else{
        prodInfo += "," + that.data.list[i].gnormsId + '|' + that.data.list[i].gnormsNum;
      }
    }
    prodInfo = encodeURI(prodInfo);
    for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    wx.request({
      url: app.globalData.hostUrl + "app/submit_product_order",
      data: {
        memberId: wx.getStorageSync('memberId'),
        bidpriceOrderbPayway:"1",
        orderGiveway:"0",
        memberTaddressId:wx.getStorageSync("myAddress").address_id,
        prodInfo: prodInfo,
        sporder_code: code,
        sporder_user: userName,
        sporder_tel: mobile
      },
      success: function (res) {
        if (app.globalData.conIsCan){
          console.log("push order==",res);
        }
        if(res.data.code==1){
          var orderId=res.data.data.orderId;
          that.gotoPay(orderId);
          // wx.navigateTo({
          //   url: 'order_finish',
          // })
        }else{
          wx.showToast({
            title: '订单提交有误，请稍后再试',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cartsId:options.cartsId,
    })
    if (app.globalData.conIsCan){
      console.log("cartsId==",this.data.cartsId)
    }
    this.getMyCart();
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
  getMyCart: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/cart_info",
      data: {
        memberId: wx.getStorageSync('memberId'),
      },
      success: function (res) {
        if (res.data.code == 1) {
          var carlist=res.data.data.list;
          var cartsIdList=that.data.cartsId.split(',');
          if(res.data.data.list!=undefined){
            for(var i=0;i<cartsIdList.length;i++){
              for (var j = 0; j < carlist.length; j++) {
                if (carlist[j].cartId == cartsIdList[i]){
                  that.data.list.push(carlist[j]);
                  that.data.totalValue+=carlist[j].gnormsNum * carlist[j].harlan_gnorms.goodsMallprice;
                }
            }
            }
            if (carlist.length>2){
              that.data.list1.push(carlist[0]);
              that.data.list1.push(carlist[1]);
              that.data.list2.push(carlist[0]);
              that.data.list2.push(carlist[1]);
            }else{
              that.data.list1=that.data.list;
              that.data.list2=that.data.list;
            }
            that.setData({
              list: that.data.list,
              list1:that.data.list1,
              list2: that.data.list2,
              totalValue:that.data.totalValue
            })
          }else{
            wx.showToast({
              title: '系统故障，请稍后重试',
              icon: 'none',
              duration: 1500
            })
          }
          // 价格方法
          console.log("list==", that.data.list2);
        }else{
          wx.showToast({
            title: '系统故障，请稍后重试',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /*获取微信sign*/
  gotoPay : function(orderId){
    var that = this;
    wx.request({
      url: app.globalData.hostUrl + "app/order_wechat_sign",
      data: {
        orderid: orderId,
        openId: wx.getStorageSync("openid"),
        uid:wx.getStorageSync("memberId")
      },
      success: function (res) {
        if (app.globalData.conIsCan) {
          console.log("wechatSign==", res)
        }
        if(res.data.code==1){
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
        }else{
          that.goNextPage(false, orderId);
        }
      }
    })
  },

// 去下一页
  goNextPage: function (NoIsYes, orderId){
    if(NoIsYes){
      wx.showToast({
        title: '支付成功',
        icon: 'none',
        duration: 1500
      });
    }else{
      wx.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 1500
      });
    }
    wx.redirectTo({
      url: 'order_finish?orderId='+orderId,
    });
  },
})