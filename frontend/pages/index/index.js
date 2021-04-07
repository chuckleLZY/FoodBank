// index.js
import api from '../../api/api'
// 获取应用实例
const app = getApp()

Page({
  data: {
    total_shop_briefinfo_items: [],
    heightRange: 0,
    shop_briefinfo_items_that_shows_on_the_screen: [],
    toView: 'green',
    upperViewTop: 100,
    upperViewHeight: 120,
    latitude: "",
    longitude: "",
    scale: 14,
    flag: false,
    markers: [ //标志点的位置
      //位置
      // {
      //   id: 0,
      //   iconPath: "../../images/map.png",
      //   latitude: 31.288407,
      //   longitude: 121.207383,
      //   width: 28,
      //   height: 32,
      //   label: {
      //     content: "商家1",
      //   }
      // },
      // {
      //   id: 1,
      //   iconPath: "../../images/map.png",
      //   latitude: 31.298407,
      //   longitude: 121.217383,
      //   width: 28,
      //   height: 32,
      //   label: {
      //     content: "商家2",
      //   }
      // }
    ],

  },
  onLoad: function (options) {
    api.post('/shopinfo/getbrief', {
      // 这里的pagesize设为无限大？
      "page_num": 1,
      "page_size": 100000
    }).then(res => {
      // console.log(res);
      this.setData({
        total_shop_briefinfo_items: res.shop_briefinfo_items,
      })
      // console.log(this.data.total_shop_briefinfo_items)
      var temp_shop_briefinfo_items_that_shows_on_the_screen = []
      for (var i in this.data.total_shop_briefinfo_items) {
        temp_shop_briefinfo_items_that_shows_on_the_screen.push(this.data.total_shop_briefinfo_items[i])
        // console.log(this.data.total_shop_briefinfo_items[i])
      }
      this.setData({
        shop_briefinfo_items_that_shows_on_the_screen: temp_shop_briefinfo_items_that_shows_on_the_screen
      })
      // console.log("this.data.shop_briefinfo_items_that_shows_on_the_screen", this.data.shop_briefinfo_items_that_shows_on_the_screen)
      this.setMarkers();
    }).catch(err => {
      console.log(err);
    })
    this.setData({
      heightRange: parseInt(wx.getSystemInfoSync().windowHeight / 4),
      //设置map上层的信息层的初始位置
      upperViewTop: parseInt(wx.getSystemInfoSync().windowHeight / 4) * 3,
      //设置map上层的信息层的初始高度
      upperViewHeight: parseInt(wx.getSystemInfoSync().windowHeight / 4),
    });

    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.mpCtx = wx.createMapContext("myMap");
        //赋值经纬度
        // console.log("onLoad", res),
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })

  },
  // 设置地图标志点
  setMarkers() {
    var temp_markers = []
    for (var i in this.data.shop_briefinfo_items_that_shows_on_the_screen) {
      temp_markers.push({
        id: parseInt(i), // 这里注意不是shop_id
        iconPath: "../../images/map.png",
        latitude: this.data.shop_briefinfo_items_that_shows_on_the_screen[i].shop_latitude,
        longitude: this.data.shop_briefinfo_items_that_shows_on_the_screen[i].shop_longitude,
        width: 28,
        height: 32,
        desc: this.data.shop_briefinfo_items_that_shows_on_the_screen[i].shop_id, //这里才是shop_id
        label: {
          content: this.data.shop_briefinfo_items_that_shows_on_the_screen[i].shop_name
        }
      })
    };
    this.setData({
      markers: temp_markers,
    })
    console.log(this.data.markers)
  },

  bindtap(e) {
    console.log("bindtap", e);
    // console.log(this.data.latitude, this.data.longitude)
    this.mpCtx.moveToLocation();
  },
  to_shop_detail(e) {
    console.log(e.currentTarget.dataset.shop_id); //这玩意是shop_id
    this.mpCtx.moveToLocation({
      latitude: this.data.shop_briefinfo_items_that_shows_on_the_screen[e.currentTarget.dataset.index].shop_latitude,
      longitude: this.data.shop_briefinfo_items_that_shows_on_the_screen[e.currentTarget.dataset.index].shop_longitude,
    });
    wx.navigateTo({
      url: '../shopDetailedInfo/shopDetailedInfo?shop_id=' + e.currentTarget.dataset.shop_id,
    })
  },
  bindmarkertap(e) {
    console.log("bindmarkertap", e);
    this.mpCtx.moveToLocation({
      latitude: this.data.markers[e.detail.markerId].latitude,
      longitude: this.data.markers[e.detail.markerId].longitude,
    });
    wx.navigateTo({
      url: '../shopDetailedInfo/shopDetailedInfo?shop_id=' + this.data.markers[e.detail.markerId].desc,
    })
  },

  changePosition() {
    //改变map上层的信息层的位置与高度
    console.log("changePosition", this.data.upperViewHeight, this.data.heightRange);
    if (this.data.upperViewHeight == this.data.heightRange) {
      console.log("here111");
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, -this.data.heightRange).step();
      this.setData({
          ani: animation.export(),
        }),
        this.setData({
          upperViewHeight: this.data.upperViewHeight + this.data.heightRange,
        })

    } else {
      console.log("here222");
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, 0).step()
      this.setData({
        ani: animation.export(),
        upperViewHeight: this.data.upperViewHeight - this.data.heightRange,
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

})
