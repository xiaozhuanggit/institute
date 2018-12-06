// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],
    non: {
      non_icon: '/images/non_collection.png',
      non_tip:'暂无收藏'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
    })
    that.getCollectionList()
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

  lookBack:function(e){
    var course_id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/course_detail/course_detail?course_id=' + course_id
    })
  },

  getCollectionList:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getCourseCollectList',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo,
        count:10,
        page: Math.ceil(that.data.collectionList.length / 10) + 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var collectionList = data.context;
          for (var i = 0; i < collectionList.length; i++) {
            collectionList[i].course_image = collectionList[i].course_image ? getApp().globalData.uploadUrl + collectionList[i].course_image.replace(/_/g, '/') : ''
          }

          that.setData({
            collectionList: collectionList
          })

        }
      }
    })
  },

  saveCancel:function(e){
    var course_id = e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/courseCollect',
      method: 'POST',
      data: {
        course_id: course_id,
        is_collect:0,
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var collectionList = that.data.collectionList
          for (var i = 0; i < collectionList.length;i++){
            if (collectionList[i]['course_id'] == course_id){
              collectionList.splice(i,1)
            }
          }
          
          that.setData({
            collectionList: collectionList
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
    this.getCollectionList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})