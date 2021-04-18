// pages/favorite.js

const {
    $Message
} = require('../../dist/base/index');

import api from '../../api/api'


Page({
    data: {
        all_collect: [], // 所有收藏
        clothing_collect: [], // 衣
        food_collect: [], // 食
        housing_collect: [], // 住
        transportation_collect: [], // 行
        show_on_the_screen_collect: [], // 现实在屏幕上的收藏
        current: 'tab1',
        current_scroll: 'tab1',
        visible2: false,
        //小程序没有refs，所以只能用动态布尔值控制关闭
        toggle: false,
        toggle2: false,
        actions2: [{
            name: '删除',
            color: '#ed3f14'
        }],
        actions: [{
                name: '喜欢',
                color: '#fff',
                fontsize: '20',
                width: 100,
                icon: 'like',
                background: '#ed3f14'
            },
            {
                name: '返回',
                width: 100,
                color: '#80848f',
                fontsize: '20',
                icon: 'undo'
            }
        ]
    },

    handleChange({
        detail
    }) {
        this.setData({
            current: detail.key
        });
        if (this.data.current == "all") {
            this.setData({
                show_on_the_screen_collect: this.data.all_collect
            });
        } else if (this.data.current == "clothing") {
            this.setData({
                show_on_the_screen_collect: this.data.clothing_collect
            });
        } else if (this.data.current == "food") {
            this.setData({
                show_on_the_screen_collect: this.data.food_collect
            });
        } else if (this.data.current == "housing") {
            this.setData({
                show_on_the_screen_collect: this.data.housing_collect
            });
        } else if (this.data.current == "transportation") {
            this.setData({
                show_on_the_screen_collect: this.data.transportation_collect
            });
        }
        console.log('handleChange', this.data.current)
    },

    handleChangeScroll({
        detail
    }) {
        this.setData({
            current_scroll: detail.key
        });
        console.log('handleChangeScroll')
    },
    handleCancel2() {
        this.setData({
            visible2: false,
            toggle: this.data.toggle ? false : true
        });
        console.log(this.data.toggle, 111111111)
    },
    handleClickItem2() {
        const action = [...this.data.actions2];
        action[0].loading = true;

        this.setData({
            actions2: action
        });
        setTimeout(() => {
            action[0].loading = false;
            this.setData({
                visible2: false,
                actions2: action,
                toggle: this.data.toggle ? false : true
            });

        }, 2000);
    },
    handlerCloseButton() {
        this.setData({
            toggle2: this.data.toggle2 ? false : true
        });
    },
    actionsTap() {
        this.setData({
            visible2: true
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        api.post('/collect/get', {
            "page_num": 1,
            "page_size": 10000
        }).then(res => {
            console.log('collectSuccess', res);
            var all_collect = [];
            var clothing_collect = []; // 衣
            var food_collect = []; // 食物
            var housing_collect = []; // 住
            var transportation_collect = []; // 行
            for (var i in res.shop_briefinfo_items) {
                all_collect.push(res.shop_briefinfo_items[i])
                if (res.shop_briefinfo_items[i].shop_type == "clothing") {
                    clothing_collect.push(res.shop_briefinfo_items[i])
                } else if (res.shop_briefinfo_items[i].shop_type == "food") {
                    food_collect.push(res.shop_briefinfo_items[i])
                } else if (res.shop_briefinfo_items[i].shop_type == "housing") {
                    housing_collect.push(res.shop_briefinfo_items[i])
                } else if (res.shop_briefinfo_items[i].shop_type == "transportation") {
                    transportation_collect.push(res.shop_briefinfo_items[i])
                }
            };
            this.setData({
                all_collect: all_collect,
                clothing_collect: clothing_collect,
                food_collect: food_collect,
                housing_collect: housing_collect,
                transportation_collect: transportation_collect,
                show_on_the_screen_collect: all_collect //刚开始所有都显示
            });
            // console.log("all_collect", this.data.all_collect)
            // console.log("clothing_collect", this.data.clothing_collect)
            // console.log("food_collect", this.data.food_collect)
            // console.log("housing_collect", this.data.housing_collect)
            // console.log("transportation_collect", this.data.transportation_collect)
        }).catch(err => {
            console.log(err);
        })
    },
    to_shop_detail(e){
console.log(e.currentTarget.dataset.shop_id)
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