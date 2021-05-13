Page({
  data: {
    photo_src: ''
  },
  chose_photo: function (evt) {
    let _this = this;
    wx.showActionSheet({
      itemList: ['拍照', '选择本地文件'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success(res) {
              _this.setData({
                photo_src: res.tempFilePaths[0]
              })
            }
          })
        }
        if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success(res) {
              _this.setData({
                photo_src: res.tempFilePaths[0]
              })
            }
          })
        }
      }
    })
  },
  reselect: function (evt) {
    let _this = this
    wx.showActionSheet({
      itemList: ['拍照', '选择本地文件'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success(res) {
              _this.setData({
                photo_src: res.tempFilePaths[0]
              })
            }
          })
        }
        if (res.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success(res) {
              _this.setData({
                photo_src: res.tempFilePaths[0]
              })
            }
          })
        }
      }
    })
  },
  photo_preview: function (evt) {
    let _this = this;
    let imgs = [];
    imgs.push(_this.data.photo_src);
    wx.previewImage({
      urls: imgs
    })
  },
  confirm: function () {
    console.log("上传")
    wx.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 1000
    });
    setTimeout( ()=> {
      this.setData({
        photo_src: ""
      })
    }, 1000)
  }
})