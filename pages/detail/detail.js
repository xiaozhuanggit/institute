// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comm_id:'',
    product:null,
    limit_txt:'',
    limit_day:'00',
    limit_hour:'00',
    limit_minute:'00',
    limit_second:'00',
    token:'',
    commDetail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var link = decodeURIComponent(options.q);
    var params = link.split('$');
    var comm_id = options.comm_id || params[1]
    this.setData({
      comm_id: comm_id,
      token: options.token || params[2] || ''

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
    this.getProductInfo()
  },

  goToOrder: function (e) {
    var comm_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order_sure/order_sure?comm_id=' + comm_id + '&token=' + this.data.token
    })
  },

  getLimitTime:function(){
    var that=this,
        limit_txt='',
        limit_day= '',
        limit_hour= '',
        limit_minute= '',
        limit_second= '',
        now=new Date().getTime(),
        start = that.data.product['saleStartTime'],
        end = that.data.product['saleEndTime']

    if (now > start && now < end){
      var time = that.formatDuring(end-now)
        limit_txt='距结束还剩',
          limit_day = time.days,
          limit_hour = time.hours,
          limit_minute = time.minutes,
          limit_second = time.seconds
    } else if (now < start){
      var time = that.formatDuring(start - now)
        limit_txt='距开始还剩',
          limit_day = time.days,
          limit_hour = time.hours,
          limit_minute = time.minutes,
          limit_second = time.seconds
    }

    that.setData({
      limit_txt:limit_txt,
      limit_day :limit_day || '00',
      limit_hour: limit_hour > 9 ? limit_hour : '0' + limit_hour,
      limit_minute: limit_minute > 9 ? limit_minute : '0' + limit_minute,
      limit_second: limit_second > 9 ? limit_second : '0' + limit_second
    })

  },

  formatDuring:function(t){
    var days = parseInt(t/(1000 * 60 * 60 * 24));
    var hours = parseInt((t% (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((t% (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((t% (1000 * 60)) / 1000);
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  },

  getProductInfo(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/comm/getCommInfo',
      method: 'GET',
      data: {
        comm_id: that.data.comm_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var product = data.context;
          that.getDetailInfo(res.data.context.commDetail)
          product.progress = parseInt((product.saleNum / product.commStock)*100)
          product.commImage = product.commImage ? (getApp().globalData.uploadUrl + product.commImage.replace(/_/g,'/')):'';
          product.commDetail = product.commDetail ? (getApp().globalData.uploadUrl + product.commDetail.replace(/_/g, '/')) : '';
          console.log(product.commDetail)
          that.setData({
            product: product
          })
          
          setInterval(function(){
            that.getLimitTime()
          },1000)               

        }
      }
    })
  },

  getDetailInfo: function (file_path){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/public/detailOutAjax',
      method: 'GET',
      data: {
        file_path: file_path
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var commDetail = data.context;
          that.setData({
            commDetail: commDetail.replace(/<img/g,'<img style="width:100%"')
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