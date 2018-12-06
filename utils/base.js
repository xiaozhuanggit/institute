

/**
 * 
 * 上传图片
 */


function getFileName(o){
  var pos = o.lastIndexOf(".");
  return o.substring(pos + 1);
}

function randomString(len){
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function getUploadData(that, callback, count){
  wx.request({
    url: getApp().globalData.ringUrl + '/ossFile',
    method: 'GET',
    data: {},
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      var data = res.data
      if (data.status == 200) {
        var datas = data.context;
        uploadImages(datas, that, callback)
      }
    }
  })
}

function uploadImages(datas, that, callback, count){  //datas上传参数，that APP对象，callback成功回调，count上传个数
  var count = count || 1;
  wx.chooseImage({
    count: count,
    success: function (res) {

      var tempFilePaths = res.tempFilePaths
      var fileName = randomString(18);
      var fileFormat = getFileName(tempFilePaths[0])

      var aliyunFileKey = datas.dir + 'upload/' + (fileName + '.' + fileFormat).replace('wxfile://', '');

      var url = datas.host.replace('http:', 'https:')
      wx.uploadFile({
        url: url, //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'key': aliyunFileKey,
          'policy': datas.policy,
          'OSSAccessKeyId': datas.accessid,
          'success_action_status': '200', //让服务端返回200,不然，默认会返回204
          'signature': datas.signature,
        },
        success: function (res) {
          that.setData({
            uploadUrl: url + '/' + aliyunFileKey
          })
          if (typeof callback === 'function') callback()
          console.log(url+'/'+aliyunFileKey)
          //do something
        }
      })
    }
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

module.exports={
  getUploadData: getUploadData,
  calcStringWidch: calcStringWidch
}