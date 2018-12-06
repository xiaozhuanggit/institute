// pages/nickname/nickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNo:'',
    roomPwd:'',
    liveList:[],
    showTip:false,
    tipTxt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.formatData()
    var userInfo = wx.getStorageSync('userInfo')
    this.getLivedList({
      user_no: userInfo.userNo
    },0)
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

  goToLived: function (e) {
    var state = e.currentTarget.dataset.state
    var course_id = e.currentTarget.dataset.id
    if (state==1){
      wx.navigateTo({
        url: '/pageA/page/lived/lived?course_id=' + course_id
      })
    } else if (state==0){
      that.showTipInfo(true, '直播未开始')
    } else if (state == 2) {
      that.showTipInfo(true, '直播已结束')
    }
    
  },

  roomNo:function(e){
    this.setData({
      roomNo: e.detail.value
    })
  },

  roomPwd: function (e) {
    this.setData({
      roomPwd: e.detail.value
    })
  },

  joinRoom:function(){
    var that=this
    this.getLivedList({
      room_code: that.data.roomNo,
      join_pwd: that.data.roomPwd
    },1)
  },

  getLivedList:function(datas,stat){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/course/getInteractList',
      method: 'GET',
      data: datas,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var liveList=res.data.context
        if (stat==0){
          var now = new Date().getTime();
          for (var i = 0; i < liveList.length; i++) {
            liveList[i]['course_image'] = liveList[i]['course_image'] ? (getApp().globalData.uploadUrl + liveList[i]['course_image'].replace(/_/g, '/')) : '';
            liveList[i]['start'] = new Date(liveList[i]['start_time']).Format("yyyy-MM-dd hh:mm")
            if (liveList[i]['start_time'] > now) {
              liveList[i]['state'] = 0
            } else if (liveList[i]['start_time'] < now && liveList[i]['end_time'] > now) {
              liveList[i]['state'] = 1
            } else {
              liveList[i]['state'] = 2
            }

          }
          that.setData({
            liveList: liveList
          })
        }else{
          if (liveList.length==0){
            that.showTipInfo(true, '房间号或密码输入错误')
          }else{
            wx.navigateTo({
              url: '/pageA/page/lived/lived?course_id=' + liveList[0]['course_id']
            })
          }
        }
        
      }
    })
  },

  showTipInfo: function (showTip, tipTxt){
    var that=this
    that.setData({
      showTip: showTip,
      tipTxt: tipTxt
    })

    setTimeout(function () {
      that.setData({
        showTip: false,
        tipTxt: ''
      })
    }, 2000)
  },

  formatData:function(){
    Date.prototype.Format = function (fmt) { //author: meizz 
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
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