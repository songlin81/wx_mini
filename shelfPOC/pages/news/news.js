var common = require('../../utils/common.js')
Page({
  data: {
  },
  onLoad: function(options) {
    var that = this;
    common.getSwiperList({
      method: 'GET',
      data: {},
      success: function(res){
        console.log(res);
        that.setData({
          swiperList: res.data.data.slides,
          inventoryList: res.data.data.news
        })
      },
      fail: function(res){
        console.log('fail: '+res.errMsg.toString())
      },
      complete: function(res){
        console.log('complete: '+res.statusCode.toString())
      }
    })
  },
  navDetail: function(e){
    wx.navigateTo({
      url: "/pages/details/details?prodid="+e.currentTarget.dataset.prodid
    });
  }
})