// pages/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:'',
    windowWidth: '',
    ratio:'',
    selectIndex:0,
    pages:[],
    group:[],
    allCommList:{},
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          ratio: (res.windowWidth/750)
        })
      }
    })
    var userInfo = wx.getStorageSync('userInfo')
    that.setData({
      userInfo: userInfo
    })
    that.getCommGroupList()
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

  goToDetail:function(e){
    var comm_id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?comm_id='+comm_id
    })
  },

  switchTab:function(e){
    var that=this;
    var id = e.currentTarget.dataset.id
    that.setData({
      selectIndex: id
    })

    if (that.data.allCommList[id]==undefined){

      that.getCommList();    //没有数据调用该分组下的商品列表
    }

  },

  getCommGroupList:function(){
    var that=this
    wx.request({
      url: getApp().globalData.configUrl + '/ichain/comm/getCommGroupList',
      method: 'GET',
      data: {
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var data=res.data
        if (data.status == 200) {
          var group=[
            {
              commGroupTitle:'全部商品'
            }
          ];
          group=group.concat(data.context)
          that.setData({
            group: group
          })

          that.getCommList();

        }
      }
    })
  },

  getCommList:function(){
    var that = this
    var selectIndex = that.data.selectIndex
    var comm_group_id = (selectIndex == 0 ? '' : that.data.group[selectIndex]['commGroupId'])
    var page = that.data.pages[selectIndex] || 0
    var _length = that.data.allCommList[selectIndex] || []
    if (Math.floor(_length.length/10)==(page-1)) return

    wx.request({
      url: getApp().globalData.configUrl + '/ichain/comm/getCommList',
      method: 'GET',
      data: {
        comm_group_id: comm_group_id,
        count: 10,
        page: (page+1),
        user_no: that.data.userInfo.userNo || 60088
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res, comm_group_id, that.data.userInfo.userNo, 44444444)
        var data = res.data
        if (data.status == 200) {
          var goods = that.data.allCommList;
          var _page=that.data.pages
          var initGoods = goods[selectIndex] || []
          var product = data.context
          for (var i = 0; i < product.length;i++){
            product[i]['comm_image'] = product[i]['comm_image'] ? (getApp().globalData.uploadUrl +product[i]['comm_image'].replace(/_/g, '/')):'';
          }
          goods[selectIndex] = initGoods.concat(data.context)
          _page[selectIndex]=page+1
          that.setData({
            allCommList: goods,
            page: _page
          })

        }
      }
    })
  },

  getGoodsMore:function(){
    this.getCommList()
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