Page({
  data: {
    num: 0
  },

  onShow: function () {
    if(this.data.isLogin){
      this.getMyFavorites()
    }
  },

  isUUID: function (uuid) {
    let s = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
      return false;
    }
    return true;
  },

  getMyFavorites: function () {
    let info = wx.getStorageInfoSync();
    console.log(info)
    let keys = info.keys;
    let num = keys.length;
    let myList = [];
    let count = 0;
    for (var i = 0; i < num; i++) {
      if(this.isUUID(keys[i])){
        let obj = wx.getStorageSync(keys[i]);
        myList.push(obj);
        count++;
      }
    }
    this.setData({
      newsList: myList,
      num: count
    });
  },

  getMyInfo: function (e) {
    let info = e.detail.userInfo;
    console.log(info)
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
    this.getMyFavorites();
  },

  getOpenid: function() {  
    let that = this;
    wx.login({   
      success: function(res) {
      wx.request({     
        url: 'https://30paotui.com/user/wechat',     
        data: {     
          appid: '你的小程序appid',      
          secret: '你的小程序secret',      
          code: res.code
       },     
       success: function(response) {      
         var openid = response.data.openid;      
         console.log('请求获取openid:' + openid);
          wx.setStorageSync('openid', openid);
          that.setData({       
            openid: "获取到的openid：" + openid
          })
       }
      })
     }
    })
   },

  goToDetail: function (e) {
    let id = e.currentTarget.dataset.prodid;
    wx.navigateTo({
      url: "/pages/details/details?prodid="+e.currentTarget.dataset.prodid
    })
  },

  takePhote: function(){
    wx.navigateTo({
      url: "/pages/camera/camera"
    });
  },
})