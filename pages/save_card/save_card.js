// pages/save_card/save_card.js

var drawCard = require('../../utils/share_card.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    course_id:'',
    courseInfo:null,
    current:0,
    scanvasImg:'',
    showSave:false,
    cardContent:{
      head: '/images/bc1@2x.jpg',
      nickname: '赢在顶层设计之产品创新设计赢在顶层设计',
      product: '/images/bc2@2x.jpg',
      productTitle: '赢在顶层设计之产品创新设计赢在顶层设计',
      qrCode: '/images/bc2@2x.jpg'

    },
    cardType:[
      {
        bcUrl: '/images/bc1@2x.jpg',
        head: {
          width: 72,
          height: 72,
          x: 254,
          y: 220
        },
        nickname: {
          size: 20,
          width: 120,
          x: 0,
          y: 312,
          color: '#333333'
        },
        
        productTitle: {
          size: 30,
          width: 400,
          x: 0,
          y: 558,
          color: '#333333'
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 234,
          y: 652
        },
        line: {
          has: true,
          startX: 84,
          startY: 785,
          endX: 494,
          endY: 785,
          color: '#bcbcbc'
        },
        codeTxt: {
          txt: '长按识别二维码进入课程',
          size: 20,
          x: 0,
          y: 772,
          color: '#333333'
        }
      },
      {
        bcUrl: '/images/bc2@2x.jpg',
        head: {
          width: 72,
          height: 72,
          x: 254,
          y: 196
        },
        nickname: {
          size: 20,
          width: 120,
          x: 0,
          y: 288,
          color: '#fff'
        },
        
        productTitle: {
          size: 30,
          width: 400,
          x: 0,
          y: 436,
          color: '#fff'
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 234,
          y: 632
        },
        line: {
          has: false,
          startX: 84,
          startY: 785,
          endX: 494,
          endY: 785,
          color: '#bcbcbc'
        },
        codeTxt: {
          txt: '长按识别二维码进入课程',
          size: 20,
          x: 0,
          y: 752,
          color: '#fff'
        }
      },
      {
        bcUrl: '/images/bc3@2x.jpg',
        head: {
          width: 72,
          height: 72,
          x: 124,
          y: 520
        },
        nickname: {
          size: 20,
          width: 120,
          x: 214,
          y: 540,
          color: '#333'
        },
        product: {
          has: true,
          width: 280,
          height: 176,
          x: 150,
          y: 218
        },
        productTitle: {
          size: 30,
          width: 400,
          x: 0,
          y: 404,
          color: '#333'
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 234,
          y: 632
        },
        line: {
          has: false,
          startX: 84,
          startY: 785,
          endX: 494,
          endY: 785,
          color: '#bcbcbc'
        },
        codeTxt: {
          txt: '长按识别二维码进入课程',
          size: 20,
          x: 0,
          y: 752,
          color: '#fff'
        }
      },
      {
        bcUrl: '/images/bc4@2x.jpg',
        head: {
          width: 72,
          height: 72,
          x: 30,
          y: 656
        },
        nickname: {
          newline:true,
          size: 20,
          width: 120,
          x: 122,
          y: 662,
          color: '#333'
        },
        product: {
          has: true,
          width: 280,
          height: 176,
          x: 150,
          y: 44
        },
        productTitle: {
          size: 30,
          width: 400,
          x: 0,
          y: 240,
          color: '#333'
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 404,
          y: 622
        },
        line: {
          has: false,
          startX: 84,
          startY: 785,
          endX: 494,
          endY: 785,
          color: '#bcbcbc'
        },
        codeTxt: {
          txt: '长按识别二维码进入课程',
          size: 20,
          x: 345,
          y: 742,
          color: '#666'
        }
      },
      {
        bcUrl: '/images/bc5@2x.jpg',
        head: {
          width: 72,
          height: 72,
          x: 436,
          y: 80
        },
        nickname: {
          newline: false,
          size: 20,
          width: 120,
          x: 70,
          y: 100,
          color: '#333'
        },
        product: {
          has: true,
          width: 280,
          height: 176,
          x: 150,
          y: 226
        },
        productTitle: {
          size: 30,
          width: 400,
          x: 0,
          y: 422,
          color: '#333'
        },
        qrCode: {
          width: 110,
          height: 110,
          x: 234,
          y: 602
        },
        line: {
          has: true,
          startX: 84,
          startY: 736,
          endX: 494,
          endY: 736,
          color: '#bcbcbc'
        },
        codeTxt: {
          txt: '长按识别二维码进入课程',
          size: 20,
          x: 0,
          y: 722,
          color: '#666'
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    var that=this
    this.setData({
      userInfo: userInfo,
      course_id: options.course_id
    })

    var qrCode = getApp().globalData.configUrl + '/ichain/public/dimensional?json=' + encodeURI('https://shop.prichain.cn/scape?scape=2$' + options.course_id)

    
    wx.downloadFile({
      url: qrCode,
      success: function (res) {
        if (res.statusCode === 200) {
          var cardContent = that.data.cardContent
          cardContent.qrCode = res.tempFilePath
          that.setData({
            cardContent: cardContent
          })
        }
      }
    })
    


    wx.downloadFile({
      url: userInfo.photoUrl,
      success: function (res) {
        if (res.statusCode === 200) {
          var cardContent = that.data.cardContent
          cardContent.head = res.tempFilePath
          //cardContent.qrCode = qrCode
          that.setData({
            cardContent: cardContent
          })
          that.getCourseInfo()
        }
      }
    })

    //this.getCourseInfo()

    //drawCard.drawCard(this, this.data.cardType[0], this.data.cardContent)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  getCourseInfo: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getCourseInfo',
      method: 'GET',
      data: {
        course_id: that.data.course_id,
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var courseInfo = data.context;
          var product = courseInfo.courseImage ? getApp().globalData.uploadUrl+ courseInfo.courseImage.replace(/_/g,'/'):''
          var cardContent={
            head: that.data.cardContent.head,
            nickname: that.data.userInfo.nickname,
            product: product,
            productTitle: courseInfo.courseTitle,
            qrCode: that.data.cardContent.qrCode
          }
          
          that.setData({
            courseInfo: courseInfo,
            cardContent: cardContent
          })

          wx.downloadFile({
            url: product,
            success: function (res) {
              if (res.statusCode === 200) {
                var cardContent = that.data.cardContent
                cardContent.product = res.tempFilePath
                that.setData({
                  cardContent: cardContent
                })
                drawCard.drawCard(that, that.data.cardType[0], cardContent)
              }
            }
          })
          
          
          
        }
      }
    })
  },


  selectCard:function(e){
    var that=this
    var id=e.currentTarget.dataset.id

    drawCard.drawCard(that, that.data.cardType[id], that.data.cardContent)

    that.setData({
      current:id
    })
  },


  saveImg:function(){
    var that=this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.scanvasImg,
      success(res) {
        that.setData({
          showSave:true
        })
        setTimeout(function(){
          that.setData({
            showSave: false
          })
        },3000)
      },
      fail:function(res){
        
        wx.openSetting({
          success: (res) => {
            console.log(res, 2)
          }
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})