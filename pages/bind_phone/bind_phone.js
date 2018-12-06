// pages/bind_phone/bind_phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    unionid: '',
    openid: '',
    userInfo:null,
    phone:'',
    code:'',
    recode:'',
    showClear:false,
    code_tip:'获取验证码',
    repeat: false,
    show_error:false,
    tipTxt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      unionid: options.unionid,
      openid: options.openid
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

  entryPhone: function (e) {
    this.setData({
      phone: e.detail.value,
      showClear: (e.detail.value?true:false)
    })
  },

  entryCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  entryRecode: function (e) {
    this.setData({
      recode: e.detail.value
    })
  },

  clearPhone:function(){
    this.setData({
      phone: '',
      showClear: false
    })
  },

  countDown: function (_this, times) {
    var countdowm = times
    var timer = setInterval(function () {
      countdowm--;
      _this.setData({
        code_tip: '重新获取（' + countdowm + 's）',
        repeat: true
      })
      if (countdowm == 0 || countdowm < 0) {
        clearInterval(timer);
        _this.setData({
          code_tip: '获取验证码',
          repeat: false
        })
      }
    }, 1000)
  },

  getCode:function(){
    var that = this
    var phone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;   //手机号码

    if (that.data.phone == '' || !phone.test(that.data.phone)) {
      var tipTxt = '';
      if (that.data.phone == '') {
        tipTxt = '请输入手机号码'
      } else if (!phone.test(that.data.phone)) {
        tipTxt = '请输入正确手机格式'
      }

      that.setData({
        show_error: true,
        tipTxt: tipTxt
      })

      setTimeout(function () {
        that.setData({
          show_error: false,
          tipTxt: ''
        })
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


  bindGetUserInfo:function(e){
    console.log(e.detail.userInfo,123456)
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.bindPhone()
  },


  bindPhone: function () {

    var that = this,
    openinfo = that.data.userInfo;
    openinfo.unionid = that.data.unionid
    openinfo.openid = that.data.openid
    openinfo.phone = that.data.phone
    openinfo.nickName = encodeURI(openinfo.nickName)
    var _data={
      code: that.data.code,
      openinfo: JSON.stringify(openinfo),
      phone: that.data.phone
    }

    if (that.data.recode){
      _data = {
        code: that.data.code,
        openinfo: JSON.stringify(openinfo),
        phone: that.data.phone,
        recode: that.data.recode
      }
    }

    wx.request({
      url: getApp().globalData.ringUrl + '/api/register',
      method: 'POST',
      data: _data,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
           
          that.wxLogin(that.data.unionid)

        }

      }
    })
  },


  wxLogin: function (unionid){
    wx.request({
      url: getApp().globalData.ringUrl + '/api/login',
      method: 'POST',
      data: {
        loginType: 2,
        unionid: unionid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.status == 200) {
          var pushInfo = res.data.context 

          pushInfo.token = wx.getStorageSync('pushInfo').token
          wx.setStorageSync('pushInfo', pushInfo)
          console.log(pushInfo, 5555555)
          wx.redirectTo({
            url: '../sure_login/sure_login'
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})