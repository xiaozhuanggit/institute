// pages/sure_login/sure_login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pushInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pushInfo = wx.getStorageSync('pushInfo')
    console.log(pushInfo,1212111222)
    pushInfo.photoUrl = pushInfo.photoUrl.replace(/_/g,'/')
    this.setData({
      pushInfo: pushInfo
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


  setPushTv: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/public/pushTv',
      method: 'POST',
      data: {
        text: that.data.pushInfo.userNo,
        title: '扫码登录',
        token: that.data.pushInfo.token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        console.log(res,123456)
        if (data.status == 200) {
          wx.redirectTo({
            url: '/pages/success/success'
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