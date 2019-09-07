Page({
  data: {
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0],
    
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let arr = e.detail.value
    let num1=arr[0]
    let num2=arr[1]
    let num3=arr[2]
    console.log('携带值为', this.data.multiArray[0][e.detail.value[0]])
    console.log('携带值为', this.data.multiArray[1][e.detail.value[1]])
    console.log('携带值为', this.data.multiArray[2][e.detail.value[2]])


    
    this.setData({
      multiIndex: e.detail.value
    })
  }
})