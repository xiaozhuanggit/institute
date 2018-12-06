// pages/course/course.js

var courseList = require('../../template/template.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[1,2],
    showTag:false,
    menuCurrent:0,
    userInfo:null,
    courseList:null,
    reCourseList:[],
    college_id:'',
    userNo:'',
    non: {
      non_icon: '/images/non_course.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      college_id: options.college_id,
      userNo: options.user_no
    })
    if (options.college_id){
      courseList.getCourseListByUserNo(this, {
        college_id: that.data.college_id,
        count: 10,
        page: 1,
        user_no: that.data.userNo
      })
    }else{
      courseList.getCourseList(this, {
        user_no: userInfo.userNo,
        count: 10,
        page: 1
      })
    }
    
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

  selectMenu:function(e){
    var currentMenu = this.data.menuCurrent
    var menuCurrent=e.currentTarget.dataset.id
    this.setData({
      menuCurrent: menuCurrent,
      showTag: (currentMenu == menuCurrent && this.data.showTag)?false:true
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
    var that=this
    if (that.data.college_id){
      courseList.getCourseListByUserNo(that, {
        college_id: that.data.college_id,
        count: 10,
        page: Math.ceil(that.data.reCourseList.length / 10) + 1,
        user_no: that.data.userNo
      })
    }else{
      courseList.getCourseList(that, {
        user_no: that.data.userInfo.userNo,
        page: Math.ceil(that.data.courseList.length / 10) + 1
      })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})