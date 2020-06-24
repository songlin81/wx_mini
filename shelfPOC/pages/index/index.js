Page({
  onLoad: function() {
    var that = this;
    wx.request({
      url: 'http://47.104.244.246:5001/getList',
      header: {'content-type': 'application/json'},
      success: function (res) {
        that.setData({
            isDownloading: false,
            percentNum: 0,
            bookList: res.data.bookList
        })
      }
    })
  },

  data: {},

  readBook: function(e) {
    var that = this
    let id = e.currentTarget.dataset.id
    let fileUrl = e.currentTarget.dataset.file
    // console.log(id);
    // console.log(fileUrl);
    let path = wx.getStorageSync(id)
    if (path == '') {
      that.setData({
        isDownloading: true
      })
      const downloadTaskInit = wx.downloadFile({
        url: fileUrl,
        success: function(res) {
          that.setData({
            isDownloading: false
          })
          if (res.statusCode == 200) {
            path = res.tempFilePath
            that.saveBook(id, path)
          }
          else {
            that.showTips('暂时无法下载！')
          }
        },
        fail: function(e) {
          that.setData({
            isDownloading: false
          })
          that.showTips('无法连接到服务器！')
        }
      })

      downloadTaskInit.onProgressUpdate(function(res) {
        let progress = res.progress;
        that.setData({
          percentNum: progress
        })
      })
    }
    else {
      that.openBook(path)
    }
  },

  openBook: function(path) {
    wx.openDocument({
      filePath: path,
      success: function(res) {
        console.log('打开图书成功')
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },

  saveBook: function(id, path) {
    var that = this
    wx.saveFile({
      tempFilePath: path,
      success: function(res) {
        let newPath = res.savedFilePath
        wx.setStorageSync(id, newPath)
        that.openBook(newPath)
      },
      fail: function(error) {
        console.log(error)
        that.showTips('文件保存失败！')
      }
    })
  },

  showTips: function(content) {
    wx.showModal({
      title: '提醒',
      content: content,
      showCancel: false
    })
  },

  navWeather: function(){
    wx.navigateTo({
      url: "/pages/weather/weather?version=v1"
    });
  },
})