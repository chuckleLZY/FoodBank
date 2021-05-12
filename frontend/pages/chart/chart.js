import * as echarts from '../../ec-canvas/echarts';
import api from '../../api/api'
let Chart = null

Page({
  data: {
    xData: [],
    yData: [],
    totalPoint: 0,
    ecTest: {
      lazyLoad: true
    },
  },
  onLoad: function (options) {
    api.post('/ddlproductorder/greenpoint', {}).then(res => {
      console.log(res)
      var temp_xData = []
      var temp_yData = [];
      for (var i in res.green_point_list) {
        var date = new Date(res.green_point_list[i].date)
        console.log((date.getMonth() + 1) + '/' + date.getDate())
        temp_xData.push((date.getMonth() + 1) + '/' + date.getDate())
        temp_yData.push(res.green_point_list[i].point)
      }
      this.setData({
        xData: temp_xData,
        yData: temp_yData,
        totalPoint: res.total_point
      })
      console.log(this.data.xData, this.data.yData, this.data.totalPoint)
      this.echartsComponnet = this.selectComponent('#mychart-test1')
      this.echartsComponnet.init((canvas, width, height) => {
        // 初始化图表
        Chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        let option = {
          //定义图标的标题和颜色
          title: {
            text: "总成就 ： " + this.data.totalPoint,
            left: 'center'
          },
          // color: ["#37A2DA"],
          //定义你图标的线的类型种类
          // legend: {
          //   data: ['A'],
          //   top: 50,
          //   left: 'center',
          //   backgroundColor: 'red',
          //   z: 100
          // },
          grid: {
            containLabel: true
          },
          //当你选中数据时的提示框
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          //	x轴
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.data.xData, //x轴数据
            // x轴的字体样式
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000',
                fontSize: '14',
              }
            },
            // 控制网格线是否显示
            splitLine: {
              show: true,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#aaaaaa']
              }
            },
            // x轴的颜色和宽度
            axisLine: {
              lineStyle: {
                color: '#000',
                width: 1, //这里是坐标轴的宽度,可以去掉
              }
            }
            // show: false //是否显示坐标
          },
          yAxis: {
            x: 'center',
            type: 'value',
            //网格线
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            // show: false
          },
          series: [{
            type: 'line',
            // smooth: true,
            data: this.data.yData //y轴数据
          }]
        }
        Chart.setOption(option);
      });
    })

  },
})