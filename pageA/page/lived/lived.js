// pages/nickname/nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_id:'',
    courseContent: null,
    channelList:[],
    showTime:'00:00:00',
    showList:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var link = decodeURIComponent(options.q) || '';
    var params = link.split('$');

    this.setData({
      course_id: options.course_id || params[1]
    })

    this.getLivedList()
    this.getChannelUserList()
    this.limitTime()
    
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

  getLivedList: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getCourseInfo',
      method: 'GET',
      data: {
        course_id: that.data.course_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var courseContent = res.data.context
        that.setData({
          courseContent: courseContent
        })
        setTimeout(function(){
          that.setFullScreenInfo()
        },500)
        
      }
    })
  },

  getChannelUserList:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/channel/getChannelUserList',
      method: 'GET',
      data: {
        channel_id: that.data.course_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var channelList = res.data.context

        for (var i = 0; i < channelList.length; i++) {
          channelList[i]['photoUrl'] = channelList[i]['photoUrl'] ? (channelList[i]['photoUrl'].replace(/_/g, '/')) : '';

        }
        that.setData({
          channelList: channelList
        })

      }
    })
  },

  limitTime: function () {
    var that = this
    var time = 0
    var limit = setInterval(function () {
      time++;
      var hour = Math.floor(time / 3600)
      var mintue = Math.floor(time / 60)
      var showTime = (hour > 9 ? hour : ('0' + hour)) + ':' + (mintue > 9 ? mintue : ('0' + mintue)) + ':' + ((time % 60) > 9 ? (time % 60) : ('0' + (time % 60)))
      that.setData({
        showTime: showTime
      })
    }, 1000)
  },

  goToMutual:function(){
    wx.switchTab({
      url: '/pages/mutual/mutual'
    })
  },

  showMemberList:function(){
    this.setData({
      showList: this.data.showList?false:true
    })
  },
  setFullScreenInfo:function(){
    var that=this
    var livePlayerContext = wx.createLivePlayerContext('live', that);
    livePlayerContext.requestFullScreen({
      direction:90
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