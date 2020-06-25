var common = require('../../utils/common.js')
Page({
  onLoad: function(params) {
    wx.setNavigationBarTitle({ title: "详情页" });
    var that = this;
    let id = params.prodid 
    var item = wx.getStorageSync(id)
    if (item != '') {
      this.setData({
        product: item,
        isAdd: true
      })
    }
    else {
      common.getProductDetails({
        method: 'GET',
        data: {"prodid": id},
        success: function(res){
          console.log(res.data);
          that.setData({
            product: res.data,
            isAdd: false
          })
        },
        fail: function(res){
          console.log('fail: '+res.errMsg.toString())
        },
        complete: function(res){
          console.log('complete: '+res.statusCode.toString())
        }
      })
    }
  },

  addFavorites: function() {
    let item = this.data.product; 
    wx.setStorageSync(item.goodsId, item); 
    this.setData({
      isAdd: true
    });
  },

  cancelFavorites: function() {
    let item = this.data.product;
    wx.removeStorageSync(item.goodsId);
    this.setData({
      isAdd: false
    });
  }
})