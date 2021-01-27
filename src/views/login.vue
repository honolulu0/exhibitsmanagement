<template>

  <div class="login_container">
    <el-image :src="require('../assets/image/new_banner3CXG.jpg')" fit="contain"></el-image>
    <h1 class="company_title">安徽创新馆展品管理系统</h1>
    <!-- <div class="company_box"><div class="company_title">安徽创新馆展品管理系统</div></div> -->
    <div class="login_box">
      <!-- 登录表单区域 -->
      <div class="login-title">{{loginTitle}}</div>
      <el-form size="mini" :model="From" :rules="loginFormRules" ref="loginFromRef">
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input v-model="From.userName" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input v-model="From.passWord" prefix-icon="el-icon-lock" placeholder="登陆密码" show-password
            @keyup.enter.native="submitForm"></el-input>
        </el-form-item>

        <div v-if="this.changeTitle==='返回登陆'">
          <el-form-item prop="newPassWord">
            <el-input v-model="From.newPassWord" prefix-icon="el-icon-lock" placeholder="新密码" @keyup.enter.native="submitForm"></el-input>
          </el-form-item>
        </div>
        <!-- 占位 -->
        <el-form-item v-if="this.changeTitle!='返回登陆'">

        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
        <!--        <el-form-item>
          <el-button type="primary" @click="submitOut">退出</el-button>
        </el-form-item> -->
      </el-form>
      <div class="changePw" @click="handleClick">
        <el-link type="danger">{{changeTitle}}</el-link>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        From: {
          userName: 'admin1',
          passWord: 'admin',
          newPassWord: 'newPassWord',
        },
        loginTitle: "欢迎登陆",
        changeTitle: "修改密码",
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        loginFormRules: {
          userName: [{
            min: 3,
            max: 8,
            required: true,
            message: '用户名 长度在 3 到 8 个字符',
            trigger: 'blur'
          }],
          passWord: [{
            min: 3,
            max: 8,
            required: true,
            message: '密码 长度在 3 到 8 个字符',
            trigger: 'blur'
          }],
          newPassWord: [{
            min: 3,
            max: 8,
            required: true,
            message: '新密码 长度在 3 到 8 个字符',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      handleClick(tab, event) {

        if (this.changeTitle === "返回登陆") {
          this.loginTitle = "欢迎登陆"
          this.changeTitle = "修改密码"
        } else {
          this.loginTitle = "修改密码"
          this.changeTitle = "返回登陆"
        }

      },

      submitForm() {
        var that = this;
        this.$refs['loginFromRef'].validate((valid) => {
          if (valid) {

            if (that.changeTitle === "返回登陆") {
              that.changePassword()
            } else {
              that.login()
            }

          }
        })



      },
      submitOut() {
        var name = this.From.userName;
        this.$http.post('/api/user/logout', {
          userName: name
        }, {}).then((response) => {
          var ret = response.body
          if (ret.code === "6") {
            this.$message({
              message: ret.data,
              type: 'success',
              center: true,
              duration: 1000
            });
          } else {
            this.$message({
              message: '退出失败 ' + ret.code,
              type: 'warning',
              center: true,
              duration: 1000
            });
          }

        })
      },
      login() {

        var name = this.From.userName;
        var passWord = this.From.passWord;

        this.$http.post('/api/user/login', {
          userName: name,
          passWord: passWord
        }, {}).then((response) => {
          var ret = response.body
          if (ret.code === "2") {
            this.$message({
              message: '登陆成功',
              type: 'success',
              center: true,
              duration: 1000
            });
            //{"code":"2","msg":"success",
            //"data":[{"id":6,"username":"admin1","nike_name":"安徽创新馆管理员1","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604595001804&di=91b9a3aa7e252c4aeeb5f612545833b6&imgtype=0&src=http%3A%2F%2Fwww.huishangol.com%2Fuploadfile%2F2019%2F0415%2F20190415043509931.png"}]}'

            let storage = window.localStorage
            storage.setItem('id', ret.data[0].id)
            storage.setItem('username', ret.data[0].username)
            storage.setItem('nike_name', ret.data[0].nike_name)
            storage.setItem('avatar', ret.data[0].avatar)
            storage.setItem('Authorization-token', response.headers.get("Authorization-token"))

            storage.setItem('loginName', this.From.userName)
            storage.setItem('loginPw', this.From.passWord)

            this.$router.push({
              path: '/home'
            })
          } else {
            this.$message({
              message: '登陆失败 ' + ret.code,
              type: 'warning',
              center: true,
              duration: 1000
            });
          }

        })
      },

      changePassword() {
        var name = this.From.userName;
        var passWord = this.From.passWord;
        var newPassWord = this.From.newPassWord;
        this.$http.post('/api/user/changePassword', {
          userName: name,
          passWord: passWord,
          newPassWord: newPassWord
        }, {}).then((response) => {
          var ret = response.body
          if (ret.code === "2") {
            this.$message({
              message: '修改成功',
              type: 'success',
              center: true,
              duration: 1000
            });

          } else {
            this.$message({
              message: '修改失败 ' + ret.code,
              type: 'warning',
              center: true,
              duration: 1000
            });
          }
        })
      }
    },
    created() {
      let storage = window.localStorage
      this.From.userName = storage.getItem('loginName')
      this.From.passWord = storage.getItem('loginPw')
      if (this.From.userName === null || this.userName === "" || this.From.userName === undefined) {
        this.From.userName = ""
        this.From.passWord = ""
      }
    }
  }
</script>
<style scoped>
  .company_title {
    text-align: center;
    color: #409EFF;
    font-size: 300%;
    font-family: FZXiaoBiaoSong-B05S;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    /* transform: translate(-50%, -150%); */
  }

  .login_box {
    width: 290px;
    height: 300px;
    /* background-color: #fff; */
    background-color: #2e527bb3;
    border-radius: 5px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login-title {
    text-align: center;
    margin: 20px auto 0px auto;
    color: #409EFF;
    font-size: 30px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding-bottom: 6px;

  }

  .el-form {
    padding: 32px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
  }

  .el-button {
    width: 100%;
  }


  .rememberMe {
    color: #fff;
  }

  .changePw {

    position: fixed;
    right: 20px;
    bottom: 10px;

  }
</style>
