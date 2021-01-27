<template>
  <div id="productCategroys">
    <!-- 面包导航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展品位置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="15">

      <el-col :span="13">
        <div class="grid-content bg-purple">
          <el-card style="height:782px;">
            <el-carousel arrow="always" height="700px" :autoplay="false" trigger="click" @change='changeCard'>
              <el-carousel-item v-for="item in dataimg" :key='item.txt'>

                <!--    <el-row :gutter="20"> -->
                <el-col :span="10">
                  <el-image fit="fill" :src="item.src"></el-image>

                </el-col>
                <el-col :span="14">
                  <div class="beauty-Scroll">
                    <el-scrollbar>
                      <el-tree default-expand-all :highlight-current='true' :data="areaOption" :props="defaultProps"
                        accordion @node-click="handleNodeClick">
                      </el-tree>
                    </el-scrollbar>
                  </div>
                </el-col>
              </el-carousel-item>
            </el-carousel>
          </el-card>

        </div>
      </el-col>

      <el-col :span="11">
        <!-- 右侧卡片区域 -->
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-input clearable size="mini" v-model="search.provider" placeholder="请输入单位名称查询" class="input-with-select"></el-input>
              <!--        <el-input
            placeholder="请输入单位名称查询"
            v-model="search.provider"
            clearable>
          </el-input> -->
            </el-col>
            <el-col :span="6">
              <el-input clearable size="mini" v-model="search.name" placeholder="请输入展品名称查询" class="input-with-select"></el-input>
            </el-col>
            <el-col :span="3">
              <el-select size="mini" v-model="search.state" placeholder="请选择展品状态" @change='addNewChange'>
                <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" type="primary" icon="el-icon-search" @click="searchArea">查找</el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" icon="el-icon-refresh-right" type="warning" @click="resetForm">重置</el-button>
            </el-col>
            <el-col :span="3">
              <el-button size="mini" icon="el-icon-refresh" @click="getproductList">刷新</el-button>
            </el-col>

          </el-row>
          <!-- 表格区域 -->
          <template>

            <el-table height='650px' :stripe="true" v-loading="loading" border :data="productData" class="show_table"
              style="width: 100%; margin-top:20px;">
              <el-table-column type="expand" label="更多">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="展品编号">
                      <span>{{ props.row.pnum }}</span>
                    </el-form-item>
                    <el-form-item label="展品规格">
                      <span>{{ props.row.specifications }}</span>
                    </el-form-item>
                    <el-form-item label="展品类型">
                      <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="所属市">
                      <span>{{ props.row.city }}</span>
                    </el-form-item>
                    <el-form-item label="联系方式">
                      <span>{{ props.row.contacts }} {{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item label="技术优势">
                      <span>{{ props.row.technicalAdvantages }}</span>
                    </el-form-item>
                    <el-form-item label="获奖情况">
                      <span>{{ props.row.awards }}</span>
                    </el-form-item>
                    <el-form-item label="市场情况">
                      <span>{{ props.row.marketConditions }}</span>
                    </el-form-item>
                    <el-form-item label="入库时间">
                      <span>{{ props.row.createTime }}</span>
                    </el-form-item>
                    <el-form-item label="展览期限">
                      <span>{{ props.row.timeLimit }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                      <span>{{ props.row.state }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remarks }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="id" type="index" label="ID" align="center"></el-table-column>
              <el-table-column prop="name" label="展品名称" align="center"></el-table-column>
              <el-table-column label="所在展区" align="center">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p></p>
                    <p> {{ scope.row.floor }} 楼 {{ scope.row.region }} 区</p>
                    <p>{{ scope.row.nameArea }}<br />{{ scope.row.classAName }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag v-if="scope.row.area" size="medium"> {{ scope.row.floor }}楼 {{ scope.row.region }}区 {{ scope.row.nameArea }}</el-tag>
                      <el-tag v-else size="medium">暂无</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="provider" align="center" label="单位"></el-table-column>
              <el-table-column prop="imageUrl" :label="'展品图片 \n (点击查看)'" align="center" width="100px" padding="0px">
                <template slot-scope="scope">
                  <el-popover disabled trigger="click">
                    <el-image slot="reference" :src="scope.row.imageUrl[0]" :preview-src-list="scope.row.imageUrl"></el-image>
                    <!-- <img slot="reference" :src="scope.row.imageUrl[0]" style="max-width: 80px;cursor: pointer"> -->
                  </el-popover>
                  <span>共 {{scope.row.imageUrl.length}} 张</span>
                </template>
              </el-table-column>
            </el-table>

          </template>
          <!-- 分页 -->
          <el-pagination style="margin-top:10px;" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="this.queryMap.pageNum" :page-sizes="[pageSize]" :page-size="this.queryMap.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>

        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import addProdectsConstant from '../constant/addProdectsConstant.js'

  export default {
    data() {
      return {
        dataimg: [{
            src: require('../../assets/image/1f1.png'),
            txt: "1F"
          },
          {
            src: require('../../assets/image/2f2.png'),
            txt: "2F"
          },
          {
            src: require('../../assets/image/3f3.png'),
            txt: "3F"
          }
        ],
        areaRep: 1,

        imgLocalUrl: 'http://127.0.0.1:3000/img/',
        statusIndex: 0,
        cityList: addProdectsConstant.cityList,
        typeList: addProdectsConstant.typeList,
        timeLimitList: addProdectsConstant.timeLimitList,
        areaOptions: addProdectsConstant.areaOptions,
        stateList: addProdectsConstant.stateList,
        areaOption: JSON.parse(JSON.stringify(addProdectsConstant.areaOptions[0].children)),
        localUrl: '',
        uploadApi: 'http://localhost/api/user/file_upload',
        btnLoading: false,
        btnDisabled: false,
        loading: true,
        headerObject: {
          token: window.localStorage.getItem("Authorization-token")
        }, //图片上传请求头
        catetorys: [], //类别选择
        fileList: [],
        editDialogVisible: false,
        addDialogVisible: false, //添加弹框是否显示
        total: 0, //总共多少条数据
        productData: [], //表格数据
        queryMap: {
          pageNum: 1,
          pageSize: 10
        }, //翻页对象
        pageSize: 10,
        search: {}, //查询对象
        addRuleForm: {

        }, //添加表单数据  area:[ "2F", "14" ],
        editRuleForm: {}, //修改表单数据
        uploadDisabled: false,
        limitcount: 100,
        dialogImageUrl: "",
        dialogVisible: false,
        imgFilesList: [],
        currentId: 0,
        currentName: '选中列表编辑展品',
        defaultProps: {
          children: 'children',
          label: 'label'
        }


      };
    },
    methods: {
      handleNodeClick(data) {
        if (data.children === undefined) {
          // console.log(data.value);
          this.search.areaId = data.value;
          this.searchArea()
        }

      },
      changeCard(val) {
        // this.areaOption.length=0//清空数组
        this.areaOption = JSON.parse(JSON.stringify(this.areaOptions[val].children))
        if (val === 2) {
          this.areaOption.push(JSON.parse(JSON.stringify(this.areaOptions[3].children[0])))
        }

        this.areaRep = val + 1;
        // this.draw("loginReport", this.configtiao());
      },
      addNewChange(val) {
        if (val === 'state') {
          this.otherContent(this.stateList)
        } else if (val === 'timeLimit') {
          this.otherContent(this.timeLimitList)
        } else if (val === 'type') {
          this.otherContent(this.typeList)
        }
      },
      otherContent(list) {
        this.$prompt('请输入新内容', '新内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputErrorMessage: '新内容格式不正确'
        }).then(({
          value
        }) => {
          this.$message({
            type: 'success',
            message: '新内容设置完毕,请下拉选择'
          });
          list.push({
            'value': value,
            'label': value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });

      },

      //重置查询表单
      resetForm() {
        this.search = {}
        // this.pageSize = 10
      },

      /**
       * 搜索展品
       */
      searchArea() {
        if (this.search.name === undefined && this.search.provider === undefined && this.search.areaId === undefined) {
          this.$message.error("请输入查询条件");
          return
        }
        this.loading = true;
        this.productData = []
        var that = this;
        this.$http.post('/api/user/searchByKeyProdect',
          that.search, {}).then((res) => {

          if (res.status == 200) {
            that.$message.success("查询到 " + res.body.total + " 个数据");
            that.total = res.body.total;
            that.pageSize = that.total
            that.productData = res.body.data;

            for (var i = 0; i < this.productData.length; i++) {
              var Things = this.productData[i].imageUrl.split(",")
              for (var j = 0; j < Things.length; j++) {
                Things[j] = this.imgLocalUrl + Things[j]
              }
              this.productData[i].imageUrl = Things
            }

          } else {
            return that.$message.error("查询失败:" + res.msg);
          }
          that.loading = false;
        })

      },
      /**
       * 加载展品列表
       */
      getproductList() {

        var that = this;
        that.pageSize = 10
        that.loading = true;
        this.$http.post('/api/user/searchAllProdect', {
          num: this.queryMap.pageNum
        }, {}).then((res) => {
          if (res.status != 200) {
            return this.$message.error("获取展品列表失败");
          } else {
            this.total = res.body.total;
            this.productData = res.body.data;
            for (var i = 0; i < this.productData.length; i++) {
              var Things = this.productData[i].imageUrl.split(",")
              for (var j = 0; j < Things.length; j++) {
                Things[j] = this.imgLocalUrl + Things[j]
              }
              this.productData[i].imageUrl = Things
            }
            this.$message.success("获取展品列表完成共 " + this.total + "条");
          }
          that.loading = false;

        })
      },

      handleChange(file, fileList) {
        // //console.log(file, fileList);
      },
      handleRemove(file, fileList) {
        //console.log(file)
        this.uploadDisabled = fileList.length >= this.limitcount;
        if (this.addRuleForm.imageUrl === undefined) {
          this.addRuleForm.imageUrl = [];
        } else {
          //console.log(file.url)
          var i = this.addRuleForm.imageUrl.indexOf(file.url)
          if (i > -1) {
            this.addRuleForm.imageUrl.splice(i, 1);
          }
        }
      },
      //改变页码
      handleSizeChange(newSize) {
        this.queryMap.pageSize = newSize;
        this.getproductList();
      },
      //翻页
      handleCurrentChange(current) {
        this.queryMap.pageNum = current;
        this.getproductList();
      },
      //关闭弹出框
      closeAddDialog() {
        this.$refs.addRuleFormRef.clearValidate();
        this.addRuleForm = {};
        this.currentId = 0
        this.currentName = '选中列表编辑展品'
      },

      handleSuccess(response, file, fileList) {

        if (this.addRuleForm.imageUrl === undefined) {
          this.addRuleForm.imageUrl = [];
        }
        this.addRuleForm.imageUrl.push(response.data);
        //console.log(fileList)

      },
      handError(err, file, fileList) {
        this.$message.error("文件上传失败" + err)

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;

        this.dialogVisible = true;
      },
      //编辑
      editHandleSuccess(response, file, fileList) {
        this.editRuleForm.imageUrl = response.data;
      },
    },
    mounted() {
      this.getproductList();
    },
  };
</script>
<style lang="css">
  .el-table .cell {
    white-space: pre-line;
  }

  /* 设置 更多 显示样式 */
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .el-icon-circle-close {
    color: white;
  }


  .beauty-Scroll .el-scrollbar {
    height: 700px;
    /*此处一定要设置高度，不然内层的计算属性不生效*/
  }

  /*
  .beauty-Scroll .el-scrollbar__wrap {
    width: calc(~"100% + 17px");
    /*将垂直滚动条挤到可视区域之外*/
  /* height: calc(~"100% + 17px"); */
  /*将水平滚动条挤到可视区域之外*/
  /* } */
</style>
