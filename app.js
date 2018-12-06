//app.js
App({
  onShow: function (options) {
    // 展示本地存储能力
    var that=this
    var page=options.path
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        wx.request({
          url: getApp().globalData.configUrl +'/ichain/wechat/getUnionId',
          method: 'GET',
          data: {
            appid: 'wx696e957031b55ad7',
            appsecret: '1d77cb75dd4d5c367600e0bc526eb8e0',
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            
            if (res.data.status == 200) {
              that.wxLogin(res.data.context.unionid, res.data.context.openid,page)
            }
            
          },
          fail:function(res){
            console.log(res)
          },
          complete: function (res){

          }
        })

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  wxLogin: function (unionid, openid,page){
    wx.request({
      url: getApp().globalData.ringUrl +'/api/login',
      method: 'POST',
      data: {
        loginType: 2,
        unionid: unionid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.status==200){
          var userInfo = res.data.context

          //个人信息和设备信息一同缓存到本地
          wx.getSystemInfo({
            success: function (res) {

              userInfo.windowWidth = res.windowWidth;
              userInfo.windowHeight = res.windowHeight;
              wx.setStorageSync('userInfo', userInfo)
              console.log(page,11111)
              if (page == 'pages/loading/loading') {
                setTimeout(function(){
                  wx.switchTab({
                    url: '../home/home'
                  })
                },1000)
                
              }

              if (page == 'pages/bind_loading/bind_loading'){
                userInfo.unionid = unionid
                userInfo.openid = openid
                wx.setStorageSync('pushInfo', userInfo)
              }
              
            }
          })  
          
        }else{
          if (page == 'pages/bind_loading/bind_loading'){
            var pushInfo={
              unionid: unionid,
              openid: openid
            }
            wx.setStorageSync('pushInfo', pushInfo)
            return;
          }
          setTimeout(function () {
            wx.redirectTo({
              url: '../binding/binding?unionid=' + unionid + '&openid=' + openid
            })
          }, 1000)

        }

      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {

      }
    })
  },
  globalData: {
    userInfo: null,
    configUrl: 'https://shop.prichain.cn',
    ringUrl:'https://app.prichain.cn',
    uploadUrl: 'https://tv-prichain.oss-cn-hangzhou.aliyuncs.com/',  //https://afeeu.oss-cn-shanghai.aliyuncs.com/ 
    newUploadUrl:'https://afeeu-cdn.prichain.cn',
    sign_id: 123
  }
})