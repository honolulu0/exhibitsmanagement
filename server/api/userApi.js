//userApi.js

var express = require('express')
var router = express.Router()

var server = require('./server')

var models = require('../db')
var mysql = require('mysql')
var $sql = require('../sqlMap')



// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()



// 上传文件接口
router.post("/file_upload", (req, res) => {

  server.downloadFile(req, res)

})


// 登陆
router.post('/login', (req, res) => {
  var params = req.body;
  var sql = $sql.admin_user.login;
  conn.query(sql, [params.userName, params.passWord], function(err, result) {
    server.handler(err, result, res, 0, params.userName)
  })
})

// 修改密码
router.post('/changePassword', (req, res) => {
  var params = req.body;
  var sql = $sql.admin_user.changePassword;
  conn.query(sql, [params.newPassWord, params.userName, params.passWord], function(err, result) {
    server.handler(err, result, res, 1, params.userName)
  })
})

//退出登录的用户进入登录页面
router.post('/logout', (req, res) => {
  var params = req.body;
  var err = "";

  server.handler(err, req, res, 2, params.userName)
})

//添加展品信息
router.post('/addProdect2', (req, res) => {
  var params = req.body;
  var sql = $sql.exhibits.addProdect;
  var keys = []
  var values = []
  for (var key in params) {
    keys.push(key)
    if (key === 'area' || key === 'imageUrl') {
      values.push(JSON.stringify(params[key]))
    } else {
      values.push(params[key])
    }
  }
  //console.log(values)
  conn.query(sql, [keys, values], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 3, '')
  })
})

//添加展品信息
router.post('/addProdect', (req, res) => {
  var params = req.body;
  var sql = ''
  var keys = ''
  var values = ''
  for (var key in params) {
    if (keys === '') {
      keys = key
      values = "'" + params[key] + "'"
    } else {
      keys = keys + "," + key
      values = values + ",'" + params[key] + "'"
    }
  }
  //console.log(values)
  sql = "insert into exhibition_information( " + keys + " ) values (" + values + ")"
  conn.query(sql, function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 3, '')
  })
})

//修改展品信息
router.post('/updataProdect', (req, res) => {
  var params = req.body;
  var sql = ''
  var id = params.id;
  var values = ''

  for (var key in params) {
    if (key != "id") {
      if (params[key] != 'null' && params[key] != null) {
        if (values === '') {
          values = key + "='" + params[key] + "'"
        } else {
          values = values + "," + key + "='" + params[key] + "'"
        }

      }
    }
  }

  sql = 'update exhibition_information set ' + values + ' WHERE id =' + id
  conn.query(sql, function(err, result) { // 要拼接sql
    //console.log(err)
    server.handler(err, result, res, 3, '')
  })
})

//searchById展品信息
router.post('/searchByIdProdect', (req, res) => {
  var id = req.body.id;
  var sql = $sql.exhibits.searchById;
  conn.query(sql, [id], function(err, result) {
    // //console.log(err)
    server.handler(err, result, res, 4, '')
  })
})

//searchBykey展品信息
router.post('/searchByKeyProdect', (req, res) => {
  var params = req.body;
  var sql = ''
  var values = ''
  for (var key in params) {
    if (values === '') {
      if (key === 'areaId') {
        values = key + " = " + params[key]
      } else {
        values = key + " like '%" + params[key] + "%'"
      }

    } else {
      if (key === 'areaId') {
        values = values + " and " + key + " = " + params[key]
      } else {
        values = values + " and " + key + " like '%" + params[key] + "%'"
      }

    }
  }
  //console.log(values)
  // sql = "select * from exhibition_information , area  where  exhibition_information.areaId = area.idArea AND " + values + " ORDER BY areaId ; SELECT FOUND_ROWS() as total;"

  //sql = "select SQL_CALC_FOUND_ROWS  e.* ,f.floorName as floor ,a.nameArea,a.idArea,a.region from exhibition_information e , area a , floor f WHERE e.areaId = a.idArea and a.floorId = f.id  AND " + values + " ORDER BY areaId;SELECT FOUND_ROWS() as total"
  sql =
    "select SQL_CALC_FOUND_ROWS  e.* ,f.floorName as floor , c.classAName, c.nameArea ,c.region from exhibition_information e , (SELECT  b.idclassA,a.nameArea,a.floorId ,a.region ,b.classAName from area a , area_class_a b WHERE a.idArea = b.idArea ORDER BY b.idclassA) as c , floor f WHERE e.areaId = c.idclassA and c.floorId = f.id  AND " +
    values + "  ORDER BY areaId;SELECT FOUND_ROWS() as total"

  conn.query(sql, function(err, result) { // 要拼接sql
    //console.log(err)
    server.handler(err, result, res, 5, '')
  })
})

//searchAll展品信息
router.post('/searchAllProdect', (req, res) => {
  var num = req.body.num;
  var sql = $sql.exhibits.searchAll;
  num = ((num - 1) * 10)
  conn.query(sql, [num], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 5, '')
  })
})

//searchWareHouse 仓库展品
router.post('/searchWareHouse', (req, res) => {
  var num = req.body.num;
  var sql = $sql.exhibits.searchWareHouse;
  num = ((num - 1) * 10)
  conn.query(sql, [num], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 5, '')
  })
})

//Statistics展品总数
router.post('/total', (req, res) => {
  var field = req.body.field;
  var sql = $sql.exhibits.total;
  conn.query(sql, [field, field], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 4, '')
  })
})
//Statistics展品信息统计
router.post('/statistics', (req, res) => {
  var field = req.body.field;
  var sql = $sql.exhibits.statistics;
  if (field === "area") {
    sql = $sql.exhibits.statisticsA;
  }
  conn.query(sql, [field, field, field], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 4, '')
  })
})
//Statistics展品信息统计
router.post('/statistics1', (req, res) => {
  var a = req.body.a;
  var b = req.body.b;
  var sql = $sql.exhibits.statistics1;
  conn.query(sql, [a, b], function(err, result) {
    //console.log(err)
    server.handler(err, result, res, 4, '')
  })
})
//area展区
router.post('/area', (req, res) => {
  var areald = req.body.areald;
  var sql = $sql.exhibits.area;

  conn.query(sql, [areald], function(err, result) {
    //console.log(err)
    // 组合1级区
    // var Things = result
    // //console.log(result)
    // var areaOptions = []
    // for (var i = 0; i < Things.length; i++) {
    //   Thing = Things[i]
    //   //console.log(Thing.idArea)
    //   areaOptions.push({
    //     'value': Thing.idArea,
    //     'label': Thing.floorId + Thing.region + Thing.nameArea,
    //     'children': []
    //   })
    // }
    // //console.log(areaOptions)

    server.handler(err, result, res, 4, '')
  })
})
module.exports = router
