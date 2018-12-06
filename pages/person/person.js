// pages/person/person.js

var upload = require('../../utils/base.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    uploadUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      uploadUrl: userInfo.photoUrl
    })
    this.getUsersInfo()
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

  uploadFiles: function () {
    upload.getUploadData(this, this.saveUserInfo)
  },

  goToNickname: function () {
    wx.navigateTo({
      url: '/pages/nickname/nickname'
    })
  },

  goToAddress:function(){
    wx.navigateTo({
      url: '/pages/manage_address/manage_address'
    })
  },

  getUsersInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/ichaintvGetUserByPhone',
      method: 'GET',
      data: {
        username: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var userInfo = data.context;
          userInfo.photoUrl = userInfo.photoUrl ? userInfo.photoUrl.replace(/_/g,'/'):''

          that.setData({
            userInfo: userInfo,
            uploadUrl: userInfo.photoUrl
          })

        }
      }
    })
  },

  saveUserInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/user/' + that.data.userInfo.userNo+'/updateuser',
      method: 'POST',
      data: {
        photo_url: that.data.uploadUrl
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var userInfo = that.data.userInfo
          userInfo.photoUrl = that.data.uploadUrl
          wx.setStorageSync('userInfo', userInfo)
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