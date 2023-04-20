<template>

  <el-row>
    <el-col :span="8" style="padding-right:10px ">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>时间：<span>{{times}}</span></p>
          <p>地点：<span>杭州</span></p>

        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px; ">
        <el-table
            :data="tableData"
            style="width: 100%">
          <!--          <el-table-column-->
          <!--              prop="name"-->
          <!--              label="课程"-->
          <!--             >-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="todayBuy"-->
          <!--              label="今日购买"-->
          <!--             >-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="monthBuy"-->
          <!--              label="本月购买"-->
          <!--             >-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="totalBuy"-->
          <!--              label="总购买"-->
          <!--             >-->
          <!--          </el-table-column>-->
          <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" :key="key"/>

        </el-table>
      </el-card>
    </el-col>


    <el-col :span="16" style="padding-left:10px ">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="des">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!--折线图-->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>

      <div class="graph">
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <div ref="echarts3" style="height: 230px"></div>
        </el-card>
      </div>

    </el-col>

  </el-row>
</template>

<script>
import {getData} from "@/api";
import * as echarts from 'echarts'

export default {
  data() {
    return {
      times:new Date().toLocaleString(),//格式化之后的当前时间
      tableData: [

      ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },

      ],
    }


  },
  mounted() {
    getData().then(({data}) => {
      const {tableData} = data.data
      this.tableData = tableData


      //基于准备好的demo，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      // 指定图表的配置项和数据
      var echarts10ption = {}
      //处理xAxis
      const {orderData, userData,videoData} = data.data
      const xAxis = Object.keys(orderData.data[0])
      //设置x轴
      echarts10ption.xAxis = {data : orderData.date}
      //设置x轴
      echarts10ption.yAxis = {}
      //设置图例
      echarts10ption.legend = {data: xAxis}
      //设置展示数据
      echarts10ption.series = []
      xAxis.forEach(key => {
        echarts10ption.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      //使用刚指定的配置和数据显示图案
      echarts1.setOption(echarts10ption)


      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts20ption = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'

          }
        ],
      }
      echarts2.setOption(echarts20ption)


      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts30ption = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data:videoData,
type:'pie'
          },
        ],
      }
      echarts3.setOption(echarts30ption)
    })
  },
  created() {
    this.getTimes()
  },
  beforeDestroy() {
    if (this.times) {
      clearInterval(this.getTimesInterval);
    }
  },
  methods: {
    getTimes(){
      setInterval(this.getTimesInterval, 1000);
    },
    getTimesInterval:function() {
      let _this = this;
      let year = new Date().getFullYear(); //获取当前时间的年份
      let month = new Date().getMonth() + 1; //获取当前时间的月份
      let day = new Date().getDate(); //获取当前时间的天数
      let hours = new Date().getHours(); //获取当前时间的小时
      let minutes = new Date().getMinutes(); //获取当前时间的分数
      let seconds = new Date().getSeconds(); //获取当前时间的秒数
      //当小于 10 的是时候，在前面加 0
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      //拼接格式化当前时间
      _this.times = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
  }

}
</script>

<style lang="less" scoped>

.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #999;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {

    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #ffffff;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .des {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;

  }
}

.graph {
  margin-top: 20px;
  height: 260px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>