// pages/order_sure/order_sure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comm_id:'',
    defaultAdd:null,
    product:null,
    allNum:1,
    address:null,
    showDeliver:false,
    showDelivertxt: '物流发货',
    showDeliverType:'',
    deliverType:1,
    remark:'',
    token:'',
    userInfo:null,
    showModelState:false,
    modelState:{
      url:'/images/shibai@2x.png',
      state:'兑换失败',
      tip:'您的扣币不足~'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userInfo = wx.getStorageSync('userInfo')

    this.setData({
      comm_id: options.comm_id,
      token: options.token,
      userInfo: userInfo
    })
    //this.getDefaultAd()
    //this.getProductInfo()
    //this.getDeliverInfo()
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
    console.log(123)
    this.getDefaultAd()
    this.getProductInfo()
    this.getDeliverInfo()
  },


  goToEditAddress: function (e) {
    var addressId = e.currentTarget.dataset.id || ''
    var url=''
    if (addressId==''){
      url = '/pages/edit_address/edit_address?addressId=' + addressId
    }else{
      url = '/pages/manage_address/manage_address'
    }
    wx.navigateTo({
      url: url
    })
  },

  setPlus:function(){
    
    var that=this,
        stock = that.data.product['commStock'] - that.data.product['saleNum'],
        limitNum = that.data.product['limitNum'] > stock ? stock : that.data.product['limitNum'],
        allNum = that.setPlusMinus(1, that.data.allNum, limitNum)

    
    that.setData({
      allNum: allNum
    })
  },

  setMinus:function(){
    var that = this,
      stock = that.data.product['commStock'] - that.data.product['saleNum'],
      limitNum = that.data.product['limitNum'] > stock ? stock : that.data.product['limitNum'],
      allNum = that.setPlusMinus(0, that.data.allNum, limitNum)

    that.setData({
      allNum: allNum
    })
  },

  setPlusMinus: function (state, cur,max,min){
    var min=min || 1,
        max=max || ''

    
    if (state===0){
      return (cur - 1) < min ? min : (cur - 1)
    } else if (state === 1){
      return max !== '' ? ((cur + 1) > max ? max : (cur + 1)) : (cur + 1)
    }
  },

  showDeliver:function(){
    this.setData({
      showDeliver:true
    })
  },
  hideDeliver: function () {
    this.setData({
      showDeliver: false
    })
  },

  closeTip:function(){
    this.setData({
      showModelState:false
    })
  },

  selectDeliver:function(e){
    var that=this
    var _type = e.currentTarget.dataset.id,
        showDelivertxt = '',
        showDeliverType=''
    if (_type==0){
        showDelivertxt = that.data.address.storeAddress,
        showDeliverType = '自提'
    } else if (_type == 1){
        showDelivertxt = '物流发货',
        showDeliverType = ''
    }

    that.setData({
      deliverType:_type,
      showDelivertxt : showDelivertxt,
      showDeliverType : showDeliverType,
      showDeliver:false
    })
  },

  sriteRemarks:function(e){
    this.setData({
      remark:e.detail.value
    })
  },

  getDefaultAd:function(){
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
          
          if (address.length>0){
            for (var i = 0; i < address.length; i++) {
              if (address[i]['isDefault']) {
                that.setData({
                  defaultAdd: address[i]
                })
              }
            }
          }else{
            that.setData({
              defaultAdd: null
            })
          }
          
        }
      }
    })
  },

  getProductInfo() {
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
          product.commImage = product.commImage ? (getApp().globalData.uploadUrl + product.commImage.replace(/_/g, '/')) : '';

          that.setData({
            product: data.context
          })

        }
      }
    })
  },

  getDeliverInfo(){
    var that = this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/user/getStoreList',
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
          var address = data.context;

          that.setData({
            address: address
          })

        }
      }
    })
  },

  saveExchange:function(){
    var that = this

    var datas={}
    var deliverType = parseInt(that.data.deliverType) + 1
    var goodsType =0;
    if (that.data.product['commType']==2){
      datas={
        comm_id: that.data.comm_id,
        comm_num: that.data.allNum,
        order_note: that.data.remark,
        user_no: that.data.userInfo.userNo || 60088
      }
      goodsType=1     //虚拟
    } else if (that.data.product['commType'] == 1){
      datas = {
        comm_id: that.data.comm_id,
        comm_num: that.data.allNum,
        order_note: encodeURIComponent(that.data.remark),
        user_no: that.data.userInfo.userNo || 60088,
        pick_up_type: deliverType
      }

      if (that.data.token){
        datas['token'] = that.data.token
      }

      if (deliverType==1){
        datas['store_id'] = that.data.address['storeId']
        goodsType = 2     //虚拟
      } else if (deliverType == 2){
        if (that.data.defaultAdd){
          datas['address_id'] = that.data.defaultAdd['addressId']
          goodsType = 3     //虚拟
        }else{

          wx.showToast({
            title: '请填写地址',
            icon: 'success',
            image:'/images/shibai@2x.png',
            duration: 2000
          })

          setTimeout(function () {
            wx.hideToast()
          }, 2000);
          return
        }
      }
    }



    

    wx.request({
      url: getApp().globalData.configUrl + '/ichain/comm/addCommOrder',
      method: 'POST',
      data:datas,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data = res.data
        console.log(res,7777777)
        if (data.status != 200) {
          that.setData({
            showModelState: true,
            modelState: {
              url: '/images/shibai@2x.png',
              state: '兑换失败',
              tip: data.message
            }
          }) 

        }else{
          wx.redirectTo({
            url: '/pages/information/information?order_id=' + data.context.order_id + '&goodsType=' + goodsType
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