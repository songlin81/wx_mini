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
        //console.log(res.data);
        that.setData({
          swiperList: res.data.data.slides
        })
      }
    })

    // let list = common.getSwiperList()
    // console.log(list)
    // this.setData({
    //   swiperList: list
    // })
  },

  
})