// pages/bind_loading/bind_loading.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pushInfo:null,
    token:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var link = decodeURIComponent(options.q) || '';
    var params = link.split('$');

    this.setData({
      token: params[1]
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

    setTimeout(function(){
      var pushInfo = wx.getStorageSync('pushInfo')
      pushInfo.token = that.data.token
      wx.setStorageSync('pushInfo', pushInfo)
      console.log(pushInfo, 9999999)
      if (pushInfo.userNo) {
        wx.redirectTo({
          url: '../sure_login/sure_login'
        })
      } else {
        wx.redirectTo({
          url: '../bind_phone/bind_phone?unionid=' + pushInfo.unionid + '&openid=' + pushInfo.openid
        })
      }
    },1000)

    
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
  
  }
})