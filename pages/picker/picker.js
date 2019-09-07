Page({
  data: {
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物']
    ],
    multiIndex: [0, 0],

  },

  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let arr = e.detail.value
    console.log('携带值为', this.data.multiArray[0][arr[0]])
    console.log('携带值为', this.data.multiArray[1][arr[1]])



    this.setData({
      multiIndex: e.detail.value
    })
  }
})