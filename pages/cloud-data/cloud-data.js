let listDB = wx.cloud.database().collection("list");
Page({
  add() {
    listDB.add({
      data: {
        status: 0
      },
      success(res) {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)
      },
    })
  },

  update() {
    wx.cloud.callFunction({
      name: "update",
      data: {
        detailId: "3c4c6d855d68a7640d3ee1347a130b71"
      },
      success(res) {
        console.log("更新成功", res)
      },
      fail(res) {
        console.log("更新失败", res)
      },
    })
  }

})