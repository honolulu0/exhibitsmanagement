// node 后端服务器
// 创建express服务器
const express = require('express');
const app = express();

//数据库API
const userApi = require('./api/userApi');

const path = require('path');

// 注册解析 表单数据的 body-parser
const bodyParser = require('body-parser');

var storage = require('./api/storage')

// 处理json格式的参数
app.use(bodyParser.json());
// post
app.use(bodyParser.urlencoded({
  extended: false
}));

// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname, "static")))
// app.use("/api/user",express.static(path.join(__dirname, "static")))

// app.use('/static', express.static(__dirname + '/static'));

// 将请求响应设置content-type设置为application/json
app.use('/api/*', function(req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 设置服务器支持的所有头信息字段
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "POST,GET");

  //  //console.log(req.originalUrl) // /api/user/login
  //console.log(req.baseUrl) // /api/user/login
  // //console.log(req.params) // { '0': 'user/login' }

  // if (req.baseUrl != "/api/user/login" && req.baseUrl != "/api/user/changePassword" ) { //这个url放行  && req.baseUrl != "/api/user/file_upload"
  //   if (storage.userMap.has(req.headers.token)) {
  //     //console.log("登陆状态")
  //   } else {
  //     //console.log(storage.userMap)
  //     res.status(401);//请求要求用户的身份认证
  //     res.json({
  //       code: '6',
  //       msg: 'success',
  //       data: "您已退出"
  //     })
  //     return;
  //   }
  // }else{//console.log("放行")}

  // next()方法表示进入下一个路由
  next();
});


// 后端api路由
app.use('/api/user', userApi);

// 监听端口  服务器已经启动
app.listen('3000', function() {
  console.log('success listen at port:3000......');
})
