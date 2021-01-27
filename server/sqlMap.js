//sqlMap.js
var sqlMap = {
  // 用户
  admin_user: {
    login: 'SELECT id,username,nike_name,avatar FROM admin_user WHERE username = (SELECT username FROM admin_user WHERE username = ? and password = ? );',
    changePassword: 'update admin_user set password = ?  WHERE username = ? and password = ? ;',
    add: 'insert into admin_user(loginname,password) values(?, ?)'
  },
  exhibits: {
    // addProdect: "insert into exhibition_information(??) values (?)",
    // update:  'update exhibition_information set ??  WHERE id = ? ;',
    searchById: 'select * from exhibition_information where id  = ?', //查找
    // searchByKey: 'select SQL_CALC_FOUND_ROWS * from exhibition_information where ?? ORDER BY areaId ; SELECT FOUND_ROWS() as total;', //查找
    // searchAll: 'select SQL_CALC_FOUND_ROWS  *  from exhibition_information , area  WHERE exhibition_information.areaId = area.idArea ORDER BY areaId LIMIT ?,10;SELECT FOUND_ROWS() as total', //查找
    searchAll: 'select SQL_CALC_FOUND_ROWS  e.* ,f.floorName as floor ,  c.classAName, c.nameArea ,c.region from exhibition_information e , (SELECT  b.idclassA,a.nameArea,a.floorId ,a.region ,b.classAName from area a , area_class_a b WHERE a.idArea = b.idArea ORDER BY b.idclassA) as c , floor f WHERE e.areaId = c.idclassA and c.floorId = f.id ORDER BY areaId LIMIT ?,10;SELECT FOUND_ROWS() as total', //查找
    searchWareHouse: 'select SQL_CALC_FOUND_ROWS  e.* ,f.floorName as floor ,  c.classAName, c.nameArea ,c.region from exhibition_information e , (SELECT  b.idclassA,a.nameArea,a.floorId ,a.region ,b.classAName from area a , area_class_a b WHERE  b.idclassA=70 and   a.idArea = b.idArea ORDER BY b.idclassA) as c , floor f WHERE e.areaId = 70 and c.floorId = f.id ORDER BY areaId LIMIT ?,10;SELECT FOUND_ROWS() as total', //查找

    // searchAll: 'select SQL_CALC_FOUND_ROWS  e.* ,f.floorName as floor  ,a.nameArea,a.idArea ,a.region from exhibition_information e , area a , floor f WHERE e.areaId = a.idArea and a.floorId = f.id ORDER BY areaId LIMIT ?,10;SELECT FOUND_ROWS() as total', //查找
    // searchAll: 'select SQL_CALC_FOUND_ROWS * from exhibition_information ORDER BY areaId LIMIT ?,10 ; SELECT FOUND_ROWS() as total;', //查找
    statistics: 'SELECT ?? name, COUNT(??) stock FROM exhibition_information GROUP BY ??',
    statisticsA: "SELECT b.floorid name, COUNT(id) stock from exhibition_information e , area_class_a b  WHERE e.areaId =b.idclassA GROUP BY b.floorid",//展品楼层分布占比
    statistics1: 'SELECT a.classAName name, COUNT(e.area) stock FROM exhibition_information e , area_class_a a where e.areaId>? and e.areaId<? and a.idclassA =e.areaId  GROUP BY e.areaId',//1楼各区展品数量
    total: 'SELECT  COUNT(??) total FROM exhibition_information',
    // SELECT timeLimit, COUNT(timeLimit) num FROM exhibition_information  GROUP BY timeLimit
    // SELECT areaId, COUNT(areaId) num FROM exhibition_information  GROUP BY areaId
    area1: 'SELECT idArea,floorId,region,nameArea from area ',
    area: 'SELECT  idclassA value , classAName label from area_class_a  where idArea=?',
    area2: 'SELECT a.floorId ,a.idArea,a.region ,a.nameArea , b.idclassA,b.classAName from area a , area_class_a b where a.idArea=b.idArea ORDER BY b.idclassA',
  }
}
module.exports = sqlMap;
