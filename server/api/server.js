var storage = require('./storage')
const fs = require('fs');
// 引入导入模块
const multiparty = require('multiparty');
const server = {

  handler(err, ret, res, type, userName) {

    if (typeof ret === 'undefined') { //过滤不正常的数据
      res.status(202); //已接受。已经接受请求，但未处理完成
      res.json({
        code: '1',
        msg: 'fail'
      })

    } else if (ret.length === 0) {
      res.json({
        code: '0',
        msg: 'fail'
      })
    } else {

      if (type === 1) { // 修改密码 update
        if (ret.affectedRows === 1) { //数据库影响的行数
          res.json({
            code: '2',
            msg: 'success',
            data: "1"
          })
        } else {
          res.json({
            code: '0',
            msg: 'fail'
          })
        }
        storage.userMap.delete(ret.headers.token) //删除指定用户登陆状态

      } else if (type === 0) { //登陆存状态

        var timestamp = new Date().getTime()
        var md5 = require("md5");
        var token = md5(timestamp)
        //console.log("登陆存状态token----" + token)
        storage.userMap.set(token, userName)
        res.header("Authorization-token", token);
        res.json({
          code: '2',
          msg: 'success',
          data: ret
        })

      } else if (type === 2) { //退出
        storage.userMap.delete(ret.headers.token) //删除指定用户登陆状态
        res.json({
          code: '6',
          msg: 'success',
          data: "退出成功"
        })
      } else if (type === 3) { //添加展品数据
        if (err) {
          res.status(202); //已接受。已经接受请求，但未处理完成
          res.json({
            code: '0',
            msg: 'fail',
            data: "失败"
          })
        } else {
          res.json({
            code: '2',
            msg: 'success',
            data: "成功"
          })
        }
      } else if (type === 4) { //查询展品数据
        if (err) {
          res.status(202); //已接受。已经接受请求，但未处理完成
          res.json({
            code: '0',
            msg: 'fail',
            data: "失败"
          })
        } else {
          res.json({
            code: '2',
            msg: 'success',
            data: ret
          })
        }
      } else if (type === 5) { //查询展品数据 5 代表 分页 有 2个 查询 数据
        if (err) {
          res.status(202); //已接受。已经接受请求，但未处理完成
          res.json({
            code: '0',
            msg: 'fail',
            data: "失败"
          })
        } else {

          res.json({
            code: '2',
            msg: 'success',
            data: ret[0],
            total: ret[1][0].total
          })
        }

      } else {
        res.json({
          code: '11',
          msg: 'fail',
          data: "未知"
        })
      }
    }
  },

  downloadFile(req, res) {

    /* 生成multiparty对象，并配置上传目标路径 */
    let form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';

    form.uploadDir = 'static/img/';
    // form.uploadDir = 'D:\exhibitsmanagement2\server\static\img';
    //设置文件大小限制
    // form.maxFilesSize = 1 * 1024 * 1024;
    form.parse(req, function(err, fields, files) {
      try {
        let inputFile = files.file[0];
        let uploadedPath = inputFile.path;
        let timestamp = new Date().getTime()
        let newName = timestamp + inputFile.originalFilename
        let newPath = form.uploadDir + newName;
        //同步重命名文件名 fs.renameSync(oldPath, newPath)
        fs.renameSync(inputFile.path, newPath);
        res.send({
          code: '2',
          msg: 'success',
          data2: newPath,
          data: newName

        });
        //console.log("上传成功！" +newPath);

      } catch (err) {
        //console.log("上传失败！" + err);
        res.send({
          code: '0',
          msg: 'fail',
          data2: newPath,
          data3: uploadedPath,
          data: "上传失败"
        });

      };
    })

  }


}
module.exports = server;
