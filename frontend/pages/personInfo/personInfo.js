const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    nickName: "",
    avatarUrl: ""
  },
  showUserInfoTap: function () {
    // 授权
    wx.getUserProfile({
      desc: '快把信息给我', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (wxres) => {
        console.log(wxres.userInfo);

        // wx.login 获得用户的unionID
        wx.login({
          success: res => {
            console.log("hello world", res);
            // 发送 unionID 到后台进行登录，后台再向微信发送信息换取 openId, sessionKey, unionId
            wx.request({
              url: 'https://www.lohas.ink/api/user/login',
              data: {
                "code": res.code
              },
              method: "POST",
              success(res) {
                // console.log(res.header)
                // 成功后在app.globalData里面记录下token
                app.globalData.token = res.header["token"];
                console.log("loginSuccess，token is ", app.globalData.token);
              },
              fail(error) {
                console.log("loginError", error);
              }
            })
            this.setData({
              userInfo: wxres.userInfo,
              nickName: wxres.userInfo.nickName,
              avatarUrl: wxres.userInfo.avatarUrl
            });
          }
        })

      },
      fail: (res) => {
        console.log('getUserProfileFail', res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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