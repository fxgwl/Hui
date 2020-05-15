// tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#999999",
        "selectedColor": "#0d6fb8",
        "list": [
          {
            "pagePath": "/pages/classify/goods_classify",
            "iconPath": "../image/classify.png",
            "selectedIconPath": "../image/classify_select.png",
            "text": "分类"
          },
          {
            "pagePath": "/pages/pickup/pickup",
            "iconPath": "image/pickup.png",
            "selectedIconPath": "../image/pickup_select.png",
            "text": "取货"
          },
          {
            "pagePath": "/pages/home/home",
            "iconPath": "../image/home.png",
            "isSpecial": true,
            "text": ""
          },
          {
            "pagePath": "/pages/cart/cart",
            "iconPath": "../image/cart.png",
            "selectedIconPath": "../image/cart_select.png",
            "text": "购物车"
          },
          {
            "pagePath": "/pages/my/my",
            "iconPath": "../image/my.png",
            "selectedIconPath": "../image/my_select.png",
            "text": "我的"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPage: function (event) {
      var url = event.currentTarget.dataset.id;
      if (!wx.getStorageSync('memberId')){
        wx.navigateTo({
          url: '../login/warrant'
        })
        return;
      }
      if (url !="/pages/home/home"){
        if(wx.getStorageSync('myAddress').address_id==undefined){
          wx.showToast({
            title: '请先选择小区',
            icon:'none'
          })
          return;
        }
      }
      wx.switchTab({
        url: url,
      })
    }
  },
})