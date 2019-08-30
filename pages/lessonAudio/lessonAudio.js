var app = getApp();
var zzdUrl = app.globalData.zzdUrl;
var zzdHost = app.globalData.zzdHost;
var bgm = wx.getBackgroundAudioManager();

var timer0;
var areaWidth0; //播放进度滑块移动区域宽度
var viewWidth0; //播放进度滑块宽度
var distance0;

var timer1;
var areaWidth1; //播放进度滑块移动区域宽度
var viewWidth1; //播放进度滑块宽度
var distance1;

var timer2;
var areaWidth2; //播放进度滑块移动区域宽度
var viewWidth2; //播放进度滑块宽度
var distance2;

var timer3;
var areaWidth3; //播放进度滑块移动区域宽度
var viewWidth3; //播放进度滑块宽度
var distance3;

var timer4;
var areaWidth4; //播放进度滑块移动区域宽度
var viewWidth4; //播放进度滑块宽度
var distance4;
Page({
    data: {
      flag:false,
        stateNum: 0,
        list: [],
        zzdUrl: zzdUrl,
        windowWidth: '',
        list0: {
            allTime: '',
            play: false, //按钮显示隐藏
            percent: 0, //进度条百分比
            Time: 0, //音频时长s
            currTime: 0, //当前时长s
            left: 0, //装饰物初始位置 
            endMusic: true, //播放结束
            changeCurrTime: '',
            audioSrc: ''
        },
        list1: {
            allTime: '',
            play: false, //按钮显示隐藏
            percent: 0, //进度条百分比
            Time: 0, //音频时长s
            currTime: 0, //当前时长s
            left: 0, //装饰物初始位置 
            endMusic: true, //播放结束
            changeCurrTime: '',
            audioSrc: '',
        },
        list2: {
            allTime: '',
            play: false, //按钮显示隐藏
            percent: 0, //进度条百分比
            Time: 0, //音频时长s
            currTime: 0, //当前时长s
            left: 0, //装饰物初始位置 
            endMusic: true, //播放结束
            changeCurrTime: '',
            audioSrc: '',
        },
        list3: {
            allTime: '',
            play: false, //按钮显示隐藏
            percent: 0, //进度条百分比
            Time: 0, //音频时长s
            currTime: 0, //当前时长s
            left: 0, //装饰物初始位置 
            endMusic: true, //播放结束
            changeCurrTime: '',
            audioSrc: ''
        },
        list4: {
            allTime: '',
            play: false, //按钮显示隐藏
            percent: 0, //进度条百分比
            Time: 0, //音频时长s
            currTime: 0, //当前时长s
            left: 0, //装饰物初始位置 
            endMusic: true, //播放结束
            changeCurrTime: '',
            audioSrc: ''
        }
    },
    onLoad: function (options) {
        // chaptersId: "51", gradeId: "9"
        var that = this;
        // 学习进度 start//////////////////////////////////////////////
        const appidValue = wx.getStorageSync('appidValue');
        let urlprocess = zzdHost + '/LessionContent.aspx?type=SetStudyProcess';
        let dataprocess = {
            userId: appidValue,
            chaptersId: options.chaptersId,
            gradeId: options.gradeId
        };
        app.appRequest('GET', urlprocess, dataprocess, (kl) => { });
        // 学习进度 end//////////////////////////////////////////////
        let stateNum = that.data.stateNum;
        bgm.onEnded(() => {
            if(stateNum == 0){
                clearInterval(timer0)
                that.setData({
                    'list0.play': false,
                    'list0.percent': 0, //进度条百分比
                    'list0.currTime': 0, //当前时长s
                    'list0.left': 0, //装饰物初始位置
                    'list0.changeTime': 0,
                    'list0.changeCurrTime': '00:00',
                    'list0.endMusic': false
                })
            }
            else if(stateNum == 1){
                clearInterval(timer1)
                that.setData({
                    'list1.play': false,
                    'list1.percent': 0, //进度条百分比
                    'list1.currTime': 0, //当前时长s
                    'list1.left': 0, //装饰物初始位置
                    'list1.changeTime': 0,
                    'list1.changeCurrTime': '00:00',
                    'list1.endMusic': false
                })
            }else if(stateNum == 2){
                clearInterval(timer2)
                that.setData({
                    'list2.play': false,
                    'list2.percent': 0, //进度条百分比
                    'list2.currTime': 0, //当前时长s
                    'list2.left': 0, //装饰物初始位置
                    'list2.changeTime': 0,
                    'list2.changeCurrTime': '00:00',
                    'list2.endMusic': false
                })
            }else if(stateNum == 3){
                clearInterval(timer3)
                that.setData({
                    'list3.play': false,
                    'list3.percent': 0, //进度条百分比
                    'list3.currTime': 0, //当前时长s
                    'list3.left': 0, //装饰物初始位置
                    'list3.changeTime': 0,
                    'list3.changeCurrTime': '00:00',
                    'list3.endMusic': false
                })
            }else if(stateNum == 4){
                clearInterval(timer4)
                that.setData({
                    'list4.play': false,
                    'list4.percent': 0, //进度条百分比
                    'list4.currTime': 0, //当前时长s
                    'list4.left': 0, //装饰物初始位置
                    'list4.changeTime': 0,
                    'list4.changeCurrTime': '00:00',
                    'list4.endMusic': false
                })
            }
        })

        let urlAudio = zzdHost + '/LessionContent.aspx?type=GetAudioInfo';
        let data = {
            chaptersId: options.chaptersId
        };

        app.appRequest('GET', urlAudio, data, (res) => {
            if (res.success) {
                that.setData({
                    list: res.data
                })
            }
            // 时间数据 start //////////////////////////////////////
            var query = wx.createSelectorQuery();
            // 只有一条数据
            if (res.data.length >= 1) {
                //计算音频时长
                let Time = that.timetosec(res.data[0].Audio_Time);
                let changeTime = that.changeTime(Time)
                //音频初始进度
                let changeCurrTime = that.changeTime(that.data.list0.currTime)
                let allTime = that.changeTime(Time);
                that.setData({
                    'list0.changeTime': changeTime,
                    'list0.changeCurrTime': changeCurrTime,
                    'list0.allTime': allTime,
                    'list0.Time': Time
                });
                query
                    .select('#progress0')
                    .boundingClientRect(function (rect) {
                        areaWidth0 = rect.width;
                    })
                    .exec();
                query
                    .select('.sliderContainer0')
                    .boundingClientRect(function (rect) {
                        viewWidth0 = rect.width;
                        //获取设备宽度
                        wx.getSystemInfo({
                            success: function (res) {
                                distance0 = Math.floor((res.windowWidth - viewWidth0) / 2);
                            }
                        })
                    }).exec();
            }
            // 只有两条数据
            if (res.data.length >= 2) {
                //计算音频时长
                let Time = that.timetosec(res.data[1].Audio_Time);
                let changeTime = that.changeTime(Time)
                //音频初始进度
                let changeCurrTime = that.changeTime(that.data.list1.currTime)
                let allTime = that.changeTime(Time);
                that.setData({
                    'list1.changeTime': changeTime,
                    'list1.changeCurrTime': changeCurrTime,
                    'list1.allTime': allTime,
                    'list1.Time': Time
                });
                query
                    .select('#progress1')
                    .boundingClientRect(function (rect) {
                        areaWidth1 = rect.width;
                    })
                    .exec();
                query
                    .select('.sliderContainer1')
                    .boundingClientRect(function (rect) {
                        viewWidth1 = rect.width;
                        //获取设备宽度
                        wx.getSystemInfo({
                            success: function (res) {
                                distance1 = Math.floor((res.windowWidth - viewWidth1) / 2);
                            }
                        })
                    }).exec();
            }
            // 只有三条数据
            if (res.data.length >= 3) {
                //计算音频时长
                let Time = that.timetosec(res.data[2].Audio_Time);
                let changeTime = that.changeTime(Time)
                //音频初始进度
                let changeCurrTime = that.changeTime(that.data.list2.currTime)
                let allTime = that.changeTime(Time);
                that.setData({
                    'list2.changeTime': changeTime,
                    'list2.changeCurrTime': changeCurrTime,
                    'list2.allTime': allTime,
                    'list2.Time': Time
                });
                query
                    .select('#progress2')
                    .boundingClientRect(function (rect) {
                        areaWidth2 = rect.width;
                    })
                    .exec();
                query
                    .select('.sliderContainer2')
                    .boundingClientRect(function (rect) {
                        viewWidth2 = rect.width;
                        //获取设备宽度
                        wx.getSystemInfo({
                            success: function (res) {
                                distance2 = Math.floor((res.windowWidth - viewWidth2) / 2);
                            }
                        })
                    }).exec();
            }
            // 只有四条数据
            if (res.data.length >= 4) {
                //计算音频时长
                let Time = that.timetosec(res.data[3].Audio_Time);
                let changeTime = that.changeTime(Time)
                //音频初始进度
                let changeCurrTime = that.changeTime(that.data.list3.currTime)
                let allTime = that.changeTime(Time);
                that.setData({
                    'list3.changeTime': changeTime,
                    'list3.changeCurrTime': changeCurrTime,
                    'list3.allTime': allTime,
                    'list3.Time': Time
                });
                query
                    .select('#progress3')
                    .boundingClientRect(function (rect) {
                        areaWidth3 = rect.width;
                    })
                    .exec();
                query
                    .select('.sliderContainer3')
                    .boundingClientRect(function (rect) {
                        viewWidth3 = rect.width;
                        //获取设备宽度
                        wx.getSystemInfo({
                            success: function (res) {
                                distance3 = Math.floor((res.windowWidth - viewWidth3) / 2);
                            }
                        })
                    }).exec();
            }
            // 只有五条数据
            if (res.data.length >= 5) {
                //计算音频时长
                let Time = that.timetosec(res.data[4].Audio_Time);
                let changeTime = that.changeTime(Time)
                //音频初始进度
                let changeCurrTime = that.changeTime(that.data.list4.currTime)
                let allTime = that.changeTime(Time);
                that.setData({
                    'list4.changeTime': changeTime,
                    'list4.changeCurrTime': changeCurrTime,
                    'list4.allTime': allTime,
                    'list4.Time': Time
                });
                query
                    .select('#progress4')
                    .boundingClientRect(function (rect) {
                        areaWidth4 = rect.width;
                    })
                    .exec();
                query
                    .select('.sliderContainer4')
                    .boundingClientRect(function (rect) {
                        viewWidth4 = rect.width;
                        //获取设备宽度
                        wx.getSystemInfo({
                            success: function (res) {
                                distance4 = Math.floor((res.windowWidth - viewWidth4) / 2);
                            }
                        })
                    }).exec();
            }
            // 时间数据 end //////////////////////////////////////
        });
    },
    
    //音频播放
    // bgmPlay() {
    //     let stateNum = this.data.stateNum;
    //     console.log(stateNum)
    //     var that = this;
    //     let listVal = "list" + stateNum + '.endMusic';
    //     //背景音乐信息
    //     bgm.title = "课程音频";
    //     bgm.src = zzdUrl + '/images/streammp5.ashx?source=/' + that.data.list[stateNum].Audio_Frequency;
    //     that.setData({
    //         [listVal]: true
    //     })
    // },
    //第一段音频 start ///////////////////////////////////////
    //音频播放
    bgmPlay0() {
        var that = this;
        //背景音乐信息
        bgm.title = that.data.list[0].Audio_Name;
        bgm.src = zzdUrl + '/' + that.data.list[0].Audio_Frequency;
      console.log(zzdUrl + '/' + that.data.list[0].Audio_Frequency)
        that.setData({
            'list0.endMusic': true
        })
    },
    //点击播放按钮
    play0() {
        var that = this;
        if (that.data.stateNum == 1) {
            that.pause1();
        } else if (that.data.stateNum == 2) {
            that.pause2();
        } else if (that.data.stateNum == 3) {
            that.pause3();
        } else if (that.data.stateNum == 4) {
            that.pause4();
        }
      if (bgm.src != undefined && that.data.list0.endMusic && bgm.src == zzdUrl + '/' + that.data.list[0].Audio_Frequency) {
            bgm.play()
        } else {
            that.bgmPlay0()
        }
        that.setData({
            'list0.play': true,
            stateNum: 0
        })
        that.setInterval0()
    },
    //点击暂停按钮
    pause0() {
      var that = this;
        this.setData({
          'list0.play': false,
        })
        bgm.pause()
        clearInterval(timer0);
    },
    //音频播放时间走动
    setInterval0() {
        var that = this;
        var currTime = that.data.list0.currTime;
        bgm.seek(currTime);
        var Time = that.data.list0.Time
        clearInterval(timer0);
        timer0 = null     
        timer0 = setInterval(function () {
          if (currTime < Time) {
            currTime = currTime + 1
          }
          that.setData({
            'list0.currTime': currTime
          })
          var changeCurrTime = that.changeTime(that.data.list0.currTime)
          that.setData({
            'list0.changeCurrTime': changeCurrTime
          })
          that.sports0()
        }, 1000)
      console.log('222')
    },
    //进度条和装饰物运动
    sports0() {
        var that = this;
        var percent = that.data.list0.percent;
        var currTime = that.data.list0.currTime
        console.log(currTime)
        var Time = that.data.list0.Time
        var left = that.data.list0.left
        percent = currTime / Time * 100
        left = areaWidth0 * percent / 100
        let value = left >= areaWidth0 ? areaWidth0 : left;
        this.setData({
            'list0.percent': percent + 5,
            'list0.left': value
        })
    },
    move0(e) {
      var that = this;
      if (bgm.src != undefined && that.data.list0.endMusic && bgm.src == zzdUrl + '/' + that.data.list[0].Audio_Frequency) {
            this.pause0();
            clearInterval(timer0)
            let width = e.touches[0].clientX - distance0;
            let Time = this.data.list0.Time;
            if (width > areaWidth0) {
                width = areaWidth0;
                this.setData({
                    'list0.left': width,
                    'list0.currTime': Time,
                    'list0.changeCuprrTime': this.changeTime(Time)
                })
            } else if (width <= 0) {
                width = 0;
                this.setData({
                    'list0.left': width,
                    'list0.currTime': 0,
                    'list0.changeCurrTime': this.changeTime(0)
                })
            } else {
                let time = Math.floor((width / areaWidth0) * Time)
                this.setData({
                    'list0.left': width,
                    'list0.currTime': time,
                    'list0.changeCurrTime': this.changeTime(time)
                })
            }
            this.sports0()
        } else {

        }
    },
    end0(e) {
        var that = this;
        if (bgm.src != undefined && that.data.list0.endMusic) {
            bgm.play()
        } else {
            that.bgmPlay0()
        }
        that.setData({
            'list0.play': true
        })
        that.setInterval0()
    },
    //第一段音频 end ///////////////////////////////////////

    //第二段音频 start ///////////////////////////////////////
    //音频播放
    bgmPlay1() {
        var that = this;
        //背景音乐信息
        bgm.title = that.data.list[1].Audio_Name;
        bgm.src = zzdUrl + '/' + that.data.list[1].Audio_Frequency;
      console.log(zzdUrl + '/' + that.data.list[1].Audio_Frequency)
        that.setData({
            'list1.endMusic': true
        })
    },
    //点击播放按钮
    play1() {
        var that = this;
      console.log("play1")
        if (that.data.stateNum == 0) {
            that.pause0();
        } else if (that.data.stateNum == 2) {
            that.pause2();
        } else if (that.data.stateNum == 3) {
            that.pause3();
        } else if (that.data.stateNum == 4) {
            that.pause4();
        }
        
        
      if (bgm.src != undefined && that.data.list1.endMusic && bgm.src== zzdUrl + '/' + that.data.list[1].Audio_Frequency) {
          console.log("bgm.play")
            bgm.play()
        } else {
          console.log("jing  ru play1")
            that.bgmPlay1()
        }
        that.setData({
            'list1.play': true,
            stateNum: 1
        })
        that.setInterval1()
    },
    //点击暂停按钮
    pause1() {
        var that = this;
        this.setData({
            'list1.play': false
        })
        bgm.pause()
        clearInterval(timer1);
    },
    //音频播放时间走动
    setInterval1() {
        var that = this;
        var currTime = that.data.list1.currTime;
        bgm.seek(currTime);
        var Time = that.data.list1.Time
        clearInterval(timer1);
        timer1 = null;
        timer1 = setInterval(function () {
            if (currTime < Time) {
                currTime = currTime + 1
            }
            that.setData({
                'list1.currTime': currTime
            })
            var changeCurrTime = that.changeTime(that.data.list1.currTime)
            that.setData({
                'list1.changeCurrTime': changeCurrTime
            })
            that.sports1()
        }, 1000)
    },
    //进度条和装饰物运动
    sports1() {
        var that = this;
        var percent = that.data.list1.percent;
        var currTime = that.data.list1.currTime
        var Time = that.data.list1.Time
        var left = that.data.list1.left
        percent = currTime / Time * 100
        left = areaWidth1 * percent / 100
        let value = left >= areaWidth1 ? areaWidth1 : left;
        this.setData({
            'list1.percent': percent + 5,
            'list1.left': value
        })
    },
    move1(e) {
        console.log(e)
      var that = this;
      if (that.data.stateNum == 0) {
        that.pause0();
      } else if (that.data.stateNum == 2) {
        that.pause2();
      } else if (that.data.stateNum == 3) {
        that.pause3();
      } else if (that.data.stateNum == 4) {
        that.pause4();
      }
      if (bgm.src != undefined && that.data.list1.endMusic && bgm.src == zzdUrl + '/' + that.data.list[1].Audio_Frequency) {
        console.log("进入MOVE1")
        that.pause1();
            clearInterval(timer1)
            let width = e.touches[0].clientX - distance1;
        let Time = that.data.list1.Time;
            if (width > areaWidth1) {
                width = areaWidth1;
              that.setData({
                    'list1.left': width,
                    'list1.currTime': Time,
                'list1.changeCurrTime': that.changeTime(Time),
                stateNum:1
                })
            } else if (width <= 0) {
                width = 0;
              that.setData({
                    'list1.left': width,
                    'list1.currTime': 0,
                'list1.changeCurrTime': that.changeTime(0),
                stateNum: 1
                })
            } else {
                let time = Math.floor((width / areaWidth1) * Time)
              that.setData({
                    'list1.left': width,
                    'list1.currTime': time,
                'list1.changeCurrTime': that.changeTime(time),
                stateNum: 1
                })
            }
        that.sports1()
        } else {

        }
    },
    end1(e) {
        var that = this;
        if (bgm.src != undefined && that.data.list1.endMusic) {
            bgm.play()
        } else {
            that.bgmPlay1()
        }
        that.setData({
            'list1.play': true
        })
        that.setInterval1()
    },
    //第二段音频 end ///////////////////////////////////////

    //第三段音频 start ///////////////////////////////////////
    //音频播放
    bgmPlay2() {
        var that = this;
        //背景音乐信息
        bgm.title = that.data.list[2].Audio_Name;
        bgm.src = zzdUrl + '/' + that.data.list[2].Audio_Frequency;
        that.setData({
            'list2.endMusic': true
        })
    },
    //点击播放按钮
    play2() {
        var that = this;
        if (that.data.stateNum == 0) {
            that.pause0();
        } else if (that.data.stateNum == 1) {
            that.pause1();
        } else if (that.data.stateNum == 3) {
            that.pause3();
        } else if (that.data.stateNum == 4) {
            that.pause4();
        }
      if (bgm.src != undefined && that.data.list2.endMusic && bgm.src == zzdUrl + '/' + that.data.list[2].Audio_Frequency) {
            bgm.play()
        } else {
            that.bgmPlay2()
        }
        that.setData({
            'list2.play': true,
            stateNum: 2
        })
        that.setInterval2()
    },
    //点击暂停按钮
    pause2() {
        var that = this;
        this.setData({
            'list2.play': false
        })
        bgm.pause()
        clearInterval(timer2);
    },
    //音频播放时间走动
    setInterval2() {
        var that = this;
        var currTime = that.data.list2.currTime;
        bgm.seek(currTime);
        var Time = that.data.list2.Time
        clearInterval(timer2);
        timer2 = null;
        timer2 = setInterval(function () {
            if (currTime < Time) {
                currTime = currTime + 1
            }
            that.setData({
                'list2.currTime': currTime
            })
            var changeCurrTime = that.changeTime(that.data.list2.currTime)
            that.setData({
                'list2.changeCurrTime': changeCurrTime
            })
            that.sports2()
        }, 1000)
    },
    //进度条和装饰物运动
    sports2() {
        var that = this;
        var percent = that.data.list2.percent;
        var currTime = that.data.list2.currTime
        var Time = that.data.list2.Time
        var left = that.data.list2.left
        percent = currTime / Time * 100
        left = areaWidth2 * percent / 100
        let value = left >= areaWidth2 ? areaWidth2 : left;
        this.setData({
            'list2.percent': percent + 5,
            'list2.left': value
        })
    },
    move2(e) {
      var that = this;
      if (that.data.stateNum == 0) {
        that.pause0();
      } else if (that.data.stateNum == 1) {
        that.pause1();
      } else if (that.data.stateNum == 3) {
        that.pause3();
      } else if (that.data.stateNum == 4) {
        that.pause4();
      }
      if (bgm.src != undefined && that.data.list2.endMusic && bgm.src == zzdUrl + '/' + that.data.list[2].Audio_Frequency) {
        console.log("进入MOVE2")
        that.pause2();
            clearInterval(timer2)
            let width = e.touches[0].clientX - distance2;
        let Time = that.data.list2.Time;
            if (width > areaWidth2) {
                width = areaWidth2;
              that.setData({
                    'list2.left': width,
                    'list2.currTime': Time,
                'list2.changeCurrTime': that.changeTime(Time),
                stateNum: 2
                })
            } else if (width <= 0) {
                width = 0;
              that.setData({
                    'list2.left': width,
                    'list2.currTime': 0,
                'list2.changeCurrTime': that.changeTime(0),
                stateNum: 2
                })
            } else {
                let time = Math.floor((width / areaWidth2) * Time)
              that.setData({
                    'list2.left': width,
                    'list2.currTime': time,
                'list2.changeCurrTime': that.changeTime(time),
                stateNum: 2
                })
            }
        that.sports2()
        } else {

        }
    },
    end2(e) {
        var that = this;
        if (bgm.src != undefined && that.data.list2.endMusic) {
            bgm.play()
        } else {
            that.bgmPlay2()
        }
        that.setData({
            'list2.play': true
        })
        that.setInterval2()
    },
    //第三段音频 end ///////////////////////////////////////

    //第四段音频 start ///////////////////////////////////////
    //音频播放
    bgmPlay3() {
        var that = this;
        //背景音乐信息
        bgm.title = that.data.list[3].Audio_Name;
        bgm.src = zzdUrl + '/' + that.data.list[3].Audio_Frequency;
        that.setData({
            'list3.endMusic': true
        })
    },
    //点击播放按钮
    play3() {
        var that = this;
        if (that.data.stateNum == 1) {
            that.pause1();
        } else if (that.data.stateNum == 2) {
            that.pause2();
        } else if (that.data.stateNum == 0) {
            that.pause0();
        } else if (that.data.stateNum == 4) {
            that.pause4();
        }
      if (bgm.src != undefined && that.data.list3.endMusic && bgm.src == zzdUrl + '/' + that.data.list[3].Audio_Frequency) {
            bgm.play()
        } else {
            that.bgmPlay3()
        }
        that.setData({
            'list3.play': true,
            stateNum: 3
        })
        that.setInterval3()
    },
    //点击暂停按钮
    pause3() {
        var that = this;
        this.setData({
            'list3.play': false
        })
        bgm.pause()
        clearInterval(timer3);
    },
    //音频播放时间走动
    setInterval3() {
        var that = this;
        var currTime = that.data.list3.currTime;
        bgm.seek(currTime);
        var Time = that.data.list3.Time
        clearInterval(timer3);
        timer3 = null;
        timer3 = setInterval(function () {
            if (currTime < Time) {
                currTime = currTime + 1
            }
            that.setData({
                'list3.currTime': currTime
            })
            var changeCurrTime = that.changeTime(that.data.list3.currTime)
            that.setData({
                'list3.changeCurrTime': changeCurrTime
            })
            that.sports3()
        }, 1000)
    },
    //进度条和装饰物运动
    sports3() {
        var that = this;
        var percent = that.data.list3.percent;
        var currTime = that.data.list3.currTime
        var Time = that.data.list3.Time
        var left = that.data.list3.left
        percent = currTime / Time * 100
        left = areaWidth3 * percent / 100
        let value = left >= areaWidth3 ? areaWidth3 : left;
        this.setData({
            'list3.percent': percent + 5,
            'list3.left': value
        })
    },
    move3(e) {
      var that = this;
      if (bgm.src != undefined && this.data.list3.endMusic && bgm.src == zzdUrl + '/' + that.data.list[3].Audio_Frequency) {
            this.pause3();
            clearInterval(timer3)
            let width = e.touches[0].clientX - distance3;
            let Time = this.data.list3.Time;
            if (width > areaWidth3) {
                width = areaWidth3;
                this.setData({
                    'list3.left': width,
                    'list3.currTime': Time,
                    'list3.changeCurrTime': this.changeTime(Time)
                })
            } else if (width <= 0) {
                width = 0;
                this.setData({
                    'list3.left': width,
                    'list3.currTime': 0,
                    'list3.changeCurrTime': this.changeTime(0)
                })
            } else {
                let time = Math.floor((width / areaWidth3) * Time)
                this.setData({
                    'list3.left': width,
                    'list3.currTime': time,
                    'list3.changeCurrTime': this.changeTime(time)
                })
            }
            this.sports3()
        } else {

        }
    },
    end3(e) {
        var that = this;
        if (bgm.src != undefined && that.data.list3.endMusic) {
            bgm.play()
        } else {
            that.bgmPlay3()
        }
        that.setData({
            'list3.play': true
        })
        that.setInterval3()
    },
    //第四段音频 end ///////////////////////////////////////

    //第五段音频 start ///////////////////////////////////////
    //音频播放
    bgmPlay4() {
        var that = this;
        //背景音乐信息
        bgm.title = that.data.list[4].Audio_Name;
        bgm.src = zzdUrl + '/' + that.data.list[4].Audio_Frequency;
        that.setData({
            'list4.endMusic': true
        })
    },
    //点击播放按钮
    play4() {
        var that = this;
        if (that.data.stateNum == 1) {
            that.pause1();
        } else if (that.data.stateNum == 2) {
            that.pause2();
        } else if (that.data.stateNum == 3) {
            that.pause3();
        } else if (that.data.stateNum == 0) {
            that.pause0();
        }
      if (bgm.src != undefined && that.data.list4.endMusic && bgm.src == zzdUrl + '/' + that.data.list[4].Audio_Frequency) {
            bgm.play()
        } else {
            that.bgmPlay4()
        }
        that.setData({
            'list4.play': true,
            stateNum: 4
        })
        that.setInterval4()
    },
    //点击暂停按钮
    pause4() {
        var that = this;
        this.setData({
            'list4.play': false
        })
        bgm.pause()
        clearInterval(timer4);
    },
    //音频播放时间走动
    setInterval4() {
        var that = this;
        var currTime = that.data.list4.currTime;
        bgm.seek(currTime);
        var Time = that.data.list4.Time
        clearInterval(timer4);
        timer4 = null;
        timer4 = setInterval(function () {
            if (currTime < Time) {
                currTime = currTime + 1
            }
            that.setData({
                'list4.currTime': currTime
            })
            var changeCurrTime = that.changeTime(that.data.list4.currTime)
            that.setData({
                'list4.changeCurrTime': changeCurrTime
            })
            that.sports4()
        }, 1000)
    },
    //进度条和装饰物运动
    sports4() {
        var that = this;
        var percent = that.data.list4.percent;
        var currTime = that.data.list4.currTime
        var Time = that.data.list4.Time
        var left = that.data.list4.left
        percent = currTime / Time * 100
        left = areaWidth4 * percent / 100
        let value = left >= areaWidth4 ? areaWidth4 : left;
        this.setData({
            'list4.percent': percent + 5,
            'list4.left': value
        })
    },
    move4(e) {
      var that = this;
      if (bgm.src != undefined && this.data.list4.endMusic && bgm.src == zzdUrl + '/' + that.data.list[4].Audio_Frequency) {
            this.pause4();
            clearInterval(timer4)
            let width = e.touches[0].clientX - distance4;
            let Time = this.data.list4.Time;
            if (width > areaWidth4) {
                width = areaWidth4;
                this.setData({
                    'list4.left': width,
                    'list4.currTime': Time,
                    'list4.changeCurrTime': this.changeTime(Time)
                })
            } else if (width <= 0) {
                width = 0;
                this.setData({
                    'list4.left': width,
                    'list4.currTime': 0,
                    'list4.changeCurrTime': this.changeTime(0)
                })
            } else {
                let time = Math.floor((width / areaWidth4) * Time)
                this.setData({
                    'list4.left': width,
                    'list4.currTime': time,
                    'list4.changeCurrTime': this.changeTime(time)
                })
            }
            this.sports4()
        } else {

        }
    },
    end4(e) {
        var that = this;
        if (bgm.src != undefined && that.data.list4.endMusic) {
            bgm.play()
        } else {
            that.bgmPlay4()
        }
        that.setData({
            'list4.play': true
        })
        that.setInterval4()
    },
    //第五段音频 end ///////////////////////////////////////

    //时间转换格式
    changeTime(time) {
        var Hour = parseInt(time / 3600)
        var Min = parseInt((time - Hour * 3600) / 60);
        if (Min < 10) {
            Min = '0' + Min
        }
        var Seconds = parseInt(time - Hour * 3600 - Min * 60);
        if (Seconds < 10) {
            Seconds = '0' + Seconds
        }
        return time = Min + ':' + Seconds
    },
    timetosec(time) {
        var s = '';
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];
        s = Number(hour * 3600) + Number(min * 60) + Number(sec);
        return s;
    },
    onUnload: function(){
        let that = this;
        if (that.data.stateNum == 0) {
            that.pause0();
        }else if (that.data.stateNum == 1) {
            that.pause1();
        } else if (that.data.stateNum == 2) {
            that.pause2();
        } else if (that.data.stateNum == 3) {
            that.pause3();
        } else if (that.data.stateNum == 4) {
            that.pause4();
        }
    }
})