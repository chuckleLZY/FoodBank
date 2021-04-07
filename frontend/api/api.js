// 封装一下所有的request，自动添加token
// 用法示例
/*
import api from '../../api/api'
api.post('/userinfo/update', {
  "avatar": "string",
  "phonenumber": "string",
  "sex": "string",
  "username": "string"
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})
api.get('/userinfo/get').then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
*/

const app = getApp();
const host = "http://47.118.59.241:18080/api";


const request = (url, options) => {
  // console.log('url',url,'option',options);
  return new Promise((resolve, reject) => {
    // console.log("request", app.globalData.token, url, options)
    wx.request({
      url: `${host}${url}`,
      method: options.method,
      data: options.data,
      // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      header: {
        'token': app.globalData.token,
      },
      success(request) {
        //  if (request.data.code === 2000) {
        //      resolve(request.data)
        //  } else {
        //      reject(request.data)
        //  }
        console.log("request success")
        resolve(request.data)
      },
      fail(error) {
        console.log("request error")
        reject(error.data)
      }
    })
  })
}

const get = (url, options = {}) => {
  console.log("here get")
  return request(url, {
    method: 'GET',
    data: options
  })
}

const post = (url, options) => {
  console.log("here post")
  return request(url, {
    method: 'POST',
    data: options
  })
}

const put = (url, options) => {
  console.log("here put")
  return request(url, {
    method: 'PUT',
    data: options
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  console.log("here delete(remove)")
  return request(url, {
    method: 'DELETE',
    data: options
  })
}

module.exports = {
  get,
  post,
  put,
  remove,
  host
}