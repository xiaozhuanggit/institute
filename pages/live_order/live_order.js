// pages/live_order/live_order.js
var courseList = require('../../template/template.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    courseList: null,
    non: {
      non_icon: '/images/non_course.png',
      non_tip: '暂无直播预约'
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
    courseList.liveOrderList(this, {
      type: 1,
      count: 10,
      page: 1,
      user_no: userInfo.userNo
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

  goToPage: function (e) {
    var course_id = e.currentTarget.dataset.id
    var path = '/pages/course_detail/course_detail?course_id=' + course_id
    courseList.goToPage(path)
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
    var that=this
    courseList.liveOrderList(this, {
      type: 1,
      count: 10,
      page: Math.ceil(this.data.courseList.length / 10) + 1,
      user_no: that.data.userInfo.userNo
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})