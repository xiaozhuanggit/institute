// pages/subject/subject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:1,
    showPrev:false,
    showNext:true,
    showCont:{},
    limitTime:'5',
    showTime:'00:00:00',
    showSub:false,
    list:[
      {
        title:'测试01'
      },
      {
        title: '测试02'
      },
      {
        title: '测试03'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.limitTime()
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

  goToResult: function () {
    wx.redirectTo({
      url: '/pages/result/result'
    })
  },

  seltSingle:function(e){
    var single = e.target.dataset.id
    if (single){
      
    }
  },

  seltPrev:function(){
    var index = (this.data.index-1) || 1
     this.setData({
       index: index,
       showCont:this.data.list[index-1],
       showPrev:index==1?false:true,
       showNext:true
     })
  },

  seltNext: function () {
    var index = (this.data.index + 1) > this.data.list.length ? this.data.list.length : (this.data.index + 1)
    this.setData({
      index: index,
      showCont: this.data.list[index - 1],
      showPrev: true,
      showNext: index==this.data.list.length?false:true
    })
  },

  limitTime:function(){
    var that=this
    var time=0
    var limit=setInterval(function(){
      time++;
      var hour = Math.floor(time / 3600)
      var mintue = Math.floor(time / 60)
      var showTime = (hour > 9 ? hour : ('0' + hour)) + ':' + (mintue > 9 ? mintue : ('0' + mintue)) + ':' + ((time % 60) > 9 ? (time % 60) : ('0' + (time % 60)))
      that.setData({
        showTime: showTime
      })
    },1000)
  },

  showSubmit:function(){
    this.setData({
      showSub:true
    })
  },

  cancelSub:function(){
    this.setData({
      showSub: false
    })
  },

  sureSubmit:function(){
    this.goToResult()
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