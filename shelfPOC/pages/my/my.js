Page({
  data: {
    num: 0
  },

  globalData:{
    appid:'wx3844be5fa785d5b3', 
    secret:'7bd68d4156e5f06e9e56e19c55df4043', 
  },
  onLoad: function () {
    var that = this
    var user=wx.getStorageSync('user') || {};  
    var userInfo=wx.getStorageSync('userInfo') || {}; 
    if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){ 
       wx.login({  
       success: function(res){ 
           if(res.code) {
               wx.getUserInfo({
                   success: function (res) {
                       var objz={};
                       objz.avatarUrl=res.userInfo.avatarUrl;
                       objz.nickName=res.userInfo.nickName;
                       console.log(objz);
                       wx.setStorageSync('userInfo', objz);
                   }
               });
               var d=that.globalData;
               var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';  
               wx.request({  
                   url: l,  
                   data: {},  
                   method: 'GET',
                   header: {},
                   success: function(res){ 
                       var obj={};
                       obj.openid=res.data.openid;  
                       obj.expires_in=Date.now()+res.data.expires_in;  
                       console.log(obj);
                       wx.setStorageSync('user', obj);
                   }  
               });
           }else {
               console.log('获取用户登录态失败！' + res.errMsg)
           }          
       }  
     }); 
   } 
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
    //console.log(info)
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
    let info = e.detail.userInfo
    console.log(info)
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
    this.getMyFavorites()
  },

  goToDetail: function (e) {
    let id = e.currentTarget.dataset.prodid
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