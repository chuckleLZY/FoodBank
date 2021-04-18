import api from '../../api/api'

// pages/mystery_box/mystery_box.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_list: [], // 所有商店的shop_id和shop_name
    mystery_box_list: [], //盲盒列表
    // 结构如下
    // [
    //   {
    //     shop_id:1,
    //     shop_name:'',
    //     mystery_box:[
    //       {
    //         "price": 0,
    //         "product_id": 0,
    //         "product_intro": "string",
    //         "product_name": "string",
    //         "product_pic": "string",
    //         "product_pubdate": "2021-04-16T14:30:44.473Z"
    //       }
    //     ]
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获得所有商店的shop_id
    this.get_shop_id_list(this.get_mystery_box_list);

  },
  // 获得所有商店的shop_id
  get_shop_id_list(get_mystery_box_list_callback) {
    api.post('/shopinfo/getbrief', {
      "page_num": 1,
      "page_size": 100000
    }).then(res => {
      var shop_list = [];
      for (var i in res.shop_briefinfo_items) {
        shop_list.push({
          shop_id: res.shop_briefinfo_items[i].shop_id,
          shop_name: res.shop_briefinfo_items[i].shop_name
        })
      }
      this.setData({
        shop_list: shop_list
      })
      console.log("shop_list", shop_list);
      // 获得所有的盲盒列表
      get_mystery_box_list_callback(this.set_mystery_box_list);
    }).catch(err => {
      console.log(err);
    })
  },
  // 获得所有的盲盒列表
  get_mystery_box_list(set_mystery_box_list_callBack) {
    var promise_list = []
    for (let shop of this.data.shop_list) {
      var promise = new Promise((resolve, reject) => {
        api.post('/mysterybox/query', {
          "page_num": 1,
          "page_size": 100000,
          "shop_id": shop.shop_id
        }).then(res => {
          resolve({
            shop_id: shop.shop_id,
            shop_name: shop.shop_name,
            mystery_box: res.mystery_box_list
          })
        }).catch(err => {
          reject(err)
          console.log(err);
        })
      })
      promise_list.push(promise)
    }
    Promise.all(promise_list).then(res => {
      set_mystery_box_list_callBack(res)
    })
  },
  set_mystery_box_list(mystery_box_list) {
    var mystery_boxs = []
    for (let i of mystery_box_list) {
      if (i.mystery_box.length > 0) {
        mystery_boxs.push(i)
      }
    }
    this.setData({
      mystery_box_list: mystery_boxs
    })
  },
  to_shop_info(e) {
    console.log("shop_id", e.currentTarget.dataset.shop_id)
        wx.navigateTo({
      url: '../shopDetailedInfo/shopDetailedInfo?shop_id=' + e.currentTarget.dataset.shop_id,
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