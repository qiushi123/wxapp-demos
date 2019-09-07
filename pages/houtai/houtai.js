Page({
  // 获取后台数据
  getData() {
    wx.request({
      // url: 'http://www.saibanmall.com/hello',
      url: 'http://saibanmall.com/',
      success(res) {
        console.log("请求服务器数据成功", res)
      },
      fail(res) {
        console.log("请求服务器数据失败", res)
      }
    })
  }
})