import api from '../../api/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mystery_boxes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.post('/mysteryboxorder/userorder', {
      "page_num": 1,
      "page_size": 100000
    }).then(res => {
      console.log("resresres", res)
      for (var i in res.mystery_boxes) {
        var date = new Date(res.mystery_boxes[i].order_time)
        res.mystery_boxes[i].order_time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getDate();
      }
      this.setData({
        mystery_boxes: res.mystery_boxes
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})