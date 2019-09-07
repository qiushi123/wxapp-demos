// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入fs模块
const fs = require('fs')
const path = require('path')
//引入excel模块
var excelPort = require('excel-export');

cloud.init({
  env: "test-vsbkm"
})

// 云函数入口函数
exports.main = async(event, context) => {
  let dataCVS = "data.xlsx"
  let datas = [{
      content: "qcl"
    },
    {
      content: "qcl2"
    }
  ]
  // 把数据传个datas
  try {
    //定义一个对象，存放内容
    var conf = {};
    //定义表头
    conf.cols = [{
      caption: 'renyuan',
      type: 'string',
      width: 30
    }, ];
    //创建一个数组用来多次遍历行数据
    var array = [];
    // 循环导入从数据库中获取的表内容
    for (var i = 0; i < datas.length; i++) {
      //依次写入
      array[i] = [
        datas[i].content
      ];
    }
    //写入道conf对象中
    conf.rows = array;
    // 定义表格存放路径
    await fs.writeFile(dataCVS, excelPort.execute(conf), 'binary', function(err) {
      if (err) {
        console.log(err);
        
      }
    });

    const fileStream = fs.createReadStream(path.join(__dirname, dataCVS))
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: fileStream.path, //如： /var/user/util.xlsx
    })

    // const fileStream = await fs.createReadStream(path.join(__dirname, 'util.xlsx'))
    // return await cloud.uploadFile({
    //   cloudPath: 'util.xlsx',
    //   fileContent: '/var/user/util.xlsx', // 文件路径
    //   success: res => {
    //     // get resource ID
    //     console.log("保存成功", res.fileID)
    //     return "保存成功";
    //   },
    //   fail: err => {
    //     console.log("err", err)
    //     // handle error
    //     return "保存失败";
    //   }
    // })
  } catch (e) {
    // 处理出错情况
    console.log(e)
    return e
  }
}