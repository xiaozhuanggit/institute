// pages/manage_address/manage_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:null,
    userInfo:null,
    modelShow:false,
    delete_id:'',
    delete_in:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getAddressList()
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo
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
    this.getAddressList()
  },

  getAddressList: function () {
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/getAddressList',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          var address = data.context;
 
          that.setData({
            addressList: address
          })
         
        }
      }
    })
  },

  delAddress:function(){
    var that = this
    var addressId = that.data.delete_id
    var index = that.data.delete_in
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/deleteAddress',
      method: 'POST',
      data: {
        address_id: addressId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {
          that.data.addressList.splice(index, 1)
          that.setData({
            addressList: that.data.addressList,
            modelShow:false
          })
        }
      }
    })
  },

  editAddress:function(e){
    var addressId = e.currentTarget.dataset.id || ''
    wx.navigateTo({
      url: '/pages/edit_address/edit_address?addressId=' + addressId
    })
  },
  addAddress: function (e) {
    var addressId = ''
    wx.navigateTo({
      url: '/pages/edit_address/edit_address?addressId=' + addressId
    })
  },

  cancelBtn:function(){
    this.setData({
      modelShow:false
    })
  },

  cancelModel:function(e){
    var that=this
    var addressId = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    that.setData({
      delete_id: addressId,
      delete_in: index,
      modelShow:true
    })

    /*
    wx.showModal({
      title: '',
      content: '确认要放弃本次编辑',
      success: function (res) {
        if (res.confirm) {
          that.delAddress.call(that,e)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(2)
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