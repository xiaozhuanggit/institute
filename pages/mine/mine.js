// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    walletInfo:null,
    studyInfo:null
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

  goToPerson: function () {
    wx.navigateTo({
      url: '/pages/person/person'
    })
  },

  goToCredit: function () {
    wx.navigateTo({
      url: '/pages/credit/credit'
    })
  },

  goToClassmate: function () {
    wx.navigateTo({
      url: '/pages/classmate/classmate'
    })
  },

  goToCollection: function () {
    wx.navigateTo({
      url: '/pages/collection/collection'
    })
  },

  goToRecord: function () {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },
  goToLiveOrder: function () {
    wx.navigateTo({
      url: '/pages/live_order/live_order'
    })
  },

  goToPayCourse: function () {
    wx.navigateTo({
      url: '/pages/pay_course/pay_course'
    })
  },

  goToShopping:function(){
    wx.navigateTo({
      url: '/pages/shopping/shopping'
    })
  },
  goToTopicList: function () {
    wx.navigateTo({
      url: '/pages/topic_list/topic_list'
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
  getUserWallet:function(){
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
            walletInfo:data.context
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