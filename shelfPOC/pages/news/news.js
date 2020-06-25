var common = require('../../utils/common.js')
Page({
  data: {
  },

  onLoad: function(options) {
    var that = this;
    common.getSwiperList({
      method: 'GET',
      data: {
      },
      success: function(res){
        console.log(res.data.data.slides);
        that.setData({
          swiperList: res.data.data.slides
        })
      }
    })
  },
  navDetail: function(e){
    wx.navigateTo({
      url: "/pages/details/details?prodid="+e.currentTarget.dataset.prodid
    });
  }
})