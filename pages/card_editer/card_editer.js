// pages/card_editer/card_editer.js

var upload = require('../../utils/base.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '未选择位置，请选择您的位置信息'
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
  
  },

  uploadFiles:function(){
    upload.getUploadData()
  },

  goToPhone:function(){
    wx.navigateTo({
      url: '/pages/phone/phone'
    })
  },

  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          hasLocation: true,
          latitude: res.latitude,
          longitude: res.longitude,
          address: res.address
        })
      }
    })
  },
  clearLocation: function () {
    this.setData({
      hasLocation: false,
      address: '未选择位置，请选择您的位置信息'
    })
  },

  formSubmit:function(e){
    this.pushInfo(e.detail.formId)
  },

  pushInfo: function (form_id){
    var that = this
    wx.request({
      url: 'https://dev.prichain.cn/ichain/wechat/pushTest',
      method: 'POST',
      data: {
        form_id: form_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        console.log(res)
        if (data.status == 200) {

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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})