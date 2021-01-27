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
        <el-row style="margin-top:10px;" :gutter="10">
          <el-card style="height:125px;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <router-link to="/products">
                  <img src="../assets/image/1.svg" alt width="60.8px;" style="margin:0px auto; cursor: pointer;margin-left:20px;" />
                </router-link>
                <div style="font-size:12px;margin-top:5px;margin-left:25px;">所有展品</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <router-link to="/inStocks">
                  <img src="../assets/image/3.svg" alt width="60.8px;" style="cursor: pointer;margin-left:20px;" />
                </router-link>
                <div style="font-size:12px;margin-top:5px;margin-left:25px;">展品入库</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <router-link to="/stocks">
                  <img src="../assets/image/2.svg" alt width="60.8px;" style="cursor: pointer;margin-left:20px;" />
                </router-link>
                <div style="font-size:12px;margin-top:5px;margin-left:25px;">展品出库</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"></div>
              <router-link to="/outStocks">
                <img src="../assets/image/4.svg" alt width="60.8px;" style="cursor: pointer;margin-left:20px;" />
              </router-link>
              <div style="font-size:12px;margin-top:5px;margin-left:25px;">展品位置</div>
            </el-col>
          </el-card>
          <el-card class="box-card" style="margin-top:20px;padding:0px;width: auto;">
            <!-- 用户登入报表 -->
            <div id="loginReport" style="height:600px; "></div>
          </el-card>
        </el-row>

      </el-col>
      <!-- 右边部分 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card style="min-height:650px;">
            <el-carousel height="730px" :interval="8000" type="card" @change='changeCard'>
              <el-carousel-item v-for="item in dataimg" :key="itemKey">
                 <el-col   :md="22" :offset="1"  >
                    <el-image  fit="fill"   :src="item.src" ></el-image>
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
  import echarts from "echarts";

  export default {


    data() {
      return {
        xData: [],
        yData: [],
        myData: [],
        value: new Date(),
        userInfo: {},
        tableInfo: [],
        dataimg: [{
            src: require('../assets/image/1f.jpg'),
            txt: ""
          },
          {
            src: require('../assets/image/2f.jpg'),
            txt: ""
          },
          {
            src: require('../assets/image/3f.jpg'),
            txt: ""
          }
        ],
        areaRep: 1,


      };
    },
    methods: {
      changeCard(val) {
        //console.log(val)
        this.areaRep = val+1;
        this.draw();
      },
      /**
       * 加载 报表数据
       */
      async loginReport(username) {
        // const { data: res } = await this.$http.post("loginLog/loginReport", {
        //   username: username
        // });
        // if (res.code !== 200) {
        //   return this.$message.error("获取登入报表数据失败:" + res.msg);
        // } else {
        //   var $this = this;
        //   this.xData = [];
        //   this.yData = [];
        //   this.myData = [];
        //   res.data.all.forEach(e1 => {
        //     $this.xData.push(e1.area);
        //     $this.yData.push(e1.count);
        //   });


        var res = {
          "code": 200,
          "msg": "成功",
          "data": {
            "all": [{
                "count": 23,
                "area": "量子信息展区",
                "areaRep": "A"
              }, {
                "count": 30,
                "area": "1F-交叉前沿研究平台",
                "areaRep": "B"
              }, {
                "count": 7,
                "area": "合肥微 中心",
                "areaRep": "C"
              }, {
                "count": 20,
                "area": "环境光学创新研究中心",
                "areaRep": "D"
              }, {
                "count": 23,
                "area": "量子信息展区",
                "areaRep": "A"
              }, {
                "count": 30,
                "area": "1F-交叉前沿研究平台",
                "areaRep": "B"
              }, {
                "count": 7,
                "area": "合肥微中心",
                "areaRep": "C"
              }, {
                "count": 7,
                "area": "合肥微 中心",
                "areaRep": "C"
              }, {
                "count": 20,
                "area": "环境光学创新研究中心",
                "areaRep": "D"
              }, {
                "count": 23,
                "area": "量子信息展区",
                "areaRep": "A"
              }, {
                "count": 30,
                "area": "1F-交叉前沿研究平台",
                "areaRep": "B"
              }, {
                "count": 7,
                "area": "合肥微中心",
                "areaRep": "C"
              }
            ]
          }
        };
        var $this = this;
        this.xData = [];
        this.yData = [];
        this.myData = [];
        res.data.all.forEach(e1 => {
          $this.xData.push(e1.area);
          $this.yData.push(e1.count);
          $this.myData.push(e1.areaRep);
        });
        this.draw();
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
            data: this.xData,
            nameLocation: 'end',
            nameTextStyle: {
              color: 'red',
            }
          },
          series: [{
              name: '件数',
              type: 'bar',
              data: this.yData,
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
      configbing() {
        // 指定图表的配置项和数据
        var option = {
          series: {
            type: 'sunburst',
            data: [{
              name: '1F',
              value: 10,
              children: [{
                value: 3,
                name: 'Aa'
              }, {
                value: 7,
                name: 'Ab'
              }]
            }, {
              name: '2F',
              value: 10,
              children: [{
                name: 'Ba',
                value: 5
              }, {
                name: 'Bb',
                value: 5
              }]
            }, {
              name: '3F',
              value: 10,
              children: [{
                name: 'Ba',
                value: 8
              }, {
                name: 'Bb',
                value: 2
              }]
            }]
          }
        };
        // 使用刚指定的配置项和数据显示图表。
        return option;
      },
      /**
       * 绘制报表
       */
      draw() {
        var myChart = echarts.init(document.getElementById("loginReport"));
        myChart.setOption(this.configtiao());
      }
    },

    created() {
      //console.log("created")

      this.userInfo = {
        "username": "admin",
        "nickname": "mam~~",
        "avatar": "https://avatars3.githubusercontent.com/u/47490129?v=4",
        "url": ["/swagger", "/roles", "/outStocks", "/icons", "/users", "/inStocks", "/departments", "/welcome",
          "/menus", "/suppliers", "/productCategorys", "/loginLog", "/inStocks/addStocks", "/consumers",
          "/notices", "/products", "/qq", "/attachments", "/OutStocks/publishStocks", "/health", "/stocks",
          "/logs", "/druid", "/map"
        ],
        "perms": ["productCategory:add", "department:edit", "product:update", "inStock:detail", "inStock:back",
          "consumer:add", "department:update", "logLog:view", "supplier:edit", "consumer:edit", "consumer:update",
          "productCategory:edit", "outStock:publish", "product:add", "product:edit", "loginLog:delete",
          "inStock:in", "log:view", "product:publish", "menu:edit", "inStock:publish", "image:delete",
          "department:add", "outStock:back", "product:remove", "outStock:remove", "productCategory:update",
          "log:delete", "menu:add", "inStock:remove", "log:batchDelete", "outStock:out", "supplier:update",
          "health:report", "product:back", "user:edit", "upload:image", "role:edit", "outStock:detail",
          "supplier:add"
        ],
        "roles": ["测试角色"],
        "department": "人事部",
        "isAdmin": false
      }
      //this.$store.state.userInfo;
      var roles = this.userInfo.isAdmin ? "超级管理员" : this.userInfo.roles;
      //console.log(roles)
      this.tableInfo.push({
        username: this.userInfo.username,
        nickname: this.userInfo.nickname,
        department: this.userInfo.department,
        roles: roles
      });
      // this.loadMusicList();
    },
    mounted: function() {
      this.loginReport(this.userInfo.username);

    },

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
