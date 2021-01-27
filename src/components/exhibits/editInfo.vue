<template>
  <div id="productCategroys">
    <!-- 面包导航 -->
    <el-breadcrumb separator="/" style="padding-left:10px;padding-bottom:10px;font-size:12px;">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>展品编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="6">
        <el-col :span="4">
          <el-input clearable size="mini" v-model="search.provider" placeholder="请输入单位名称查询" class="input-with-select"></el-input>
          <!--        <el-input
            placeholder="请输入单位名称查询"
            v-model="search.provider"
            clearable>
          </el-input> -->
        </el-col>
        <el-col :span="4">
          <el-input clearable size="mini" v-model="search.name" placeholder="请输入展品名称查询" class="input-with-select"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select size="mini" v-model="search.state" placeholder="请选择" @change='addNewChange'>
            <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="primary" icon="el-icon-search" @click="searchArea">查找</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" icon="el-icon-refresh-right" type="warning" @click="resetForm">重置</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" icon="el-icon-refresh" @click="getproductList">刷新</el-button>
        </el-col>
        <el-col :span="5" :style="currentName==='选中列表编辑展品'?'color: #ff007f;':'color: #005CC5;'" style="text-decoration: underline; text-align:center;">
          <span>{{currentName}}</span>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="success" icon="el-icon-edit" @click="openUpdate">编辑</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <template>
        <el-table highlight-current-row height='650px' @current-change="handleclick" v-loading="loading" border :data="productData"
          class="show_table" style="width: 100%; margin-top:20px;">
          <el-table-column prop="id" type="index" label="ID" align="center"></el-table-column>
          <el-table-column prop="name" label="展品名称" align="center"></el-table-column>
          <el-table-column prop="pnum" :show-overflow-tooltip='true' align="center" width="80px" label="展品编号"></el-table-column>
          <el-table-column prop="imageUrl" :label="'展品图片 \n (点击查看)'" align="center" width="100px" padding="0px">
            <template slot-scope="scope">
              <el-popover disabled trigger="click">
                <el-image slot="reference" :src="scope.row.imageUrl[0]" :preview-src-list="scope.row.imageUrl"></el-image>
                <!-- <img slot="reference" :src="scope.row.imageUrl[0]" style="max-width: 80px;cursor: pointer"> -->
              </el-popover>
              <span>共 {{scope.row.imageUrl.length}} 张</span>
            </template>
          </el-table-column>
          <el-table-column label="展品规格" align="center" width="80px" prop="specifications"></el-table-column>
          <el-table-column label="展品类型" align="center" width="50px" prop="type"></el-table-column>
          <el-table-column prop="city" align="center" label="所属市" width="60px"></el-table-column>
          <el-table-column prop="provider" align="center" label="单位"></el-table-column>
          <el-table-column label="联系人" align="center" width="80px">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left">
                <p>姓名: {{ scope.row.contacts }}</p>
                <p>电话: {{ scope.row.phone }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag v-if="scope.row.contacts" size="medium">{{ scope.row.contacts }}</el-tag>
                  <el-tag v-else size="medium">暂无</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column width="160px" label="所在展区" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="right">
                <p></p>
                <p> {{ scope.row.floor }} 楼 {{ scope.row.region }} 区</p>
                <p>{{ scope.row.nameArea }}</br>{{ scope.row.classAName }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag v-if="scope.row.area" size="medium"> {{ scope.row.floor }}楼 {{ scope.row.region }}区 {{ scope.row.nameArea }}</el-tag>
                  <el-tag v-else size="medium">暂无</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="timeLimit" label="展览期限" width="50px"></el-table-column>
          <el-table-column prop="state" label="状态" width="50px"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="50px"></el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination style="margin-top:10px;" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum" :page-sizes="[pageSize]" :page-size="this.queryMap.pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
      <!-- 展品添加弹出框 -->
      <el-dialog v-if="addDialogVisible" title="展品编辑" :visible.sync="addDialogVisible" width="50%" @close="closeAddDialog">
        <span>
          <el-container style="margin-bottom:10px;">
            <el-alert show-icon title="友情提示:  展品名称 不可修改" type="warning">
            </el-alert>
          </el-container>
          <el-form size="mini" :model="addRuleForm" ref="addRuleFormRef" label-width="100px" class="demo-ruleForm">
            <el-form-item label="展品编号">
              <el-input v-model="addRuleForm.pnum"></el-input>
            </el-form-item>
            <el-form-item label="展品名称">
              <el-input :disabled="true" v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="提供单位">
              <el-input v-model="addRuleForm.provider"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人">
                  <el-input v-model="addRuleForm.contacts"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话">
                  <el-input v-model="addRuleForm.phone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="展品规格">
                    <el-input v-model="addRuleForm.specifications"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="所属市">
                    <el-select v-model="addRuleForm.city" placeholder="请选择">
                      <el-option v-for="item in cityList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>

                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="展品类型">
                    <el-select v-model="addRuleForm.type" placeholder="请选择" @change='addNewChange'>
                      <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="展览期限">
                    <el-select v-model="addRuleForm.timeLimit" placeholder="请选择" @change='addNewChange'>
                      <el-option v-for="item in timeLimitList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="展区">
                    <el-cascader v-model="addRuleForm.area" :options="areaOptions" :props="{ expandTrigger: 'hover' }"></el-cascader>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="展品状态">
                    <el-select v-model="addRuleForm.state" placeholder="请选择" @change='addNewChange'>
                      <el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="技术优势">
              <el-input type="textarea" v-model="addRuleForm.technicalAdvantages"></el-input>
            </el-form-item>
            <el-form-item label="获奖情况">
              <el-input type="textarea" v-model="addRuleForm.awards"></el-input>
            </el-form-item>
            <el-form-item label="市场情况">
              <el-input type="textarea" v-model="addRuleForm.marketConditions"></el-input>
            </el-form-item>

            <el-form-item label="展品图片">
              <!-- 图片上传部分 -->
              <el-upload action="/api/user/file_upload" list-type="picture-card" :on-change="handleChange" :on-success="handleSuccess"
                :file-list="fileList" :limit="limitcount" multiple :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                :on-error='handError'>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>

            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" v-model="addRuleForm.remarks"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false;currentId = 0;currentName = '选中列表编辑展品'">取 消</el-button>
          <el-button type="primary" @click="update" :disabled="btnDisabled" :loading="btnLoading">确 定</el-button>
        </span>
      </el-dialog>


    </el-card>

  </div>

</template>

<script>
  import addProdectsConstant from '../constant/addProdectsConstant.js'

  export default {
    data() {
      return {
        imgLocalUrl: 'http://127.0.0.1:3000/img/',
        statusIndex: 0,
        cityList: addProdectsConstant.cityList,
        typeList: addProdectsConstant.typeList,
        timeLimitList: addProdectsConstant.timeLimitList,
        areaOptions: addProdectsConstant.areaOptions,
        stateList: addProdectsConstant.stateList,
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
        pageSize:10,
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
        currentName: '选中列表编辑展品'


      };
    },
    methods: {

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
        this.currentId = 0
        this.currentName = '选中列表编辑展品'
      },
      handleclick(currentRow) {
        if (currentRow === null) {
          return
        }
        this.addRuleForm = {}
        this.addRuleForm = JSON.parse(JSON.stringify(currentRow))
        this.currentName = currentRow.name
        this.currentId = currentRow.id
        this.$message.success("当前已经选中: " + currentRow.name + " 准备修改");
      },
      /**
       * 打开添加展品弹框
       */
      openUpdate() {
        if (!(this.addRuleForm.id > 0)) {
          this.$message.error("展品修改失败:请选择展品");
          return
        }
        this.addDialogVisible = true;
        var a = this.addRuleForm.area

        this.addRuleForm.area = a.split(",")
        if(this.addRuleForm.area.length===3){
          this.addRuleForm.area[1]=parseInt(this.addRuleForm.area[1])
          this.addRuleForm.area[2]=parseInt(this.addRuleForm.area[2])
        }

        this.fileList = []
        for (var i = 0; i < this.addRuleForm.imageUrl.length; i++) {
          this.fileList[i] = {
            name: i + "",
            url: this.addRuleForm.imageUrl[i]
          }
        }
        //console.log(this.fileList)


      },


      /**
       * 编辑展品
       */
      update() {
        if (!(this.addRuleForm.id > 0)) {
          this.$message.error("展品修改失败:请选择展品");
          return
        }
        delete this.addRuleForm['createTime']
        delete this.addRuleForm['idArea']
        delete this.addRuleForm['floor']
        delete this.addRuleForm['nameArea']
        delete this.addRuleForm['region']
        delete this.addRuleForm['classAName']

        this.btnDisabled = true;
        this.btnLoading = true;
        var that = this;

        if (this.addRuleForm.area != undefined && this.addRuleForm.area.length === 3) {

          this.addRuleForm.areaId = parseInt(this.addRuleForm.area[2])
        }

        if (this.addRuleForm.imageUrl != undefined) {
          for (var i = 0; i < this.addRuleForm.imageUrl.length; i++) {
            //console.log(this.addRuleForm.imageUrl[i])
            this.addRuleForm.imageUrl[i] = this.addRuleForm.imageUrl[i].replace(this.imgLocalUrl, "")
            //console.log(this.addRuleForm.imageUrl[i])
          }
        }
        this.$http.post('/api/user/updataProdect',
          that.addRuleForm, {}).then((res) => {

          that.btnDisabled = false;
          that.btnLoading = false;
          if (res.status == 200) {
            that.$message.success("展品修改成功");
            that.addRuleForm = {};

          } else {
            return that.$message.error("展品修改失败:" + res.msg);
          }
          that.addDialogVisible = false;
          that.getproductList()
        })

      },

      /**
       * 搜索展品
       */
      searchArea() {
        if (this.search.name === undefined && this.search.provider === undefined && this.search.state === undefined) {
          this.$message.error("请输入查询条件");
          return
        }
        this.productData = []
        var that = this;
        that.loading = true;
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
        this.pageSize = 10
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
</style>
