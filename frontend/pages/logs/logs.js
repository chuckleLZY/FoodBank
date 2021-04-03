// logs.js
const util = require('../../utils/util.js')
import api from '../../api/api'
Page({
  data: {
    logs: []
  },
  onLoad() {
    // api.get('/userinfo/get').then(res => {
    //   console.log("123",res)
    // }).catch(err => {
    //   wx.showToast({
    //     title: err.message,
    //     icon: 'none'
    //   })
    // })
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
