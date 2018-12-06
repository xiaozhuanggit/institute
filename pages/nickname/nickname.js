// pages/nickname/nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      nickname: userInfo.nickname
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

  getNickname:function(e){
    this.setData({
      nickname:e.detail.value
    })
  },

  clearNickname:function(){
    this.setData({
      nickname: ''
    })
  },

  saveUserInfo: function () {
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/user/' + that.data.userInfo.userNo + '/updateuser',
      method: 'POST',
      data: {
        nickname: encodeURI(that.data.nickname)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var userInfo = that.data.userInfo
          userInfo.nickname = that.data.nickname
          wx.setStorageSync('userInfo', userInfo)
          wx.redirectTo({
            url: '/pages/person/person'
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