const app = getApp();
Page({
  data: {
    // motto: '用户ID',
    balance: '￥1250,18',
    hasUserInfo: false,
    userInfo: {},
  },
  changeMoney: function (e) {
    this.setData({
      Amount: -12345
    })
  },
  getUserProfile(e) {
    // 授权
    wx.getUserProfile({
      desc: '快把信息给我', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
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
                console.log(res.header)
                console.log("loginSuccess，token is ", res.header["token"]);
                // 成功后在app.globalData里面记录下token
                app.globalData.token = res.header["token"];
              },
              fail(error) {
                console.log("loginError", error);
              }
            })
          }
        })
      },
      fail: (res) => {
        console.log('getUserProfileFail', res);
      }
    })
  }
})
