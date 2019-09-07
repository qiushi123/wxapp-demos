Page({
  getData() {
    wx.request({
      // url: 'http://localhost:9090/hello.php',
      url: 'http://qcl.30paotui.com/sell/seller/product/list',
      success(res) {
        console.log("请求到到的php数据", res)
      }
    })
  },
  onLoad(){
    let str ="2019-09-01 17:11:12.312,2019-09-01 17:09:49.506,2019-09-06 09:26:49.573"
    let arr = str.split(","); //字符分割
    console.log(arr)
    console.log(arr[0])
    console.log(arr[1])
  }


})