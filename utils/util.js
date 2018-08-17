/**
 * get请求
 */
// var http = 'https://scrm.cnt-ad.net'
var http ='http://localhost:3000'
function _get(url,data,success,fail){
  console.log("------start---_get----")
  if (typeof data == "function"){
    fail = success
    success = data
    data = {}
  }
  wx.request({
    url:http+url,
    header: { 'Content-Type': 'application/json'},
    data:data,
    success:success,
    fail:fail,  
  })
}
/**
 * post请求
 */
function _post(url, data, success, fail) {
  console.log("------start---_post----")
  if (typeof data == "function") {
    data = {}
    success = data
    fail = success
  }
  wx.request({
    url: http + url,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method:'post',
    data: data,
    success: success,
    fail: fail,
  })
}

module.exports = {
  _get: _get,
  _post: _post,
}