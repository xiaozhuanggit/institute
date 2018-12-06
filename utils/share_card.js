
function drawCard(that,options,cardContent){
  var options = options || {}
  console.log(cardContent)
  var defaults = {
    bcUrl:'/images/bc1@2x.png',
    head:{
      width:72,
      height:72,
      x:254,
      y:220
    },
    nickname:{
      size:24,
      width: 130,
      x:0,
      y:312,
      color:'#333333'
    },
    product:{
      has:false,
      width: 280,
      height: 176,
      x: 150,
      y: 226
    },
    productTitle:{
      size: 30,
      width:400,
      x: 0,
      y: 558,
      color: '#333333'
    },
    qrCode:{
      width: 110,
      height: 110,
      x: 234,
      y: 652
    },
    line:{
      has:false,
      startX:84,
      startY:785,
      endX: 494,
      endY: 785,
      color:'#bcbcbc'
    },
    codeTxt: {
      txt: '长按识别二维码进入课程',
      size: 20,
      x: 0,
      y: 772,
      color: '#333333'
    }

  };

  for (var key in defaults) {
    if (options.hasOwnProperty(key)) {
      defaults[key] = options[key];
    }
  }
  options = defaults;

  var mul = (parseInt(that.data.userInfo.windowWidth) / 750);
  var ctx=wx.createCanvasContext('card')

  
  ctx.save()
  //绘制背景
  ctx.drawImage(options.bcUrl, 0, 0, 578 * mul, 814 * mul)
  ctx.restore()
  

  ctx.save(); // 保存当前ctx的状态
  ctx.arc((options.head.x + (options.head.width / 2)) * mul, (options.head.y + (options.head.height / 2)) * mul, options.head.width * mul / 2, 0, 2 * Math.PI);
  ctx.clip(); //裁剪上面的圆形
  ctx.drawImage(cardContent.head, options.head.x * mul, options.head.y * mul, options.head.width * mul, options.head.width * mul); // 在刚刚裁剪的园上画图
  ctx.restore(); // 还原状态


  var nicknameW = calcStringWidch(cardContent.nickname, options.nickname.size * mul)
  var nameStr = wordWrap(cardContent.nickname, options.nickname.size * mul, options.nickname.width * mul, 1)
  ctx.save()
  ctx.setFontSize(options.nickname.size * mul)
  ctx.setFillStyle(options.nickname.color)
  ctx.setTextAlign(options.nickname.x==0?'center':'left')
  if (nicknameW > options.nickname.width * mul){
    if (options.nickname.newline){
      ctx.fillText(nameStr[0] + '...', (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size)) * mul)
      ctx.fillText('邀你一起学习', (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size * 2) + 12) * mul)
    }else{
      ctx.fillText(nameStr[0] + '...邀你一起学习', (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size)) * mul)
    }
    
  }else{
    if (options.nickname.newline) {
      ctx.fillText(cardContent.nickname, (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size)) * mul)
      ctx.fillText('邀你一起学习', (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size*2)+12) * mul)
    }else{
      ctx.fillText(cardContent.nickname + '邀你一起学习', (options.nickname.x == 0 ? (578 * mul / 2) : options.nickname.x * mul), (options.nickname.y + (options.nickname.size)) * mul)
    }
    
  }
  
  ctx.restore()

  if (options.product.has){
    ctx.save()
    //绘制二维码
    ctx.drawImage(cardContent.product, (options.product.x) * mul, (options.product.y) * mul, options.product.width * mul, options.product.height * mul)
    ctx.restore()
  }
  


  var productTitleW = calcStringWidch(cardContent.productTitle, options.productTitle.size * mul)
  var titleStr = wordWrap(cardContent.productTitle, options.productTitle.size * mul, options.productTitle.width  * mul, 2)
  ctx.save()
  ctx.setFontSize(options.productTitle.size * mul)
  ctx.setFillStyle(options.productTitle.color)
  ctx.setTextAlign(options.productTitle.x == 0 ? 'center' : 'left')
  if (productTitleW > options.productTitle.width * mul){
    ctx.fillText(titleStr[0], 578 * mul / 2, (options.productTitle.y + (options.productTitle.size)) * mul)
    ctx.fillText(titleStr[1], 578 * mul / 2, (options.productTitle.y + (options.productTitle.size*2)+12) * mul)
  }else{
    ctx.fillText(cardContent.productTitle, 578 * mul / 2, (options.productTitle.y + (options.productTitle.size)) * mul)
  }
  
  ctx.restore()

  ctx.save()
  //绘制二维码
  ctx.drawImage(cardContent.qrCode, (options.qrCode.x ) * mul, (options.qrCode.y ) * mul, options.qrCode.width * mul, options.qrCode.height * mul)
  ctx.restore()


  if (options.line.has){
    ctx.beginPath();
    ctx.moveTo(options.line.startX * mul, options.line.startY * mul);
    ctx.lineTo(options.line.endX * mul, options.line.endY * mul);
    ctx.lineWidth = 1;
    ctx.strokeStyle = options.line.color;
    ctx.stroke();

    var codeTxtW = calcStringWidch(options.codeTxt.txt, options.codeTxt.size * mul)
    var totalW = (options.line.endX - options.line.startX) * mul

    ctx.beginPath();
    ctx.moveTo((options.line.startX * mul) + ((totalW - codeTxtW - 20) / 2), options.line.startY * mul);
    ctx.lineTo((options.line.endX * mul) - ((totalW - codeTxtW - 20) / 2), options.line.endY * mul);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }
  



  ctx.save()
  ctx.setFontSize(options.codeTxt.size * mul)
  ctx.setFillStyle(options.codeTxt.color)
  ctx.setTextAlign(options.codeTxt.x == 0 ? 'center' : 'left')
  ctx.fillText(options.codeTxt.txt, (options.codeTxt.x == 0 ? (578 * mul / 2) : options.codeTxt.x * mul), (options.codeTxt.y + (options.codeTxt.size)) * mul)
  ctx.restore()


  ctx.draw(false,function(){
    canvasToImg(that)
  })
 
  


}


function calcStringWidch(str, strFontSize) {
  var charLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) charLength += 1
    else charLength += 2
  }

  return charLength * (parseInt(strFontSize) / 2)
}


function wordWrap(str, strFontSize, row, column) {
  var charLength = 0,
    len = str.length,
    charCode = -1,
    strWidth = 0,
    arr = [],
    start = 0,
    wrapType = 1,
    i = 0;
  for (i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      charLength += 1;
      wrapType = 1;
    } else {
      charLength += 2;
      wrapType = 2;
    }
    strWidth = charLength * (parseInt(strFontSize, 10) / 2);
    if (strWidth >= row - 2) {// 2为缓冲数据，防止超出规定的宽度
      charLength = wrapType;
      arr.push(str.substr(start, i - start));
      start = i - 1;
    } else if (strWidth <= row && len === i + 1) {
      arr.push(str.substr(start, i - start + 1));
    }
    if (arr.length === column) {
      return arr;
    }
  }
  return arr;
}

function canvasToImg(that, callback) {
  wx.canvasToTempFilePath({
    canvasId: 'card',
    success: function (res) {
      that.setData({
        scanvasImg: res.tempFilePath
      });
      
    },
    complete: function (res) {
    }
  })
}


module.exports = {
  drawCard: drawCard
}