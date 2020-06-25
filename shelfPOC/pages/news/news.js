var common = require('../../utils/common.js')
Page({
  data: {
    hiddenloading: true,
    inventoryList: []
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
  },

  onReachBottom: function () {
    var that = this;
    //wx.showLoading({title: '加载中…', icon: 'loading'})
    wx.showToast({title: '加载中', icon: 'loading'});
    this.setData({ hiddenloading:false})
    common.getSwiperList({
      method: 'GET',
      data: {},
      success: function(res){
        for(var i=0;i<res.data.data.news.length;i++){
          that.data.inventoryList.push(res.data.data.news[i])
        }
        that.setData({
          inventoryList: that.data.inventoryList
        })
      },
      fail: function(res){
        console.log('fail: '+res.errMsg.toString())
      },
      complete: function(res){
        console.log('complete: '+res.statusCode.toString())
        wx.hideToast();
        //wx.hideLoading()
      }
    })
  },
})