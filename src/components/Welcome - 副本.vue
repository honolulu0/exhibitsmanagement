<template>
  <div id="welcome">
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>概况</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="15">
      <!-- 左边部分 -->
      <el-col :span="13">
        <!-- 用户信息表格 -->
        <!--       <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户信息</span>
            <el-button style="float: right;" size="mini" plain loading type="primary">用户中心</el-button>
            <el-button @click="getPage('https://github.com/zykzhangyukang/Xinguan')" type="primary" plain style="float: right;margin-right: 10px;"
              size="mini">获取源码</el-button>
          </div>
          <el-tooltip class="item" effect="dark" content="换头像功能还未实现" placement="top-start">
            <el-avatar shape="square" :size="90" :src="userInfo.avatar" style="float:left;" :key="1"></el-avatar>
          </el-tooltip>
          <div class="right" style="float:right;width:520px;">
            <el-table :data="tableInfo" border height="120">
              <el-table-column prop="username" label="用户账号"></el-table-column>
              <el-table-column prop="nickname" label="用户昵称"></el-table-column>
              <el-table-column prop="department" label="所属部门"></el-table-column>
              <el-table-column fixed="right" prop="roles" label="用户角色" width="150"></el-table-column>
            </el-table>
          </div>
        </el-card> -->
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
        </el-row>
        <el-card class="box-card" style="margin-top:20px;padding:0px;">
          <!-- 用户登入报表 -->
          <div id="loginReport" style="width: 650px;height:270px;"></div>
        </el-card>
      </el-col>
      <!-- 右边部分 -->
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <el-card style="min-height:650px;">
            <el-carousel height="750px" :interval="8000" type="card">
              <el-carousel-item v-for="item in dataimg" :key="item">
                <el-col :md="12" :offset="6">
                  <div>

                    <img style="width: 300px;" fit="contain" :src="item.src">

                  </div>
                </el-col>
              </el-carousel-item>
            </el-carousel>

            <!--           <el-divider>其他项目</el-divider>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button @click="getPage('http://116.85.25.106:8989/system/loginPage.do')">通用管理系统</el-button>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button @click="getPage('http://www.zykcoderman.xyz/')">社区项目</el-button>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button @click="getPage('http://116.85.25.106')">商城项目</el-button>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <el-button @click="getPage('https://github.com/zykzhangyukang')">Githhub</el-button>
                </div>
              </el-col>
            </el-row>
            <el-divider></el-divider> -->

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
        ]
      };
    },
    methods: {
      /**
       * 点击获取源码
       */
      getPage(url) {
        const w = window.open("about:blank");
        w.location.href = url;
      },

      // async loadMusicList() {
      //   const { data: res } = await this.$http.get(
      //     "music/getPlayList?listId=629987891"
      //   );
      //   if(res.code===200) {
      //     this.musicList = res;
      //   }else {
      //
      //   }
      //
      // },
      /**
       * 加载登入报表数据
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
              "area": "量子信息展区"
            }, {
              "count": 30,
              "area": "1F-交叉前沿研究平台"
            }, {
              "count": 7,
              "area": "合肥微尺度物质科学国家研究中心"
            }, {
              "count": 20,
              "area": "环境光学创新研究中心"
            }]
          }
        };
        var $this = this;
        this.xData = [];
        this.yData = [];
        this.myData = [];
        res.data.all.forEach(e1 => {
          $this.xData.push(e1.area);
          $this.yData.push(e1.count);
        });


        this.draw();
      },

      /**
       * 绘制登入报表
       */
      draw() {
        var myChart = echarts.init(document.getElementById("loginReport"));
    var option = {
      title: {
        text: "展区展品数量统计"
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
            type: ["bar", "line"]
          }, ///　　折线  直方图切换
          restore: {}, // 重置
          saveAsImage: {} // 导出图片
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#eee'
          }
        }
      },
      legend: {
        type: 'plain',
        data: ["数量"],
    
      },
      xAxis: {
        data: this.xData,
        name: "区域",
        nameLocation: 'end',
        nameTextStyle: {
          color: 'red',
        },
        axisTick: {
          alignWithLabel: {
            boundaryGap: true
          },
        },
        axisLabel: {
          color: '#333',
          //  让x轴文字方向为竖向
          interval: 0,
          fontStyle: 'oblique',
          fontSize: 8,
    
          // formatter: function(value) {
          //   return value.split('').join('\n')
          // }
        }
      },
      yAxis: {
        type: "value",
        name: "数量",
        nameLocation: 'end',
        nameTextStyle: {
          color: 'red',
        },
      },
      series: [{
        name: "数量",
        data: this.yData,
        type: "bar",
        showBackground: true,
        avoidLabelOverlap: true,
        animationDuration: 0,
        animationEasing: "cubicInOut",
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(30, 144, 255，0.5)'
        },
      }]
    };
        myChart.setOption(option);
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
      this.draw();
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
