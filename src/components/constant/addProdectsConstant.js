//sqlMap.js
var addProdectsConstant = {
  // 展品类型
  typeList: [{
      value: '实物',
      label: '实物'
    }, {
      value: '模型',
      label: '模型'
    }, {
      value: '视频',
      label: '视频'

    }, {
      value: '药品',
      label: '药品'
    }, {
      value: '其他',
      label: '其他'
    },
    {
      value: 'type',
      label: '输入新内容'
    }
  ],
  timeLimitList: [{
    value: '长期',
    label: '长期'
  }, {
    value: '短期',
    label: '短期'
  }, {
    value: '其他',
    label: '其他'
  }, {
    value: 'timeLimit',
    label: '输入新内容'
  }],
  stateList: [{ //正常 借出 不能提供 待定 到期
    value: '正常',
    label: '正常'
  }, {
    value: '借出',
    label: '借出'
  }, {
    value: '不能提供',
    label: '不能提供'
  }, {
    value: '待定',
    label: '待定'
  }, {
    value: '到期',
    label: '到期'
  }, {
    value: '其他',
    label: '其他'
  }, {
    value: 'state',
    label: '输入新内容'
  }],
  cityList: [{
    value: '合肥市',
    label: '合肥市'
  }, {
    value: '宿州',
    label: '宿州'
  }, {
    value: '淮北',
    label: '淮北'
  }, {
    value: '亳州',
    label: '亳州'
  }, {
    value: '阜阳',
    label: '阜阳'
  }, {
    value: '蚌埠',
    label: '蚌埠'
  }, {
    value: '淮南',
    label: '淮南'
  }, {
    value: '滁州',
    label: '滁州'
  }, {
    value: '六安',
    label: '六安'
  }, {
    value: '马鞍山',
    label: '马鞍山'
  }, {
    value: '安庆',
    label: '安庆'
  }, {
    value: '芜湖',
    label: '芜湖'
  }, {
    value: '铜陵',
    label: '铜陵'
  }, {
    value: '宣城',
    label: '宣城'
  }, {
    value: '池州',
    label: '池州'
  }, {
    value: '黄山',
    label: '黄山'
  }],
  
  areaOptions: [{
    "value": "1F",
    "label": "1F",
    "children": [{
      "value": 1,
      "label": "1A创新安徽（序厅）",
      "children": [{
        "value": 1,
        "label": "中庭"
      }]
    }, {
      "value": 2,
      "label": "1B创新，改变世界",
      "children": [{
        "value": 2,
        "label": "三次工业革命"
      }, {
        "value": 3,
        "label": "中国的四大发明"
      }]
    }, {
      "value": 3,
      "label": "1C安徽创新禀赋",
      "children": [{
        "value": 4,
        "label": "惊艳世界的“安徽造”"
      }, {
        "value": 5,
        "label": "安徽创新历程-“三重一创”"
      }, {
        "value": 6,
        "label": "长三角区域一体化发展战略-数字沙盘"
      }]
    }, {
      "value": 4,
      "label": "1D合肥综合性国家科学中心",
      "children": [{
        "value": 7,
        "label": "合肥综合性国家科学中心"
      }]
    }, {
      "value": 5,
      "label": "1E量子信息",
      "children": [{
        "value": 8,
        "label": "量子信息"
      }]
    }, {
      "value": 6,
      "label": "1F聚变新能源",
      "children": [{
        "value": 9,
        "label": "聚变新能源"
      }]
    }, {
      "value": 7,
      "label": "1G稳态强磁场",
      "children": [{
        "value": 10,
        "label": "稳态强磁场"
      }]
    }, {
      "value": 8,
      "label": "1H同步辐射",
      "children": [{
        "value": 11,
        "label": "同步辐射"
      }]
    }, {
      "value": 9,
      "label": "1I谋划建设的大科学装置",
      "children": [{
        "value": 12,
        "label": "大气环境立体探测实验研究设施"
      }, {
        "value": 13,
        "label": "未来网络实验设施"
      }, {
        "value": 14,
        "label": "高精度地基授时系统"
      }]
    }, {
      "value": 10,
      "label": "1J交叉前沿研究平台",
      "children": [{
        "value": 15,
        "label": "合肥微尺度物质科学国家科学中心"
      }, {
        "value": 16,
        "label": "人工智能平台"
      }, {
        "value": 17,
        "label": "超导核聚变中心"
      }, {
        "value": 18,
        "label": "环境光学创新研究中心"
      }, {
        "value": 19,
        "label": "天地一体化信息网络合肥中心"
      }]
    }, {
      "value": 11,
      "label": "1K产业创新转化平台",
      "children": [{
        "value": 20,
        "label": "中国科学技术大学先进技术研究院"
      }, {
        "value": 21,
        "label": "合肥工业大学智能制造技术研究院"
      }, {
        "value": 22,
        "label": "清华大学合肥公共安全研究院"
      }, {
        "value": 23,
        "label": "中科院合肥技术创新工程院"
      }, {
        "value": 24,
        "label": "安徽工业技术创新研究院"
      }, {
        "value": 25,
        "label": "离子医学中心"
      }, {
        "value": 26,
        "label": "安徽大学绿色产业创新研究院"
      }, {
        "value": 27,
        "label": "北京航空航天大学合肥创新研究院"
      }, {
        "value": 28,
        "label": "类脑智能技术及应用国家工程实验室"
      }]
    }, {
      "value": 12,
      "label": "1L双一流大学",
      "children": [{
        "value": 29,
        "label": "中国科学技术大学"
      }, {
        "value": 30,
        "label": "合肥工业大学"
      }, {
        "value": 31,
        "label": "安徽大学"
      }]
    }]
  }, {
    "value": "2F",
    "label": "2F",
    "children": [{
      "value": 13,
      "label": "2A产业发展前瞻",
      "children": [{
        "value": 32,
        "label": "安徽智造"
      }, {
        "value": 33,
        "label": "三重一创"
      }]
    }, {
      "value": 14,
      "label": "2B新一代信息技术创新成果",
      "children": [{
        "value": 34,
        "label": "集成电路"
      }, {
        "value": 35,
        "label": "新型显示"
      }, {
        "value": 36,
        "label": "智能语音"
      }, {
        "value": 37,
        "label": "智能终端"
      }, {
        "value": 38,
        "label": "软件和信息服务"
      }]
    }, {
      "value": 15,
      "label": "2C信息经济创新成果",
      "children": [{
        "value": 39,
        "label": "城市智脑"
      }, {
        "value": 40,
        "label": "云计算和大数据"
      }, {
        "value": 41,
        "label": "数字创意"
      }]
    }, {
      "value": 16,
      "label": "2D高端装备和新材料创新成果",
      "children": [{
        "value": 42,
        "label": "智能机器人"
      }, {
        "value": 43,
        "label": "智能制造"
      }, {
        "value": 44,
        "label": "现代农机"
      }, {
        "value": 45,
        "label": "轨道交通"
      }, {
        "value": 46,
        "label": "通用航空"
      }, {
        "value": 47,
        "label": "新材料"
      }]
    }, {
      "value": 17,
      "label": "2E绿色低碳创新成果",
      "children": [{
        "value": 48,
        "label": "新能源汽车"
      }, {
        "value": 49,
        "label": "新能源"
      }, {
        "value": 50,
        "label": "节能环保"
      }]
    }, {
      "value": 18,
      "label": "2F生物和大健康创新成果",
      "children": [{
        "value": 51,
        "label": "生物制造"
      }, {
        "value": 52,
        "label": "高端医疗器械"
      }, {
        "value": 53,
        "label": "生物农业"
      }, {
        "value": 54,
        "label": "生物医药"
      }, {
        "value": 55,
        "label": "现代中药"
      }, {
        "value": 56,
        "label": "智慧健康"
      }]
    }, {
      "value": 19,
      "label": "2G军民融合创新成果",
      "children": [{
        "value": 57,
        "label": "军民融合创新成果"
      }]
    }, {
      "value": 20,
      "label": "2H优势传统产业升级创新成果",
      "children": [{
        "value": 59,
        "label": "建筑业升级"
      }, {
        "value": 58,
        "label": "农业转型发展"
      }]
    }]
  }, {
    "value": "3F",
    "label": "3F",
    "children": [{
      "value": 21,
      "label": "3A江淮英才",
      "children": [{
        "value": 60,
        "label": "江淮英才"
      }]
    }, {
      "value": 22,
      "label": "3B一室一中心",
      "children": [{
        "value": 61,
        "label": "一室一中心"
      }]
    }, {
      "value": 23,
      "label": "3C新型研发机构",
      "children": [{
        "value": 62,
        "label": "新型研发机构"
      }]
    }, {
      "value": 24,
      "label": "3D国家级研发中心",
      "children": [{
        "value": 63,
        "label": "国家级研发中心"
      }]
    }, {
      "value": 25,
      "label": "3E众创平台",
      "children": [{
        "value": 64,
        "label": "众创平台"
      }]
    }, {
      "value": 26,
      "label": "3F全球“创时代”",
      "children": [{
        "value": 65,
        "label": "全球“创时代”"
      }]
    }, {
      "value": 27,
      "label": "3G中国“新力量”",
      "children": [{
        "value": 66,
        "label": "中国“新力量”"
      }]
    }, {
      "value": 28,
      "label": "3H创未来",
      "children": [{
        "value": 67,
        "label": "创未来"
      }]
    }, {
      "value": 29,
      "label": "3I创新总动员智能产品展示空间",
      "children": [{
        "value": 68,
        "label": "创新总动员智能产品展示空间"
      }]
    }, {
      "value": 30,
      "label": "3J“未来探索”创享体验",
      "children": [{
        "value": 69,
        "label": "“未来探索”创享体验"
      }]
    }]
  }, {
    "value": "XF",
    "label": "其他",
    "children": [{
      "value": 31,
      "label": "其他",
      "children": [{
        "value": 70,
        "label": "仓库"
      }, {
        "value": 71,
        "label": "其他"
      }]
    }]
  }]
}
module.exports = addProdectsConstant;
