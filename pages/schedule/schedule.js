// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    channelList:[],
    non: {
      non_icon: '/images/non_course.png',
      non_tip: '暂无课程'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    this.getChannelList()
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

  goToCourseDetail: function (e) {
    var course_id = e.currentTarget.dataset.id
    var path = '/pages/course_detail/course_detail?course_id=' + course_id
    wx.navigateTo({
      url: path
    })
  },

  goToLived: function (e) {
    var channel_id = e.currentTarget.dataset.id
    var path = '/pages/lived/lived?channel_id=' + channel_id
    wx.navigateTo({
      url: path
    })
  },

  getChannelList:function(){
    var that=this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/channel/getChannelList',
      method: 'GET',
      data: {
        onlyWatch:1,
        user_no: that.data.userInfo.userNo,
        count:10,
        page: Math.ceil(that.data.channelList.length / 10) + 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var _channelList = []
          _channelList = that.data.channelList || []
          var channelList = res.data.context
          
          for (var i = 0; i < channelList.length; i++) {
            var startTime = new Date(channelList[i].startTime)
            var month = startTime.getMonth()+1
            var day = startTime.getDate();
            var hour = startTime.getHours();
            var minute = startTime.getMinutes();
            channelList[i]['startTime'] = month + '月' + day + '日' + ' ' + (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute)
            channelList[i]['channelImage'] = channelList[i]['channelImage'] ? (getApp().globalData.uploadUrl + channelList[i]['channelImage'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '';

            _channelList.push(channelList[i])
          }

          that.setData({
            channelList: _channelList
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
    this.getChannelList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})