// pages/credit/credit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    walletInfo: null,
    studyInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var userInfo = wx.getStorageSync('userInfo')
    userInfo.photoUrl = userInfo.photoUrl ? userInfo.photoUrl.replace(/_/g, '/') : ''
    this.setData({
      userInfo: userInfo
    })
    this.getUserWallet()
    this.getStudyInfo()
  },

  goToRule: function () {
    wx.navigateTo({
      url: '/pages/rule/rule'
    })
  },

  getStudyInfo: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/getStudyInfo',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          that.setData({
            studyInfo: data.context
          })
        }
      }
    })
  },
  getUserWallet: function () {
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/getUsrWallet',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          that.setData({
            walletInfo: data.context
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