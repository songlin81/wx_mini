Page({
  data: {
    region: ['天津市', '天津市', '和平区'],
    now:{
      tmp:0, cond_txt:'未知', cond_code:'999',
      hum:0, pres:0, vis:0,
      wind_dir:0, wind_spd:0, wind_sc:0
    },
    versionNo:''
  },
  
  onLoad: function(params) {
    this.getWeather();
    this.setData({
      versionNo: params.version
    })
  },

  regionChange: function(e) {
    this.setData({region: e.detail.value});
    console.log(e.detail.value)
    this.getWeather();
  },

  getWeather: function () {
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data:{
        location:that.data.region[1],
        key: 'bc7b558ade654ea4814719d138032073'
      },
      success:function(res){
        console.log(res.data);
        that.setData({now:res.data.HeWeather6[0].now});
      }
    })
  }
})