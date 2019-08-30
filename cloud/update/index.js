// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: "test-vsbkm"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  let {
    detailId
  } = event
  try {
    return await db.collection('list')
      .doc("" + detailId)
      .update({
        data: {
          status: 1
        },
        success: function(res) {
          return res;
        }
      });
  } catch (e) {
    console.error(e)
  }
}