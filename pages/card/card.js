// pages/card/card.js
var qrCode=require('../../utils/draw_code.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanvasImg:'',
    windowWidth:'',
    windowHeight:'',
    userInfo:{
      photo:'/images/a1.jpg',
      nickName:'ABC',
      phone:12345678912
    },
    qrCode:'/images/a1.jpg',
    upImgs:[
      {
        imgUrl:'/images/a1.jpg'
      }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qrCode.getCanvasInfo(this)
    qrCode.draw(this)
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

  buildQrCode:function(){
    var that=this
    qrCode.canvasToImg(that, that.showQrCode)
  },

  showQrCode:function(){
    var that=this
    wx.previewImage({
      urls: [that.data.scanvasImg] // 需要预览的图片http链接列表
    })
  },

  goToCardEditer:function(){
    wx.navigateTo({
      url: '/pages/card_editer/card_editer'
    })
  },

  goToMailList:function(){
    wx.navigateTo({
      url: '/pages/mailList/mailList'
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
  onShareAppMessage: function (res) {
    var that=this
    return {
      title: '智通名片',
      path: '/pages/card/card?card_id=' + that.data.card_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})