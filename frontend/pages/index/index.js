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

  },
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.mpCtx = wx.createMapContext("myMap");
        //赋值经纬度
        console.log("onLoad", res),
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
      }
    })
  },
  bindtap(e) {
    console.log("bindtap", e);
    // console.log(this.data.latitude, this.data.longitude)
    this.mpCtx.moveToLocation();
  },
  bindmarkertap(e) {
    console.log("bindmarkertap", e);
    this.mpCtx.moveToLocation({
      latitude: this.data.markers[e.detail.markerId].latitude,
      longitude: this.data.markers[e.detail.markerId].longitude,
    })
  },
})
