//绘制小程序码图片

function draw(that) {

  var userInfo = that.data.userInfo
  var qrCode = that.data.qrCode
  var canvasWidth = that.data.windowWidth
  var canvasHeight = that.data.windowHeight

  var mul = (parseInt(canvasWidth) / 750) * 2;

  const ctx = wx.createCanvasContext('qrCode');


  ctx.setFillStyle('#ffffff')
  ctx.fillRect(0, 0, parseInt(canvasWidth), parseInt(canvasHeight));
  ctx.save()
  //绘制头像
  ctx.drawImage(userInfo.photo, 162 * mul, 60 * mul, 50 * mul, 50 * mul)  //绘制头像
  ctx.restore()


  //绘制信息内容



  ctx.save()
  ctx.setFontSize(16 * mul)
  ctx.setFillStyle('#1AAD19')
  ctx.setTextAlign('center')
  ctx.fillText(userInfo.nickName, (parseInt(canvasWidth)) / 2, 140 * mul)   //绘制昵称


  ctx.setFontSize(13 * mul)
  ctx.setFillStyle('#82939e')
  ctx.setTextAlign('center')
  ctx.fillText('长按或扫码进入', 187 * mul, 180 * mul)
  ctx.restore()
  ctx.save()
  //绘制小程序码
  ctx.drawImage(qrCode, 130 * mul, 260 * mul, 114 * mul, 114 * mul)
  ctx.restore()

  ctx.setFontSize(10 * mul)
  ctx.setFillStyle('#828284')
  ctx.setTextAlign('center')
  ctx.fillText(userInfo.nickName + '名片码', 187 * mul, 400 * mul)

  ctx.setFontSize(12 * mul)
  ctx.setFillStyle('#828284')
  ctx.setTextAlign('center')
  ctx.fillText('-获得专属小程序码-', 187 * mul, 550 * mul)


  ctx.draw()

  //canvasToImg(that)
}

function canvasToImg(that, callback) {
  wx.canvasToTempFilePath({
    canvasId: 'qrCode',
    success: function (res) {
      that.setData({
        scanvasImg: res.tempFilePath
      });
      callback()
    },
    complete: function (res) {
    }
  })
}

function getCanvasInfo(that){
  wx.getSystemInfo({
    success: function (res) {

      that.setData({
        windowWidth: res.windowWidth,
        windowHeight: res.windowHeight
      });
    }
  })
}

module.exports = {
  getCanvasInfo: getCanvasInfo,
  draw: draw,
  canvasToImg: canvasToImg
}