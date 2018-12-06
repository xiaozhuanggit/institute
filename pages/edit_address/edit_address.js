// pages/edit_address/edit_address.js

var amapFile = require('../../libs/amap-wx.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkState:0,
    check_url:'/images/weixuanzhong@2x.png',
    nickname:'',
    phone:'',
    area:'',
    address:'',
    addressLength:0,
    address_id:'',
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      address_id: options.addressId,
      userInfo: userInfo
    })
    //this.getAddress()
    //this.getAddressList()
    //this.getAddressInfo()
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
    this.getAddress()
    this.getAddressList()
  },

  entryName:function(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  entryPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  entryArea: function (e) {
    this.setData({
      area: e.detail.value
    })
  },
  entryAddress: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  selectCheck:function(){
    var that=this
    if (that.data.addressLength<1) return 
    this.setData({
      check_url: that.data.checkState ? '/images/weixuanzhong@2x.png' :'/images/xuanzhong@2x.png',
      checkState: that.data.checkState?0:1
    })
  },


  getAddress:function(){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '39cd84ae2f24de2df26f92d31d0355c0' });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var location = longitude + ',' + latitude
        myAmapFun.getRegeo({
          location: location,
          success: function (data) {
            var province = data[0]['regeocodeData']['addressComponent']['province'];
            var city = data[0]['regeocodeData']['addressComponent']['city'];
            var district = data[0]['regeocodeData']['addressComponent']['district'];

            that.setData({
              area: province + city + district
            })

          },
          fail: function (info) {
            wx.showModal({ title: info.errMsg })
          }
        })
      },
      fail:function(res){

      }
    })
  },


  getAddressList:function(){
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
          
          that.setData({
            addressLength:data.context.length
          })

          if (data.context.length===0){
            that.setData({
              check_url: '/images/moren@2x.png',
              checkState:1
            })
          } else if (data.context.length === 1 && data.context[0]['isDefault'] === 1 && data.context[0]['addressId'] === that.data.address_id){
            that.setData({
              check_url: '/images/moren@2x.png',
              checkState: 1
            })
          }

          that.getAddressInfo()


        }
      }
    })
  },

  getAddressInfo:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/getAddressInfo',
      method: 'GET',
      data: {
        address_id: that.data.address_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200 && data.context) {

          that.setData({
            nickname: data.context.consignee,
            phone: data.context.phone,
            area: data.context.area,
            address: data.context.addressDetail,
          })

          if (data.context.isDefault){
            that.setData({
              check_url: '/images/moren@2x.png',
              checkState: 1
            })
          }

        }
      }
    })
  },

  saveAddress:function(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/saveAddress',
      method: 'POST',
      data: {
        address_detail: encodeURI(that.data.address),
        address_id: that.data.address_id,
        area: encodeURI(that.data.area),
        consignee: encodeURI(that.data.nickname),
        is_default: that.data.checkState,
        phone: that.data.phone,
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        if (data.status == 200) {

          wx.navigateBack({
            delta: 1
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