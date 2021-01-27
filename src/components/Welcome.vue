<template>
  <div id="welcome">
  
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>概况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="15">
      <!-- 左边部分 -->
      <el-col :span="13">
        <!-- 功能列表 -->
        <el-row :gutter="10">
          <el-card>
            <div v-show="areaRep!==3">
              <!-- 库存饼图 -->
              <div id="bingtu" style="width: 50%;height:225px;display: inline-block;"></div>
              <div id="bingtu2" style="width: 50%;height:225px;display: inline-block;"></div>
            </div>
            <div :style="areaRep===3?'':'height:0px;top:100px;position: relative;'">
              <!-- 库存饼图 :style= "this.areaRep===3?'':'visibility:hidden'-->
              <div id="bingtu3" style="height:225px;"></div>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:20px;padding:0px;width: auto;">
            <!-- 用户登入报表 -->
            <div id="loginReport" style="height:467px; "></div>
          </el-card>
        </el-row>

      </el-col>
      <!-- 右边部分 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card style="min-height:650px;">
            <el-carousel height="730px" :interval="8000" type="card" @change='changeCard'>
              <el-carousel-item v-for="item in dataimg" :key='item.txt'>
                <el-col :md="22" :offset="1">
                  <el-image fit="fill" :src="item.src"></el-image>
                </el-col>
              </el-carousel-item>
            </el-carousel>
          </el-card>
          <!-- <el-calendar :v-model="new Date()"></el-calendar> -->
        </div>
      </el-col>
    </el-row>

    <!-- <el-card class="box-card">
           <el-calendar v-model="value"></el-calendar>
    </el-card>-->
  </div>
</template>
<script>
  // import echarts from "echarts";
  import echarts from "../../public/js/echarts.min.js"
  export default {
    data() {
      return {
        userName: "",
        value: new Date(),
        dataimg: [{
            src: require('../assets/image/1f.jpg'),
            txt: "1F"
          },
          {
            src: require('../assets/image/2f.jpg'),
            txt: "2F"
          },
          {
            src: require('../assets/image/3f.jpg'),
            txt: "3F"
          }
        ],
        areaRep: 1,
        numTiao: {
          xData: [],
          yData: [],
          myData: [],
        },
        num: {
          legendData: [],
          selected: {},
          seriesData: [{}],
        },
        status: {
          legendData: [],
          selected: {},
          seriesData: [{}],
        },
        type: {
          legendData: [],
          selected: {},
          seriesData: [{}],
        },
        a: {}, //临时变量用来替换上面的变量
        total: 0,
        myChart: []
      };
    },
    methods: {
      changeCard(val) {
        // ////console.log(val)
        this.areaRep = val + 1;
        if (this.areaRep === 1) {
          this.getTiaoData("statistics1", 0, 32)
        } else if (this.areaRep === 2) {
          this.getTiaoData("statistics1", 31, 60)
        } else if (this.areaRep === 3) {
          this.getTiaoData("statistics1", 59, 70)
          // this.getTiaoData("statistics1", 69, 72) //仓库
        }
        // this.draw("loginReport", this.configtiao());
      },

      /**
       * 获取线上数据
       */
      async getTiaoData(field, a, b) {
        const {
          data: res
        } = await this.$http.post("/api/user/statistics1", {
          'a': a,
          'b': b
        });

        if (res.code !== "2") {
          return this.$message.error("获取" + field + "数据失败:" + res.msg);
        } else {
          var $this = this;
          //构建条形的数据对象

          var $this = this;
          this.numTiao.xData = [];
          this.numTiao.yData = [];
          this.numTiao.myData = [];
          res.data.forEach(e1 => {
            $this.numTiao.xData.push(e1.name);
            $this.numTiao.yData.push(e1.stock);
          });

          if (this.myChart[0] != null && this.myChart[0] != "" && this.myChart[0] != undefined) {
            this.myChart[0].dispose(); //销毁
          }

          this.myChart[0] = echarts.init(document.getElementById("loginReport"));
          this.draw("loginReport", this.configtiao(), this.myChart[0]);

        }
      },

      async getData(field) {

        const {
          data: res
        } = await this.$http.post("/api/user/statistics", {
          field: field
        });

        if (res.code !== "2") {
          return this.$message.error("获取" + field + "数据失败:" + res.msg);
        } else {
          var $this = this;

          //构建饼图的数据对象
          this.a.legendData = [];
          this.a.selected = {};
          this.a.seriesData = [{}];
          res.data.forEach(function(e) {
            $this.a.legendData.push(e.name);
            $this.a.seriesData.push({
              name: e.name,
              value: e.stock
            });
          });
          ////console.log("field  " + field)
          if (field === "state") {
            this.state = this.a

            if (this.myChart[1] != null && this.myChart[1] != "" && this.myChart[1] != undefined) {
              this.myChart[1].dispose(); //销毁
            }

            this.myChart[1] = echarts.init(document.getElementById("bingtu"));
            this.draw("bingtu", this.configbing("展品状态占比", this.total, this.state), this.myChart[1]);
          } else if (field === "area") {
            this.num = this.a
            if (this.myChart[2] != null && this.myChart[2] != "" && this.myChart[2] != undefined) {
              this.myChart[2].dispose(); //销毁
            }

            this.myChart[2] = echarts.init(document.getElementById("bingtu2"));
            this.draw("bingtu2", this.configbing("展品分布占比", this.total, this.num), this.myChart[2]);
          } else if (field === "type") {
            this.type = this.a

            if (this.myChart[3] != null && this.myChart[3] != "" && this.myChart[3] != undefined) {
              this.myChart[3].dispose(); //销毁
            }

            this.myChart[3] = echarts.init(document.getElementById("bingtu3"));

            this.draw("bingtu3", this.configbing2("展品类型占比", this.total, this.type), this.myChart[3]);
          }
        }
      },
      /**
       * 加载 报表数据
       */
      drowbingExhibitsStatus() {
        this.getData("state")
      },
      drowbingExhibitsNum() {
        this.getData("area")
      },
      drowbingExhibitsType() {
        this.getData("type")
      },
      drowtiaoExhibitsTotal() {
        this.getTiaoData("statistics1", 0, 32)

      },
      async getTotal() {
        var field = "id"
        const {
          data: res
        } = await this.$http.post("/api/user/total", {
          field: field
        });

        if (res.code !== "2") {
          return this.$message.error("获取total数据失败:" + res.msg);
        } else {
          this.total = res.data[0].total
        }
      },

      configtiao() {
        var that = this;
        var option = {
          title: {
            text: that.areaRep + "F 展区展品数量统计"
          },

          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              dataView: {
                readOnly: false
              }, //  缩放
              magicType: {
                type: ["bar"]
              }, ///　　折线  直方图切换
              restore: {}, // 重置
              saveAsImage: {} // 导出图片
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
            // formatter: function(params) {
            //   return that.xData[params.dataIndex] + ":" + that.yData[params.dataIndex];
            // },
          },
          grid: {
            bottom: '18%',

            height: '60%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name: "件数",
            show: true,
            nameLocation: 'end',
            nameTextStyle: {
              color: 'red',
            }
          },
          yAxis: {
            type: 'category',
            name: "展区",
            data: this.numTiao.xData,
            nameLocation: 'end',
            nameTextStyle: {
              color: 'red',
            }
          },
          series: [{
              name: '件数',
              type: 'bar',
              data: this.numTiao.yData,
              showBackground: true,
              itemStyle: {
                normal: {
                  //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                  color: function(params) {
                    // build a color map as your need.
                    var colorList = [
                      '#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
                      '#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee',
                      '#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
                      '#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee',
                      '#0780cf ', '#fa6d1d ', '#ac2026 ', '#701866 ', '#d22e8d ',
                      '#FE8463', '#a195c5 ', '#FAD860', '#F3A43B', '#60C0DD',
                      '#D7504B', '#a195c5  ', '#F4E001', '#F0805A', '#63b2ee'

                    ];
                    return colorList[params.dataIndex]
                  },
                  //以下为是否显示，显示位置和显示格式的设置了
                  label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    color: "#000000",
                    fontStyle: 'italic'
                  }
                }
              },
            },

          ]
        };
        return option;
      },
      configbing(title, subtext, data1) {
        // 指定图表的配置项和数据
        ////console.log(data1)
        var option = {
          title: {
            text: title,
            subtext: '总数：' + subtext + ' 件',
            left: "left"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {} // 导出图片
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 2,
            bottom: 2,
            data: data1.legendData,
            selected: data1.selected
          },
          series: [{
            name: "物资名称",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            data: data1.seriesData,
            left: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              show: true,
              formatter: '{b}:{c}',
              color: "#000000",
              fontStyle: 'italic'
            }
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        return option;
      },
      configbing2(title, subtext, data1) { // 指定图表的配置项和数据
        var option = {
          title: {
            text: title,
            subtext: '总数：' + subtext + ' 件',
            left: "right"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {} // 导出图片
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 2,
            bottom: 0,
            // bottom: 10,
            // left: 'center',
            data: data1.legendData,
            selected: data1.selected
          },
          series: [{
            name: "物资名称",
            type: "pie",
            radius: "55%",
            center: ["60%", "40%"],
            clockwise: false,
            startAngle: 0,
            data: data1.seriesData,
            left: 10,
            top: 10,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              show: true,
              formatter: '{b}:{c}',
              color: "#000000",
              fontStyle: 'italic'
            }
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        return option;
      },
      /**
       * 绘制报表
       */
      draw(elem, config, myChart) {
        myChart.setOption(config);
      }
    },
    created() {
       
      this.getTotal()

    },
    mounted(){
      this.drowbingExhibitsStatus();
      this.drowbingExhibitsNum();
      this.drowbingExhibitsType();
      this.drowtiaoExhibitsTotal();
    }
  };
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    /* background-color: #99a9bf; */

    background-size: 100% 100%;
  }

  .el-carousel__iteel-carousel__item:nth-child(2n + 1) {
    /* background-color: #99a9bf; */

    background-size: 100% 100%;
  }
</style>
