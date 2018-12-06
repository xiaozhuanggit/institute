// pages/home/home.js

var courseList = require('../../template/template.js')
//var rong = require('../../libs/rongImLib.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    current_icon:0,
    themeList:null,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo:null,
    courseList:null,
    myCollege:null,
    collegeCourseList:null,
    commonCollege:null,
    collegeCourse:[],
    collegeList:[],
    brandCollege:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })

    courseList.getCourseList(this, {
      user_no: this.data.userInfo.userNo,
      count: 5,
      page: 1
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
    var that=this
    /*
    courseList.getCourseList(this, {
      user_no: that.data.userInfo.userNo,
      count: 5,
      page: 1
    })
    */
    this.getThemeList()
    //this.myCollegeInfo()
    //this.commonCollegeInfo()
    this.getCollegeList(1)
    this.getCollegeList(0)
    this.getVipCollegeList()
  },

  getCurrent:function(e){
    /*
    this.setData({
      current:e.detail.current
    })
    */
    this.setData({
      current_icon: e.detail.current
    })
    
  },
  goToPage:function(e){
    var course_id=e.currentTarget.dataset.id

    var path = '/pages/course_detail/course_detail?course_id=' + course_id
    courseList.goToPage(path)
  },

  goToThemeCourse: function (e) {
    var theme_id = e.currentTarget.dataset.id
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '/pages/theme_course/theme_course?theme_id=' + theme_id + '&title=' + title
    })
  },

  goToCourse: function (e) {
    var course_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/course/course'
    })
  },

  goToCollegeCourse: function (e) {
    var college_id = e.currentTarget.dataset.id
    var user_no = e.currentTarget.dataset.no
    wx.navigateTo({
      url: '/pages/course/course?college_id=' + college_id + '&user_no=' + user_no
    })
  },

  getThemeList:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getThemeList',
      method: 'GET',
      data: {
        is_hot:1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var themeList = data.context;
          var imgUrls=[];
            themeList.splice(0,0,{
              theme_id:'',
              theme_title:'全部主题'
            })
            for (var i = 0; i < themeList.length;i++){
              themeList[i].theme_image = themeList[i].theme_image ? (getApp().globalData.uploadUrl + themeList[i].theme_image.replace(/_/g, '/') + '?x-oss-process=image/resize,w_400'):''
              if (themeList[i].theme_image && imgUrls.length<5){
                imgUrls.push(themeList[i])
              }
            }
            
            that.setData({
              themeList: themeList,
              imgUrls: imgUrls
            })      

        }
      }
    })
  },

  myCollegeInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/college/getMyCollege',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var myCollege = data.context;
          if (myCollege.length!=0){
            myCollege[0].college_image = myCollege[0].college_image ? (getApp().globalData.uploadUrl + myCollege[0].college_image.replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : ''
          }
         
          that.setData({
            myCollege: myCollege.length > 0 ? myCollege[0] : 0
          })

        }
      }
    })
  },
  commonCollegeInfo: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/college/getMyCollege',
      method: 'GET',
      data: {
        user_no: 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var commonCollege = data.context;
          if (commonCollege.length != 0) {
            commonCollege[0].college_image = commonCollege[0].college_image ? (getApp().globalData.uploadUrl + commonCollege[0].college_image.replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : ''
          }

          that.setData({
            commonCollege: commonCollege.length>0?commonCollege[0]:0
          })

          that.collegeCourse();

        }
      }
    })
  },

  collegeCourse:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getCourseListByUserNo',
      method: 'GET',
      data: {
        college_id: that.data.commonCollege.college_id,
        count: 2,
        page:1,
        user_no: 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var collegeCourse = data.context;
          for (var i = 0; i < collegeCourse.length;i++){
            collegeCourse[i].course_image = collegeCourse[i].course_image ? (getApp().globalData.uploadUrl + collegeCourse[i].course_image.replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : ''
          }

          that.setData({
            collegeCourse: collegeCourse
          })

        }
      }
    })
  },


  getVipCollegeList:function(){
    var that = this
    wx.request({
      url: 'https://dev.prichain.cn/ichain/college/getVipCollegeList',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var collegeCourseList= data.context;
          for(var i = 0; i < collegeCourseList.length;i++){
            
            collegeCourseList[i]['college_image'] = collegeCourseList[i]['college_image'] ? (getApp().globalData.uploadUrl + collegeCourseList[i]['college_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '';

            if (collegeCourseList[i]['courseList'].length>0){
              for (var k = 0; k < collegeCourseList[i]['courseList'].length; k++) {
                collegeCourseList[i]['courseList'][k]['course_image'] = collegeCourseList[i]['courseList'][k]['course_image'] ? (getApp().globalData.uploadUrl + collegeCourseList[i]['courseList'][k]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '';


              }
              
            }
            

          }
          
          that.setData({
            collegeCourseList: collegeCourseList
          }) 

        }
      }
    })
  },

  getCollegeList: function (is_system){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/college/getCollegeListByUserNo',
      method: 'GET',
      data: {
        is_my: 0,
        is_system: is_system,
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var collegeList = data.context;
          for (var i = 0; i < collegeList.length; i++) {
            collegeList[i].college_image = collegeList[i].college_image ? (getApp().globalData.uploadUrl + collegeList[i].college_image.replace(/_/g, '/') + '?x-oss-process=image/resize,w_400/circle,r_400') : ''
          }

          var _collegeList = [];
          _collegeList=_collegeList.concat(collegeList)
          if (is_system==0){
            that.setData({
              collegeList: _collegeList
            })
          }else{
            that.setData({
              brandCollege: _collegeList
            })
          }
          

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
    console.log(123)
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