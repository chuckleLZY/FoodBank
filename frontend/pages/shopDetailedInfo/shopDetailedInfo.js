import api from '../../api/api'

Page({
  data: {
    shop_id: '',
    shop_detail: '',
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
    api.get(`${"/shopinfo/getdetailed?shopId="}${shop_id}`).then(res => {
      console.log(res)
      this.setData({
        shop_detail: res
      })
    }).catch(err => {
      console.log(err)
    })
  }
})
