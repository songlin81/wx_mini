var common = require('../../utils/common.js')
Page({
  data: {
    hiddenloading: true,
    inventoryList: [],
    page: 1,
    hasmoreData: true,
    hiddenloading: true
  },
  onLoad: function(options) {
    var that = this;
    common.getSwiperList({
      method: 'GET',
      data: {"page": that.data.page},
      success: function(res){
        //console.log(res);
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
    var that = this
    that.data.page++
    this.setData({ hiddenloading:false})
    common.getSwiperList({
      method: 'GET',
      data: {"page": that.data.page},
      success: function(res){
        console.log(res.data.data.news.length)
        if(res.data.data.news.length>0){
          console.log('???')
          for(var i=0;i<res.data.data.news.length;i++){
            that.data.inventoryList.push(res.data.data.news[i])
          }
          that.setData({
            inventoryList: that.data.inventoryList
          })
        }else{
          console.log('YYYY')
        }
      },
      fail: function(res){
        console.log('fail: '+res.errMsg.toString())
      },
      complete: function(res){
        console.log('complete: '+res.statusCode.toString())
        //wx.hideLoading()
      }
    })
  },
})