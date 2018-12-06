// pages/mailList/mailList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSearch:false,
    cardList: {
      A: [
        {
          photo_url: '/images/a1.jpg'
        },
        {
          photo_url: '/images/a1.jpg'
        }
      ],
      B: [
        {
          photo_url: '/images/a1.jpg'
        },
        {
          photo_url: '/images/a1.jpg'
        }
      ]
    }
      
      
    
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

  entrySearch:function(){
    this.setData({
      showSearch:true
    })
  },
  cancelSearch:function(){
    this.setData({
      showSearch: false
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