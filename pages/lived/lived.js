// pages/lived/lived.js

var calcStringWidch = require('../../utils/base.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    channel_id: '',
    livedInfo:null,
    userInfo: null,
    currentVideo: '',
    showVideo:false,
    currentTab: 1,
    c_open_more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userInfo = wx.getStorageSync('userInfo')

    var link = decodeURIComponent(options.q) || '';
    var params = link.split('$');

    this.setData({
      userInfo: userInfo,
      channel_id: options.channel_id || params[1]
    })
    this.getLivedInfo()
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

  switchTabs: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
  },

  getFontWidth: function () {
    var that = this
    var strFontSize = (parseInt(that.data.userInfo.windowWidth) / 750) * 26
    var row = (parseInt(that.data.userInfo.windowWidth) / 750) * (750 - 60)
    var showFont = calcStringWidch.calcStringWidch((that.data.livedInfo.channelAbout || ''), strFontSize)
    if (showFont > row * 3) {
      that.setData({
        showMore: true
      })
    }
  },

  showMoreFont: function () {
    this.setData({
      c_open_more: true
    })
  },
  hideMoreFont: function () {
    this.setData({
      c_open_more: false
    })
  },



  getLivedInfo:function(){
    var that = this
    
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/channel/getChannelInfo',
      method: 'GET',
      data: {
        channel_id: that.data.channel_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        
        if (data.status == 200) {
          
          that.setData({
            currentVideo:data.context.rtmpPullUrl,
            showVideo: (data.context.type == 2 ? true : false),
            livedInfo:data.context
          })

          that.getFontWidth()

          if (data.context.type==2){
            that.getVodUrl(data.context)
          }

        }
      }
    })
  },

  getVodUrl: function (livedInfo) {
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/aliVod/getAliVodInfo',
      method: 'GET',
      data: {
        vod_id: livedInfo.channelVideo.replace('ALIVOD://', '')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var playURL = data.context.playURL;
          that.setData({
            currentVideo: playURL
          })

          that.getFontWidth()

        }
      }
    })
  },


  pageToTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
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