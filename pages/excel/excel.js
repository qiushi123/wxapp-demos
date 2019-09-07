// pages/excel/excel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that=this;
    wx.cloud.callFunction({
      name: "excel",
      success(res) {
        console.log("成功", res)
        that.downLoadFile(res.result.fileID)
      },
      fail(res) {
        console.log("失败", res)
      }
    })
  },

  downLoadFile(fileID){
    wx.cloud.downloadFile({
      fileID: fileID,
      success: res => {
        // get temp file path
        
        console.log("临时路径",res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res) {
            console.log("下载路径",res)
            const savedFilePath = res.savedFilePath
          }
        })
      },
      fail: err => {
        // handle error
        console.log("下载失败", err)
      }
    })
  }
})