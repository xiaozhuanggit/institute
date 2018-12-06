// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList:[],
    non: {
      non_icon: '/images/non_course.png',
      non_tip: '暂无历史纪录'
    }
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
    var that = this
    wx.getStorage({
      key: 'courseList',
      success: function (res) {
        console.log(res)
        var courseList = res.data
        for (var i = 0; i < courseList.length; i++) {
          courseList[i]['currentTime'] = Math.floor(courseList[i]['currentTime'])
        }

        that.setData({
          courseList: courseList
        })
      }
    })
  },

  goToRecord: function (e) {
    var course_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/course_detail/course_detail?course_id=' + course_id
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