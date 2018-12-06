

function getCourseList(that,datas){
  wx.request({
    url: getApp().globalData.configUrl + '/ichain/course/getCourseLikeList',
    method: 'GET',
    data: {
      user_no: datas.user_no,
      count: datas.count || 10,
      page: datas.page || 1
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var _courseList=[]
        _courseList = that.data.courseList || []
        var courseList = res.data.context 
        for (var i = 0; i < courseList.length;i++){
          courseList[i]['course_image'] = courseList[i]['course_image'] ? (getApp().globalData.uploadUrl + courseList[i]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '/images/default_bc.png';
          _courseList.push(courseList[i])
        }

        that.setData({
          courseList: _courseList
        })
      }
    }
  })
}

function getBuyCourseList(that, datas) {
  wx.request({
    url: getApp().globalData.configUrl + '/ichain/user/getCourseListByBuy',
    method: 'GET',
    data: datas,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var _courseList = []
        _courseList = that.data.courseList || []
        var courseList = res.data.context
        for (var i = 0; i < courseList.length; i++) {
          courseList[i]['course_image'] = courseList[i]['course_image'] ? (getApp().globalData.uploadUrl + courseList[i]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '/images/default_bc.png';
          _courseList.push(courseList[i])
        }

        that.setData({
          courseList: _courseList
        })
      }
    }
  })
}

function getCourseListByUserNo(that, datas) {
  wx.request({
    url: getApp().globalData.configUrl + '/ichain/course/getCourseListByUserNo',
    method: 'GET',
    data: datas,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var _courseList = []
        _courseList = that.data.reCourseList || []
        var courseList = res.data.context
        for (var i = 0; i < courseList.length; i++) {
          courseList[i]['course_image'] = courseList[i]['course_image'] ? (getApp().globalData.uploadUrl + courseList[i]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '/images/default_bc.png';
          _courseList.push(courseList[i])
        }

        that.setData({
          reCourseList: _courseList
        })
      }
    }
  })
}

function getCourseInfoList(that, datas) {
  wx.request({
    url: getApp().globalData.configUrl + '/ichain/course/getCourseList',
    method: 'GET',
    data: datas,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var _courseList = []
        _courseList = that.data.courseList || []
        var courseList = res.data.context
        for (var i = 0; i < courseList.length; i++) {
          courseList[i]['course_image'] = courseList[i]['course_image'] ? (getApp().globalData.uploadUrl + courseList[i]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '/images/default_bc.png';
          _courseList.push(courseList[i])
        }

        that.setData({
          courseList: _courseList
        })
      }
    }
  })
}


function liveOrderList(that,datas){
  wx.request({
    url: getApp().globalData.configUrl + '/ichain/course/getCourseCollectList',
    method: 'GET',
    data: datas,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var _courseList = []
        _courseList = that.data.courseList || []
        var courseList = res.data.context
        for (var i = 0; i < courseList.length; i++) {
          courseList[i]['course_image'] = courseList[i]['course_image'] ? (getApp().globalData.uploadUrl + courseList[i]['course_image'].replace(/_/g, '/') + '?x-oss-process=image/resize,w_400') : '/images/default_bc.png';
          _courseList.push(courseList[i])
        }

        that.setData({
          courseList: _courseList
        })
      }
    }
  })
}

function goToPage(path){
  wx.navigateTo({
    url: path
  })
}

module.exports={
  goToPage: goToPage,
  getCourseList: getCourseList,
  getBuyCourseList: getBuyCourseList,
  getCourseListByUserNo: getCourseListByUserNo,
  getCourseInfoList: getCourseInfoList,
  liveOrderList: liveOrderList
}