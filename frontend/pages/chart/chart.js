// import * as echarts from '../../ec-canvas/echarts';
// import api from '../../api/api'
// var barec1 = null
// var barec2 = null
// const app = getApp();
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     green_point_list: [],
//     ec1: {
//       onInit: function (canvas, width, height) {
//         barec1 = echarts.init(canvas, null, {
//           width: width,
//           height: height
//         });
//         canvas.setChart(barec1);
//         return barec1;
//       }
//     },
//     ec2: {
//       onInit: function (canvas, width, height) {
//         barec2 = echarts.init(canvas, null, {
//           width: width,
//           height: height
//         });
//         canvas.setChart(barec2);
//         return barec2;
//       }
//     },
//   },

//   onLoad: function (options) {
//     api.post('/ddlproductorder/greenpoint').then(res => {
//       this.setData({
//         green_point_list: res.green_point_list
//       })
//       console.log("this.data.green_point_list", this.data.green_point_list)
//     })
//   },
//   onReady() {
//     setTimeout(this.getData, 500);
//   },

//   getData() {
//     barec1.setOption({
//       title: { //标题
//         text: '操作数量',
//         left: '7',
//         top: 12,
//         textStyle: {
//           color: '#414F6E',
//           fontWeight: 'bold',
//         },
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       renderAsImage: true, //支持渲染为图片模式
//       color: ["#41A4FF", "#37C461"], //图例图标颜色
//       legend: {
//         show: true,
//         itemGap: 25, //每个图例间的间隔
//         top: 40,
//         x: 30, //水平安放位置,离容器左侧的距离  'left'
//         z: 100,
//         textStyle: {
//           color: '#383838'
//         },
//       },
//       grid: { //网格
//         left: 10,
//         top: 80,
//         containLabel: true, //grid 区域是否包含坐标轴的刻度标签
//       },
//       xAxis: { //横坐标
//         type: 'category',
//         name: '(天)', //横坐标名称
//         nameTextStyle: { //在name值存在下，设置name的样式
//           color: '#FFBE46',
//           fontStyle: 'normal',
//           fontWeight: 'bold',
//         },
//         nameLocation: 'end',
//         boundaryGap: false, //1.true 数据点在2个刻度直接  2.fals 数据点在分割线上，即刻度值上
//         data: ['1', '2', '3', '4', '5', '6', '7'],
//         axisTick: {
//           show: false, //刻度线隐藏
//         },
//         axisLabel: {
//           textStyle: {
//             fontSize: 13,
//             color: '#5D5D5D'
//           }
//         }
//       },
//       yAxis: { //纵坐标
//         type: 'value',
//         position: 'left',
//         left: 10,
//         name: '单位(个)', //纵坐标名称
//         nameTextStyle: { //在name值存在下，设置name的样式
//           color: '#FFBE46',
//           fontStyle: 'normal',
//           fontWeight: 'bold',
//         },
//         axisTick: {
//           show: false, //刻度线隐藏
//         },
//         splitNumber: 6, //坐标轴的分割段数
//         splitLine: { //坐标轴在 grid 区域中的分隔线。
//           show: true,
//           lineStyle: {
//             type: 'dashed'
//           }
//         },
//         axisLabel: { //坐标轴刻度标签
//           formatter: function (value) {
//             var xLable = [];
//             if (value == 0) {
//               xLable.push('0');
//             }
//             if (value == 5) {
//               xLable.push('5');
//             }
//             if (value == 10) {
//               xLable.push('10');
//             }
//             if (value == 15) {
//               xLable.push('15');
//             }
//             if (value == 20) {
//               xLable.push('20');
//             }
//             if (value == 25) {
//               xLable.push('25');
//             }
//             if (value == 30) {
//               xLable.push('30');
//             }
//             return xLable
//           },
//         },
//         min: 0,
//         max: 30,
//       },
//       series: [{
//         type: 'line',
//         data: [5, 10, 15, 20, 25, 10, 5],
//         symbol: 'roundRect',
//         itemStyle: {
//           normal: {
//             lineStyle: {
//               color: '#92CBFF'
//             }
//           }
//         }
//       }],

//     })


//     barec2.setOption({
//       title: { //标题
//         text: '工作时间',
//         left: '7',
//         top: 12,
//         textStyle: {
//           color: '#414F6E',
//           fontWeight: 'bold',
//         },
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       renderAsImage: true, //支持渲染为图片模式
//       color: ["#37C461"], //图例图标颜色
//       legend: {
//         show: true,
//         itemGap: 25, //每个图例间的间隔
//         top: 40,
//         x: 20, //水平安放位置,离容器左侧的距离  'left'
//         z: 100,
//         textStyle: {
//           color: '#37C461'
//         },
//       },
//       grid: { //网格
//         left: 10,
//         top: 80,
//         containLabel: true, //grid 区域是否包含坐标轴的刻度标签
//       },
//       xAxis: { //横坐标
//         type: 'category',
//         name: '(小时)', //横坐标名称
//         nameTextStyle: { //在name值存在下，设置name的样式
//           color: '#FFBE46',
//           fontStyle: 'normal',
//           fontWeight: 'bold',
//         },
//         nameGap: 3,
//         nameLocation: 'end', //显示位置
//         boundaryGap: false, //1.true 数据点在2个刻度直接  2.fals 数据点在分割线上，即刻度值上
//         data: ['1', '2', '3', '4', '5', '6', '7'],
//         axisTick: {
//           show: false, //刻度线隐藏
//         },
//         axisLabel: {
//           textStyle: {
//             fontSize: 13,
//             color: '#5D5D5D'
//           }
//         }
//       },
//       yAxis: { //纵坐标
//         type: 'value',
//         position: 'left',
//         left: 10,
//         name: '单位(个)', //纵坐标名称
//         nameTextStyle: { //在name值存在下，设置name的样式
//           color: '#FFBE46',
//           fontStyle: 'normal',
//           fontWeight: 'bold',
//         },
//         axisTick: {
//           show: false, //刻度线隐藏
//         },
//         splitNumber: 6, //坐标轴的分割段数
//         splitLine: { //坐标轴在 grid 区域中的分隔线。
//           show: true,
//           lineStyle: {
//             type: 'dashed'
//           }
//         },
//         axisLabel: { //坐标轴刻度标签
//           formatter: function (value) {
//             var xLable = [];
//             if (value == 0) {
//               xLable.push('0');
//             }
//             if (value == 5) {
//               xLable.push('5');
//             }
//             if (value == 10) {
//               xLable.push('10');
//             }
//             if (value == 15) {
//               xLable.push('15');
//             }
//             if (value == 20) {
//               xLable.push('20');
//             }
//             if (value == 25) {
//               xLable.push('25');
//             }
//             if (value == 30) {
//               xLable.push('30');
//             }
//             return xLable
//           },
//         },
//         min: 0,
//         max: 30,
//       },
//       series: [{
//         type: 'line',
//         data: [5, 10, 15, 20, 25, 10, 5],
//         symbol: 'roundRect',
//         itemStyle: {
//           normal: {
//             lineStyle: {
//               color: '#BAEAC8'
//             }
//           }
//         }
//       }],

//     })
//   },


//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({
  data:{
    ec:{
      onInit:initChart
    }
  },
})