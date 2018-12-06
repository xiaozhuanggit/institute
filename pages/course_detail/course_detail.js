// pages/course_detail/course_detail.js

var courseList = require('../../template/template.js')
var calcStringWidch = require('../../utils/base.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course_id:'',
    is_collect:0,
    windowWidth: '',
    windowHeight: '',
    imgUrls: [1,2,3],
    userInfo: null,
    courseList: null,
    reCourseList:null,
    courseInfo:null,
    currentVideo:'',
    channelType:1,
    duration:0,
    isPlay:false,
    currentTime:0,
    anthIndex:0,
    isLive:1,
    anthTile:'',
    anthDate:'',
    appointment:false,
    currentTab:1,
    l_showMore:false,    //讲师信息显示更多
    c_showMore: false,     //课程信息显示更多
    l_open_more: false,
    c_open_more:false,
    showTip:false,
    tipTxt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this

    var link = decodeURIComponent(options.q) || '';
    var params = link.split('$');

    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      course_id: options.course_id || params[1]
    })
    courseList.getCourseList(this, {
      user_no: userInfo.userNo,
      count: 5,
      page: 1
    })
    
    that.getCourseInfo()
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

  switchTabs:function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
  },

  playError:function(res){
    console.log(res)
  },

  goToHome:function(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  }, 
  goToSaveCard: function(e) {
    var course_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/save_card/save_card?course_id=' + course_id
    })
  },
  goToLecturerCourse: function () {
    wx.navigateTo({
      url: '/pages/lecturer_course/lecturer_course'
    })
  },
  goToLecturerRing: function () {
    wx.navigateTo({
      url: '/pages/lecturer_ring/lecturer_ring'
    })
  },
  goToRecommend: function () {
    var college_id = this.data.courseInfo.collegeId
    var course_group_id = this.data.courseInfo.courseGroupId
    wx.navigateTo({
      url: '/pages/recommend/recommend?college_id=' + college_id + '&course_group_id=' + course_group_id
    })
  },

  goToPage: function (e) {
    var course_id = e.currentTarget.dataset.id

    var path = '/pages/course_detail/course_detail?course_id=' + course_id
    courseList.goToPage(path)
  },

  getFontWidth:function(){
    var that=this
    var strFontSize = (parseInt(that.data.userInfo.windowWidth) / 750) * 26
    var row = (parseInt(that.data.userInfo.windowWidth) / 750) * (750 - 60)
    var showFont = calcStringWidch.calcStringWidch((that.data.courseInfo.courseProfile || ''), strFontSize)
    if (showFont > row * 3) {
      that.setData({
        showMore: true
      })
    }
  },

  showMoreFont:function(){
    this.setData({
      c_open_more:true
    })
  },
  hideMoreFont: function () {
    this.setData({
      c_open_more: false
    })
  },

  selectAnth:function(e){
    var index = e.currentTarget.dataset.id
    this.setData({
      anthIndex:index,
      currentVideo: this.data.courseInfo.courseType == 3 ? this.data.courseInfo.tvCourseSeriesList[index]['channelVideo'] : this.data.courseInfo.tvCourseSeriesList[index]['courseContent']
    })
  },

  selectLiveAnth: function (e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      anthIndex: index,
      anthTile: this.data.courseInfo.tvCourseSeriesList[index]['courseTitle'],
      anthDate: this.data.courseInfo.tvCourseSeriesList[index]['startTime'],
      isLive: this.data.courseInfo.tvCourseSeriesList[index]['isLive'],
      currentVideo: this.data.courseInfo.courseType == 3 && this.data.courseInfo.tvCourseSeriesList[index]['channelType'] == 2 ? this.data.courseInfo.tvCourseSeriesList[index]['channelVideo'] : this.data.courseInfo.tvCourseSeriesList[index]['rtmpPullUrl']
    })
  },

  recordPlayInfo:function(e){
    this.data.currentTime=e.detail.currentTime

  },

  clickPlayBtn:function(){
    this.setData({
      isPlay:true
    })
  },

  timeFormat:function(time){
    var date=new Date(time),
    year = date.getFullYear(),
    month=date.getMonth()+1,
    day=date.getDate(),
    hours=date.getHours(),
    minute=date.getMinutes(),
    second=date.getSeconds();
    return (month > 9 ? month : ('0' + month)) + '-' + (day > 9 ? day : ('0' + day)) + ' ' + (hours > 9 ? hours : ('0' + hours)) + ':' + (minute > 9 ? minute : ('0' + minute))
  },

  cachePlayInfo:function(){
    var that = this
    var courseInfo = that.data.courseInfo
    courseInfo.currentTime = that.data.currentTime
    courseInfo['endIndex'] = that.data.anthIndex
    if (!that.data.isPlay) return;
    wx.getStorage({
      key: 'courseList',
      success: function (res) {
        var datas = res.data
        var flag = false
        var position = 0
        for (var i = 0; i < datas.length; i++) {
          
          if (datas[i]['courseId'] === that.data.course_id) {
            flag = true;
            position = i

            if (datas[i]['seriesType']==2){
              
              datas[i]['endIndex'] = that.data.anthIndex
              datas[i]['tvCourseSeriesList'][that.data.anthIndex]['currentTime'] = that.data.currentTime
            }

          }
        }
        if (flag) {
          datas.splice(position, 1, courseInfo)
        } else {
          datas.splice(position, 0, courseInfo)
        }
        wx.setStorage({
          key: "courseList",
          data: datas
        })
      },
      fail:function(res){
        var datas=[]
        if (courseInfo['seriesType'] == 2) {
          courseInfo['endIndex'] = that.data.anthIndex
          courseInfo['tvCourseSeriesList'][that.data.anthIndex]['currentTime'] = that.data.currentTime
        }
        datas[0] = courseInfo
        wx.setStorage({
          key: "courseList",
          data: datas
        })
      }
    })
  },

  histroyData:function(){
    var that=this
    wx.getStorage({
      key: 'courseList',
      success: function (res) {
        var datas = res.data
        for(var i=0;i<datas.length;i++){
          if (datas[i]['courseId'] == that.data.course_id){
            if (datas[i]['seriesType']==2){
              that.setData({
                anthIndex:datas[i]['endIndex'],
                currentVideo: that.data.courseInfo.tvCourseSeriesList[datas[i]['endIndex']]['courseContent']
              })
            }
          }
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
  },

  imAppointment:function(e){
    var that=this;
    that.saveCollection(e.detail.formId)
    that.setData({
      appointment:true
    })
  },
  knowAppointment:function(){
    var that = this;
    that.setData({
      appointment: false
    })
  },

  liveEnd:function(){
    this.setData({
      currentVideo:''
    })
  },

  getIsLive: function (startTime,endTime,courseDuration,tp){
    var isLive = 0
    var now = new Date().getTime();
    var ctr = courseDuration?courseDuration.split(':'):[]
    var courseDuration = 0
    if (ctr.length == 3) {
      courseDuration = ctr[0] * 3600 + ctr[1] * 60 + ctr[2]
    } else if (ctr.length == 2) {
      courseDuration = ctr[0] * 60 + ctr[1]
    } else {
      courseDuration = ctr[0]
    }

    if (ctr.length != 0 && tp){
      if ((now - parseInt(startTime) / 100 > courseDuration)) {
        isLive = 0
      } else {
        isLive = (endTime < now ? 0 : startTime > now ? 2 : 1)
      }
    }else{
      isLive = (endTime < now ? 0 : startTime > now ? 2 : 1)
    }
    return isLive
  },

  getCourseInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getCourseInfo',
      method: 'GET',
      data: {
        course_id: that.data.course_id,
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var courseInfo = data.context;

          courseInfo.courseImage = courseInfo.courseImage ? (getApp().globalData.uploadUrl +courseInfo.courseImage.replace(/_/g,'/')):''

          courseList.getCourseListByUserNo(that, {
            college_id: data.context.collegeId,
            course_group_id: data.context.courseGroupId,
            user_no: that.data.userInfo.userNo,
            count: 5,
            page: 1
          })
          var isVod =0
          if (courseInfo.courseType == 3){
            isVod = courseInfo.channelVideo ? courseInfo.channelVideo.indexOf('ALIVOD://') : -1
          }else{
            isVod = courseInfo.courseContent ? courseInfo.courseContent.indexOf('ALIVOD://') : -1
          }

          if (isVod >= 0){
            if (courseInfo.courseType == 3){
              courseInfo.vod_id = courseInfo.channelVideo.replace('ALIVOD://', '')
            }else{
              courseInfo.vod_id = courseInfo.courseContent.replace('ALIVOD://', '')
            }
            
            that.getVodUrl(courseInfo)
          } else {
            var currentVideo='';
            var channelType='';
            var duration=0;
            if (courseInfo.courseType == 3){
              if (courseInfo.channelType == 2){
                currentVideo = courseInfo.channelVideo
                channelType = courseInfo.channelType
                duration = (Date.parse(new Date())-parseInt(courseInfo.startTime))/1000
              }else{
                currentVideo = courseInfo.rtmpPullUrl
              }
              
            }else{
              currentVideo = courseInfo.courseContent
            }


            that.setData({
              courseInfo: courseInfo,
              currentVideo: currentVideo,
              channelType: channelType,
              duration: duration,
              isLive: that.getIsLive(courseInfo['startTime'], courseInfo['endTime'], courseInfo['courseDuration']),
              is_collect: courseInfo.isCollect
            })
            that.getFontWidth()
            that.histroyData()

            
            if (courseInfo.seriesType == 2) {
              var now=new Date().getTime();
              if (courseInfo.courseType == 3){
                var flag=false,isLive=0;

                for (var i = 0; i < courseInfo.tvCourseSeriesList.length; i++) {
                  var channel = courseInfo.tvCourseSeriesList[i]['channelType']==2?1:0
                  courseInfo.tvCourseSeriesList[i]['isLive'] = that.getIsLive(courseInfo.tvCourseSeriesList[i]['startTime'], courseInfo.tvCourseSeriesList[i]['endTime'], courseInfo.tvCourseSeriesList[i]['courseDuration'], channel)
                  courseInfo.tvCourseSeriesList[i]['startTime'] = that.timeFormat(courseInfo.tvCourseSeriesList[i]['startTime'])
                  courseInfo.tvCourseSeriesList[i]['endTime'] = that.timeFormat(courseInfo.tvCourseSeriesList[i]['endTime'])

                  if (courseInfo.tvCourseSeriesList[i]['channelType']==2){
                    that.getTvVodUrl((courseInfo.tvCourseSeriesList[i]['channelVideo'] ? courseInfo.tvCourseSeriesList[i]['channelVideo'].replace('ALIVOD://', '') : ''), i, 3)
                  }else{
                    if(courseInfo.tvCourseSeriesList[i]['isLive']==1){
                      flag=true
                      isLive=i;                     
                    }
                  }
                                   
                  that.setData({
                    courseInfo: courseInfo
                  })   
                                                
                }

                if(flag){
                  that.setData({
                    courseInfo: courseInfo,
                    currentVideo: courseInfo.tvCourseSeriesList[isLive]['rtmpPullUrl'],
                    anthTile: courseInfo.tvCourseSeriesList[isLive]['courseTitle'],
                    anthDate: courseInfo.tvCourseSeriesList[isLive]['startTime'],
                    isLive: courseInfo.tvCourseSeriesList[isLive]['isLive']
                  })
                }else{
                  that.setData({
                    courseInfo: courseInfo,
                    currentVideo: courseInfo.tvCourseSeriesList[0]['rtmpPullUrl'],
                    anthTile: courseInfo.tvCourseSeriesList[0]['courseTitle'],
                    anthDate: courseInfo.tvCourseSeriesList[0]['startTime'],
                    isLive: courseInfo.tvCourseSeriesList[0]['isLive']
                  })
                }

                    
              }else{
                for (var i = 0; i < courseInfo.tvCourseSeriesList.length; i++) {
                  that.getTvVodUrl((courseInfo.tvCourseSeriesList[i]['courseContent'] ? courseInfo.tvCourseSeriesList[i]['courseContent'].replace('ALIVOD://', '') : ''), i)
                }
              }
              
              
            }

          } 

        }
      }
    })
  },

  getTvVodUrl: function (vod_id,index,type,channel) {
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/aliVod/getAliVodInfo',
      method: 'GET',
      data: {
        vod_id: vod_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var playURL = data.context.playURL;
          var courseInfo = that.data.courseInfo
          if(type==3){
            courseInfo.tvCourseSeriesList[index]['channelVideo'] = playURL
            
          }else{
            courseInfo.tvCourseSeriesList[index]['courseContent'] = playURL
          }

          if (index == that.data.anthIndex){
            
            var flag = false, isLive = 0;
            if (courseInfo.tvCourseSeriesList[index]['isLive'] == 1) {
              flag = true;
              isLive = index
            }


            if(type==3){
              var duration=0
              if(flag){
                duration = (Date.parse(new Date()) - parseInt(courseInfo.tvCourseSeriesList[isLive]['startTime'])) / 1000
              }else{
                duration = (Date.parse(new Date()) - parseInt(courseInfo.tvCourseSeriesList[0]['startTime'])) / 1000
              }
              that.setData({
                courseInfo: courseInfo,
                currentVideo: flag && courseInfo.tvCourseSeriesList[index]['channelType'] == 1 ? courseInfo.tvCourseSeriesList[index]['rtmpPullUrl'] : flag && courseInfo.tvCourseSeriesList[index]['channelType'] == 2 ? playURL : !flag && courseInfo.tvCourseSeriesList[index]['channelType'] == 1 ? courseInfo.tvCourseSeriesList[0]['rtmpPullUrl'] : !flag && courseInfo.tvCourseSeriesList[index]['channelType'] == 2 ? courseInfo.tvCourseSeriesList[0]['channelType']:'',
                anthTile: flag ? courseInfo.tvCourseSeriesList[isLive]['courseTitle'] : courseInfo.tvCourseSeriesList[0]['courseTitle'],
                anthDate: flag ? courseInfo.tvCourseSeriesList[isLive]['startTime'] : courseInfo.tvCourseSeriesList[0]['startTime'],
                isLive: flag ? courseInfo.tvCourseSeriesList[isLive]['isLive'] : courseInfo.tvCourseSeriesList[0]['isLive'],
                channelType: flag ? courseInfo.tvCourseSeriesList[isLive]['channelType'] : courseInfo.tvCourseSeriesList[0]['channelType'],
                duration: duration
              })
            }else{
              that.setData({
                courseInfo: courseInfo,
                currentVideo: courseInfo.tvCourseSeriesList[index]['courseContent']
              })
            }
            
            
          }else{
            that.setData({
              courseInfo: courseInfo
            })
          }

          that.getFontWidth()

        }
      }
    })
  },

  getVodUrl: function (courseInfo){
    var that = this
    wx.request({
      url: getApp().globalData.ringUrl + '/api/aliVod/getAliVodInfo',
      method: 'GET',
      data: {
        vod_id: courseInfo.vod_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var now = new Date().getTime();
          console.log(now)
          var playURL = data.context.playURL;
          //courseInfo.courseContent = playURL
          that.setData({
            courseInfo: courseInfo,
            currentVideo: playURL,
            channelType: courseInfo.channelType,
            duration :(Date.parse(new Date()) - parseInt(courseInfo.startTime)) / 1000,
            isLive: that.getIsLive(courseInfo['startTime'], courseInfo['endTime'], courseInfo['courseDuration']),
            anthTile: courseInfo.courseTitle,
            anthDate: that.timeFormat(courseInfo.startTime),
            is_collect: courseInfo.isCollect
          })

          that.getFontWidth()
          

        }
      }
    })
  },

  saveCollection: function (formId){
    var that = this
    var is_collect = 1
    if (that.data.courseInfo.courseType!=3){
      is_collect =(that.data.is_collect ? 0 : 1)
    }
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/courseCollect',
      method: 'POST',
      data: {
        is_collect: is_collect,
        course_id: that.data.course_id,
        user_no: that.data.userInfo.userNo,
        form_id: formId || null
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var tip = that.data.is_collect == 0 ? '收藏成功' : '取消收藏'       

          that.setData({
            is_collect: (that.data.is_collect ? 0 : 1),
            tipTxt: tip,
            showTip:true
          })

          setTimeout(function () {
            that.setData({
              showTip: false
            })
          }, 2000);

          
        }
      }
    })
  },


  pageToTop:function(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.cachePlayInfo()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.cachePlayInfo()
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