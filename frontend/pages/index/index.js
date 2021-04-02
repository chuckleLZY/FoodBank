// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    toView: 'green',
    upperViewTop: 100,
    upperViewHeight: 120,
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
    this.setData({
      //设置map上层的信息层的初始位置
      upperViewTop: wx.getSystemInfoSync().windowHeight / 4 * 3,
      //设置map上层的信息层的初始高度
      upperViewHeight: wx.getSystemInfoSync().windowHeight / 4,
    })
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
  changePosition() {
    //改变map上层的信息层的位置与高度
    console.log("changePosition");
    if (this.data.upperViewHeight == wx.getSystemInfoSync().windowHeight / 2) {
      console.log("here111");
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, 0).step()
      this.setData({
          ani: animation.export(),
        }),
        this.setData({
          upperViewHeight: this.data.upperViewHeight - wx.getSystemInfoSync().windowHeight / 4,
        })

    } else {
      console.log("here222");
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, -wx.getSystemInfoSync().windowHeight / 4).step()
      this.setData({
        ani: animation.export(),
        upperViewHeight: this.data.upperViewHeight + wx.getSystemInfoSync().windowHeight / 4,
      })
    }
  },
  upper(e) {
    console.log(e)
  },
  lower(e) {
    console.log(e)
  },
  scroll(e) {
    console.log(e)
  },
  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  getinnerItemCoverInfo(e) {
    console.log(e.currentTarget.dataset)
  }
})
