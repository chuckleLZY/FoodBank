// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    latitude: "",
    longitude: "",
    scale: 14,
    markers: [ //标志点的位置
      //位置
      {
        id: 0,
        iconPath: "../../images/map.png",
        latitude: 31.288407,
        longitude: 121.207383,
        width: 28,
        height: 32,
        label: {
          content: "商家1",
        }
      },
      {
        id: 1,
        iconPath: "../../images/map.png",
        latitude: 31.298407,
        longitude: 121.217383,
        width: 28,
        height: 32,
        label: {
          content: "商家2",
        }
      }
    ],
    controls: [{
      id: 1,
      iconPath: '../../images/map.png',
      position: {
        left: 15,
        top: 260 - 50,
        width: 40,
        height: 40
      },
      clickable: true
    }],
  },
  onLoad: function (options) {
    
    this.mapCtx = wx.createMapContext('map')

    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        console.log("onLoad", res),
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
      }
    })
  },

  bindcontroltap(e) {
    var that = this;
    if (e.controlId == 1) {
      that.setData({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 14,
      })
    }
  },
  bindmarkertap(e) {
    console.log("bindmarkertap",e),
    this.mapCtx.moveToLocation({
      latitude: this.data.markers[e.markerId].latitude,
      longitude: this.data.markers[e.markerId].longitude,
    })
  },
})
