const host = "http://47.104.244.246:5001";

const wxRequest = function(params, url) {
  wx.showToast({
    title: '加载中...',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {'content-type': 'application/json'},
    success: function (res) {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: function (res) {
      params.fail && params.fail(res)
    },
    complete: function (res) {
      params.complete && params.complete(res)
    }
  })
}

const innerGetSwiperList = function (params) { wxRequest(params, host + '/getList') }
const getDetailsBasedOnId = function (params) { wxRequest(params, host + '/getDetail') }

module.exports = {
  getSwiperList: innerGetSwiperList,
  getProductDetails: getDetailsBasedOnId
}
