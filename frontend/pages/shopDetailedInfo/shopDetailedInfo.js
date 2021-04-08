import api from '../../api/api'

Page({
  data: {
    shop_id: '', // 商店的shop_id
    shop_detail: '', // 商店的详细信息
    ddl_product: [], // 商店的临期商品列表
    shop_comment: [], // 商店的评论列表
    comment_input_show: false,
    comment_text: '',
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
    this.get_shop_detail(that.data.shop_id, this.get_ddl_products, this.get_shop_comment);

  },
  get_shop_detail(shop_id, ddl_product_callback, shop_comment_callback) {
    api.get(`${"/shopinfo/getdetailed?shopId="}${shop_id}`).then(res => {
      console.log('shop_detail', res)
      this.setData({
        shop_detail: res
      })
    }).catch(err => {
      console.log(err)
    });
    // 获取临期食品
    ddl_product_callback(shop_id);
    // 获取商店评论
    shop_comment_callback(shop_id);
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
  get_shop_comment(shop_id) {
    api.post('/comment/querybyshop', {
      "page_num": 1,
      "page_size": 100000,
      "shop_id": shop_id
    }).then(res => {
      console.log('shop_comment', res);
      this.setData({
        shop_comment: res.comment_item_list
      });
      console.log(this.data.shop_comment)
    }).catch(err => {
      console.log(err);
    })
  },
  comment() {
    // 评论
    console.log("comment");
    this.setData({
      comment_input_show: true
    })
  },
  comment_input(e) {
    // 接收输入框的输入
    // console.log(e.detail.value)
    this.setData({
      comment_text: e.detail.value
    })
    // console.log("now the comment text is ", this.data.comment_text)
  },
  comfirm_comment(e) {
    // 确定评论
    // console.log("comfirm", this.data.comment_text)
    api.post('/comment/create', {
      "content": this.data.comment_text,
      "shop_id": this.data.shop_id,
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
    this.setData({
      comment_input_show: false
    })
  },
  cancel_comment() {
    //取消评论
    this.setData({
      comment_input_show: false
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
