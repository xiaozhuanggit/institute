// pages/binding/binding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unionid:'',
    openid:'',
    userInfo:null,
    phone:'',
    code:'',
    getInfo: '获取验证码',
    repeat: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      unionid: options.unionid,
      openid: options.openid
    })

    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          userInfo: userInfo
        })
      }
    })
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

  countDown: function (_this, times) {
    var countdowm = times
    var timer = setInterval(function () {
      countdowm--;
      _this.setData({
        getInfo: '重新获取（' + countdowm + 's）',
        repeat: true
      })
      if (countdowm == 0 || countdowm < 0) {
        clearInterval(timer);
        _this.setData({
          getInfo: '获取验证码',
          repeat: false
        })
      }
    }, 1000)
  },
  entryPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  entryCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {
    var that = this
    var phone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;   //手机号码

    if (that.data.phone == '' || !phone.test(that.data.phone)) {
      var tipTxt = '';
      if (that.data.phone == '') {
        tipTxt = '请输入手机号码'
      } else if (!phone.test(that.data.phone)) {
        tipTxt = '请输入正确手机格式'
      }

      wx.showToast({
        title: tipTxt,
        icon: 'success',
        image: '/images/fail.png',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000);

      return
    }

    that.countDown(this, 60)
    wx.request({
      url: getApp().globalData.ringUrl + '/api/register/sms', //仅为示例，并非真实的接口地址
      data: {
        phone: that.data.phone
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        
      }
    })
  },

  bindPhone:function(){
    console.log(123456789)
    var that=this,
    openinfo = that.data.userInfo
    openinfo.unionid = that.data.unionid
    openinfo.openid = that.data.openid
    openinfo.nickName = encodeURI(openinfo.nickName)
    console.log(openinfo)
    wx.request({
      url: getApp().globalData.ringUrl + '/api/register',
      method: 'POST',
      data: {
        code:that.data.code,
        openinfo: JSON.stringify(openinfo),
        phone: that.data.phone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        console.log(987654321)
        if (res.data.status == 200) {
          
          //个人信息和设备信息一同缓存到本地
          wx.getSystemInfo({
            success: function (res) {

              openinfo.windowWidth = res.windowWidth;
              openinfo.windowHeight = res.windowHeight;
              wx.setStorageSync('userInfo', openinfo)
              wx.redirectTo({
                url: '../home/home'
              })

            }
          })

        }

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
  
  }
})