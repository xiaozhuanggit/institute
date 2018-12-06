// pages/classmate/classmate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classMateList:null,
    non: {
      non_icon: '/images/non_classmate.png',
      non_tip: '暂无同学'
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

    that.getClassMateList(1,10)
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

  getClassMateList: function (page,count){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/getClassmateList',
      method: 'GET',
      data: {
        count: count || 10,
        page: page || 1,
        user_no: that.data.userInfo.userNo
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var classMateList = data.context;
          for (var i = 0; i < classMateList.length;i++){
            classMateList[i].photo_url = classMateList[i].photo_url ? classMateList[i].photo_url.replace(/_/g, '/') : '/images/default_head.png'
          }
          
          that.setData({
            classMateList: classMateList
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
    this.getClassMateList(Math.ceil(this.data.classMateList.length/10)+1, 10)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})