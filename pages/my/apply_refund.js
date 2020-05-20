// pages/my/apply_refund.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: app.globalData.picUrl,
    currentId: '',
    picText:'',
    showModal: false,
    nowText:"请选择",
    arrays: [
      {
        "typeId": "0",
        "con": "拍错了/多拍/漏拍"
      }, {
        "typeId": "1",
        "con": "商品错发/漏发"
      }, {
        "typeId": "2",
        "con": "商品质量问题"
      }
    ],
    currentIdS: '',
    picTextS:'',
    showModalS: false,
    nowTextS:"请选择",
    Arrays: [
      {
        "typeId": "0",
        "con": "未收到货"
      }, {
        "typeId": "1",
        "con": "已收到货"
      }
    ]
  },

  setText:function(e){
    var nowData = this.data.arrays;//获取数据
    var nowIdx = e.currentTarget.dataset.index;//当前点击的索引
    var nowText = nowData[nowIdx].con;//当前点击的内容
    console.log(nowText);
      this.setData({
        picText: nowText,
        currentId: nowIdx
      })
  },
  setTextS:function(e){
    var nowDataS = this.data.Arrays;//获取数据
    var nowIdxS = e.currentTarget.dataset.index;//当前点击的索引
    var nowTextS = nowDataS[nowIdxS].con;//当前点击的内容
      this.setData({
        picTextS: nowTextS,
        currentIdS: nowIdxS
      })
  },

  // 外面的弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },
  // 禁止屏幕滚动
  preventTouchMove: function () {
  },
  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  },
  pick: function () {
    var picText = this.data.picText;
    this.setData({
      nowText:picText,
      showModal: false
      
    })
  },
  toggleDialog:function () {
    this.setData({
      showModal: false
    })
  },




  // 外面的弹窗
  btnS: function () {
    this.setData({
      showModalS: true
    })
  },
  preventTouchMoveS: function () {
  },
  okS: function () {
    this.setData({
      showModalS: false
    })
  },
  pickS: function () {
    var picTextS = this.data.picTextS;
    this.setData({
      nowTextS:picTextS,
      showModalS: false
    })
  },
  toggleDialogS:function () {
    this.setData({
      showModalS: false
    })
  },
  
  




    
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }


})