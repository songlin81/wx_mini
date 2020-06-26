Page({
  data: {
    add_img:[],
    value: "",
    placeholder: "快点评论吧",
    focus: true,
    texts: "至少15个字",
    min: 15,
    max: 520,
    currentWordNumber:0,
    isDisabled: true
  },
  inputs: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len < this.data.min){
      this.setData({
        texts: "至少还需要",
        textss: "个字",
        num: this.data.min-len,
        isDisabled: true
      })
    } else if (len >= this.data.min){
       this.setData({
        texts: " ",
        textss: " ",
        num: '',
        isDisabled: false
      })
    }
    this.setData({
      currentWordNumber: len
    });
    if (len > this.data.max) return;
  },
  gotoShow:function(){
    var that=this;
    wx.chooseImage({
      success: function(res) { 
        var src = res.tempFilePaths;
        var aa=that.data.add_img.concat(src)
        that.setData({
          add_img:aa
        })
      },
    })
  },
  delete_th:function(e){
    var num=e.currentTarget.dataset.num;
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (res) {
        if (res.confirm) { 
          that.data.add_img.splice(num,1)
          that.setData({
            add_img:that.data.add_img
          })
          console.log(that.data.add_img)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  preview_img:function(e){
    var cur_num=e.currentTarget.dataset.num;
    var img_list=this.data.add_img
    wx.previewImage({
      current:img_list[cur_num],
      urls: this.data.add_img
    })
  },
  submitRequest:function(){
    wx.showToast({
      title: '已提交',
      duration: 1000
    })
    this.setData({
      value: "",
      add_img:[],
      currentWordNumber:0,
      isDisabled: true,
      focus: true
    })
  }
})