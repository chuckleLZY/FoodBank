import api from '../../api/api'

Page({
  data: {
    shop_id: '',
    shop_detail: '',
    ddl_product: [],
  },
  onLoad: function (options) {
    var that = this
    // 获取到shop_id
    var shop_id = JSON.parse(options.shop_id);
    that.setData({
      shop_id: shop_id
    })
    console.log(that.data.shop_id)
    // 获取商店详细信息
    this.get_shop_detail(that.data.shop_id, this.get_ddl_products);

  },
  get_shop_detail(shop_id, callback) {
    api.get(`${"/shopinfo/getdetailed?shopId="}${shop_id}`).then(res => {
      console.log('shop_detail', res)
      this.setData({
        shop_detail: res
      })
    }).catch(err => {
      console.log(err)
    });
    // 获取临期食品
    callback(shop_id);
  },
  get_ddl_products(shop_id) {
    api.post('/ddlproduct/query', {
      "page_num": 1,
      "page_size": 100000,
      "shop_id": shop_id
    }).then(res => {
      console.log('ddl_product', res);
      this.setData({
        ddl_product: res.ddlproduct_item_list
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
