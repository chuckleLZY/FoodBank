// index.js
import api from '../../api/api'
// 获取应用实例
const app = getApp()

Page({
  data: {
    shop_type: "", //当前展示的商店类型
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
    markers: [], // 地图标记点
    all_background: "#FFFFFF",
    clothing_background: "#FFFFFF",
    food_background: "#FFFFFF",
    housing_background: "#FFFFFF",
    transportation_background: "#FFFFFF",
    all_color: "#000000",
    clothing_color: "#000000",
    food_color: "#000000",
    housing_color: "#000000",
    transportation_color: "#000000",
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
        shop_briefinfo_items_that_shows_on_the_screen: temp_shop_briefinfo_items_that_shows_on_the_screen,
        all_background: "#885fe9",
        clothing_background: "#FFFFFF",
        food_background: "#FFFFFF",
        housing_background: "#FFFFFF",
        transportation_background: "#FFFFFF",
        all_color: "#FFFFFF",
        clothing_color: "#000000",
        food_color: "#000000",
        housing_color: "#000000",
        transportation_color: "#000000",
      })
      // console.log("this.data.shop_briefinfo_items_that_shows_on_the_screen", this.data.shop_briefinfo_items_that_shows_on_the_screen)
      this.setMarkers();
    }).catch(err => {
      console.log(err);
    })
    this.setData({
      heightRange: parseInt(wx.getSystemInfoSync().windowHeight / 4),
      //设置map上层的信息层的初始位置
      upperViewTop: wx.getSystemInfoSync().windowHeight - parseInt(wx.getSystemInfoSync().windowHeight / 4) - 95,
      //设置map上层的信息层的初始高度
      upperViewHeight: parseInt(wx.getSystemInfoSync().windowHeight / 4) + 95,
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
  get_all() {
    api.post('/shopinfo/getbrief', {
      // 这里的pagesize设为无限大？
      "page_num": 1,
      "page_size": 100000
    }).then(res => {
      this.setData({
        total_shop_briefinfo_items: res.shop_briefinfo_items,
      })
      var temp_shop_briefinfo_items_that_shows_on_the_screen = []
      for (var i in this.data.total_shop_briefinfo_items) {
        temp_shop_briefinfo_items_that_shows_on_the_screen.push(this.data.total_shop_briefinfo_items[i])
      }
      this.setData({
        shop_type: "",
        // shop_briefinfo_items_that_shows_on_the_screen: temp_shop_briefinfo_items_that_shows_on_the_screen,
        all_background: "#885fe9",
        clothing_background: "#FFFFFF",
        food_background: "#FFFFFF",
        housing_background: "#FFFFFF",
        transportation_background: "#FFFFFF",
        all_color: "#FFFFFF",
        clothing_color: "#000000",
        food_color: "#000000",
        housing_color: "#000000",
        transportation_color: "#000000",
      })
      this.search();
      this.setMarkers();
    }).catch(err => {
      console.log(err);
    })
  },
  get_brief_by_type(shop_type) {
    api.post('/shopinfo/getbriefbytype', {
      // 这里的pagesize设为无限大？
      "page_num": 1,
      "page_size": 100000,
      "shop_type": shop_type
    }).then(res => {
      this.setData({
        total_shop_briefinfo_items: res.shop_briefinfo_items,
      })
      var temp_shop_briefinfo_items_that_shows_on_the_screen = []
      for (var i in this.data.total_shop_briefinfo_items) {
        temp_shop_briefinfo_items_that_shows_on_the_screen.push(this.data.total_shop_briefinfo_items[i])
      }
      this.setData({
        // shop_briefinfo_items_that_shows_on_the_screen: temp_shop_briefinfo_items_that_shows_on_the_screen,
        all_background: "#FFFFFF",
        clothing_background: "#FFFFFF",
        food_background: "#FFFFFF",
        housing_background: "#FFFFFF",
        transportation_background: "#FFFFFF",
        all_color: "#000000",
        clothing_color: "#000000",
        food_color: "#000000",
        housing_color: "#000000",
        transportation_color: "#000000",
      })
      if (shop_type == "bread") {
        this.setData({
          shop_type: "bread",
          clothing_background: "#885fe9",
          clothing_color: "#FFFFFF",
        })
      } else if (shop_type == "fruit") {
        this.setData({
          shop_type: "fruit",
          food_background: "#885fe9",
          food_color: "#FFFFFF",
        })
      } else if (shop_type == "market") {
        this.setData({
          shop_type: "market",
          housing_background: "#885fe9",
          housing_color: "#FFFFFF",
        })
      } else if (shop_type == "others") {
        this.setData({
          shop_type: "others",
          transportation_background: "#885fe9",
          transportation_color: "#FFFFFF",
        })
      }
      this.search();
      this.setMarkers();
    }).catch(err => {
      console.log(err);
    })
  },
  //面包
  get_clothing() {
    this.get_brief_by_type("bread");
  },
  //水果
  get_food() {
    this.get_brief_by_type("fruit");
  },
  //商超
  get_housing() {
    this.get_brief_by_type("market");
  },
  //其他
  get_transportation() {
    this.get_brief_by_type("others");
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
    if (!this.data.flag) {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, -this.data.heightRange).step();
      this.setData({
          flag: true,
          ani: animation.export(),
        }),
        this.setData({
          upperViewHeight: this.data.upperViewHeight + this.data.heightRange,
        })
    } else {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      });
      animation.translate(0, 0).step()
      this.setData({
        ani: animation.export(),
      })
      setTimeout(() => {
        this.setData({
          flag: false,
          upperViewHeight: parseInt(wx.getSystemInfoSync().windowHeight / 4) + 95,
        })
      }, 500);
    }
  },
  handleInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 点击清空输入框icon
  handleDeleteClick: function () {
    this.setData({
      inputValue: ''
    })
  },
  // 点击取消触发
  handleTextbtnClick() {
    // 触发父组件中的方法
    this.setData({
      inputValue: ''
    })
  },
  // 用户点击确定触发
  handleConfirm() {
    this.triggerEvent('handleSearch', this.data.inputValue)
  },
  filter(list, keyWord) {
    console.log("list", list)
    var reg = new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].shop_name)) {
        arr.push(list[i]);
      }
    }
    console.log("filter", arr)
    return arr;
  },
  search() {
    console.log("search", this.data.inputValue)

    // this.filter(this.data.total_shop_briefinfo_items, this.data.inputValue)

    this.setData({
      shop_briefinfo_items_that_shows_on_the_screen: this.filter(this.data.total_shop_briefinfo_items, this.data.inputValue)
    })
    // api.post('/shopinfo/search', {
    //   // 这里的pagesize设为无限大？
    //   "page_num": 1,
    //   "page_size": 100000,
    //   "keyword": this.data.inputValue
    // }).then(res => {
    //   console.log("searchRes", res)
    //   this.setData({
    //     total_shop_briefinfo_items: res.shop_briefinfo_items
    //   })
    //   console.log("total_shop_briefinfo_items", this.data.total_shop_briefinfo_items)
    //   var temp_shop_briefinfo_items_that_shows_on_the_screen = []
    //   for (var i in this.data.total_shop_briefinfo_items) {
    //     if (this.data.total_shop_briefinfo_items[i].shop_type == this.data.shop_type || this.data.shop_type == "") {
    //       temp_shop_briefinfo_items_that_shows_on_the_screen.push(this.data.total_shop_briefinfo_items[i])
    //     }
    //   }
    //   this.setData({
    //     shop_briefinfo_items_that_shows_on_the_screen: temp_shop_briefinfo_items_that_shows_on_the_screen
    //   })
    //   this.setMarkers();
    // })
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