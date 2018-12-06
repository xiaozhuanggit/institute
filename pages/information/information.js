// pages/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsType:'',
    order_id:'',
    orderInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goodsType: options.goodsType,
      order_id: options.order_id,
    })
    this.getOrderInfo()
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

  goToShopping:function(){
    wx.redirectTo({
      url: '/pages/shopping/shopping'
    })
  },

  getOrderInfo:function(){
    var that = this

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

    wx.request({
      url: getApp().globalData.configUrl + '/ichain/comm/getOrderInfo',
      method: 'GET',
      data: {
        order_id: that.data.order_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var orderInfo = data.context;

          //orderInfo.storeTime = orderInfo.storeTime ? new Date(orderInfo.storeTime).Format("yyyy-MM-dd hh:mm:ss"):''
          orderInfo.payTime = orderInfo.payTime ? new Date(orderInfo.payTime).Format("yyyy-MM-dd hh:mm:ss") : ''
          orderInfo.createTime = orderInfo.createTime ? new Date(orderInfo.createTime).Format("yyyy-MM-dd hh:mm:ss") : ''
          that.setData({
            orderInfo: orderInfo
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})