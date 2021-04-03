// app.js
App({
  onLaunch() {
    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("hello world", res);
        // 向服务器发送登录请求
        wx.request({
          url: 'http://47.118.59.241:18080/api/user/login',
          data: {
            "code": res.code
          },
          method: "POST",
          success(res) {
            console.log("loginSuccess",res);
            // 存储token(必须要 var that=this, 不能this)
            that.globalData.token = res.header["Token"];
          },
          fail(error) {
            console.log("loginError", error);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    token: "",
  }
})
