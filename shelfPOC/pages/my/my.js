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
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
    this.getMyFavorites();
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