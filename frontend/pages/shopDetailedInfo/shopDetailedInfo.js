import api from '../../api/api'
const app = getApp();

Page({
  data: {
    shop_id: '', // 商店的shop_id
    shop_detail: '', // 商店的详细信息
    shop_announcements: [], // 商店公告
    ddl_product: [], // 商店的临期商品列表
    shop_comment: [], // 商店的评论列表
    comment_text: '',
    modalHidden: true, // 评论输入框是否隐藏
    is_collected: false // 是否收藏了
  },
  onLoad: function (options) {
    var that = this
    // 获取到shop_id
    var shop_id = JSON.parse(options.shop_id);
    that.setData({
      shop_id: shop_id,
    })
    console.log(that.data.shop_id)
    // 获取商店详细信息
    this.get_shop_detail(that.data.shop_id, this.get_announcement, this.get_ddl_products, this.get_shop_comment);
  },
  get_shop_detail(shop_id, get_announcement_callback, ddl_product_callback, shop_comment_callback) {
    // 还没有登录
    if (!app.globalData.token) {
      api.get(`${"/shopinfo/getdetailed?shopId="}${shop_id}`).then(res => {
        console.log('shop_detail', res)
        this.setData({
          shop_detail: res
        })
      }).catch(err => {
        console.log(err)
      });
    } else {
      api.post("/shopinfo/getdetailedwithcollect", {
        "page_num": 1,
        "page_size": 100000
      }).then(res => {
        console.log('shop_detail', res)
        for (var i in res.shop_briefinfo_items) {
          if (res.shop_briefinfo_items[i].shop_id == this.data.shop_id) {
            this.setData({
              shop_detail: res.shop_briefinfo_items[i],
              is_collected: res.shop_briefinfo_items[i].is_collected == 1 ? true : false
            })
          }
        }

        console.log("is_collected", this.data.is_collected)

      }).catch(err => {
        console.log(err)
      });
    }

    // 获取公告
    get_announcement_callback(shop_id)
    // 获取临期食品
    ddl_product_callback(shop_id);
    // 获取商店评论
    shop_comment_callback(shop_id);
  },
  get_announcement(shop_id) {
    api.post('/announcement/query', {
      "page_num": 1,
      "page_size": 100000,
      "shop_id": shop_id
    }).then(res => {
      console.log("gonggao", res)
      this.setData({
        shop_announcements: res.shop_announcements[0]
      })
      console.log(this.data.shop_announcements)
    }).catch(err => {
      console.log(err);
    })
  },
  get_ddl_products(shop_id) {
    api.post('/ddlproduct/query', {
      "page_num": 1,
      "page_size": 100000,
      "shop_id": shop_id
    }).then(res => {
      this.setData({
        ddl_product: res.ddlproduct_item_list
      })
    }).catch(err => {
      console.log(err);
    })
  },
  get_shop_comment(shop_id) {
    api.post('/comment/querybyshop', {
      "page_num": 1,
      "page_size": 100000,
      "shop_id": shop_id
    }).then(res => {
      this.setData({
        shop_comment: res.comment_item_list
      });
    }).catch(err => {
      console.log(err);
    })
  },
  comment() {
    // 评论
    // 如果没有token，就跳转到登录页面
    if (!app.globalData.token) {
      wx.showModal({
        title: '暂未登录',
        content: '是否登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../personInfo/personInfo',
            })
          } else if (res.cancel) {}
        }
      })
    } else {
      this.setData({
        modalHidden: false
      })
    }
  },
  comment_input(e) {
    // 接收输入框的输入
    this.setData({
      comment_text: e.detail.value
    })
    // console.log("now the comment text is ", this.data.comment_text)
  },
  comfirm_comment(e) {
    // 确定评论
    console.log("comfirm", this.data.comment_text)
    api.post('/comment/create', {
      "content": this.data.comment_text,
      "shop_id": this.data.shop_id,
    }).then(res => {
      console.log(res);
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000
      });
      this.onLoad({
        shop_id: this.data.shop_id
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '添加失败',
        icon: 'fail',
        duration: 1000
      })
    })
    this.setData({
      modalHidden: true
    })
  },
  cancel_comment() {
    //取消评论
    this.setData({
      modalHidden: true
    })
  },
  add_collect() {
    // 如果没有token，就跳转到登录页面
    if (!app.globalData.token) {
      wx.showModal({
        title: '暂未登录',
        content: '是否登录',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../personInfo/personInfo',
            })
          } else if (res.cancel) {}
        }
      })
    } else {
      // 添加收藏
      api.post('/collect/add', {
        "shop_id": this.data.shop_id,
      }).then(res => {
        console.log(res);
        this.setData({
          is_collected: true
        })
      }).catch(err => {
        console.log(err);
      })
    }
  },
  cancel_collect() {
    api.post('/collect/delete', {
      "shop_id": this.data.shop_id,
    }).then(res => {
      console.log(res);
      this.setData({
        is_collected: false
      })
    }).catch(err => {
      console.log(err);
    })
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
  }
})
