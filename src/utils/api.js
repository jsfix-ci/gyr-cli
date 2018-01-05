import axios from 'axios'
import store from '@/stores'
import wlb from '@/util/webview'

var isPro = process.env.NODE_ENV === 'production'
var isCrossDomain = window.location.hostname.indexOf('wanglibao.com') === -1

var Location = window.location
var host, api

// 是否本地模拟接口数据
var simulate = false

host = 'https://php1.wanglibao.com'
if (Location.hostname.indexOf('wanglibao.com') > -1) {
  host = 'https://' + Location.host
}

export const currentHost = host
export const apiList = host + '/yunying/rpc'
export const imgUpload = host + '/yunying/upload/img'
export const apiAccount = host + '/passport/service.php?c=account'

axios.interceptors.request.use(function (config) {
  console.log('request')
  store.dispatch({type: 'loading show'})
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  console.log(response.config.data, 'response')
  store.dispatch({type: 'loading hidden'})
  // console.log(response.config.data, 'response config data', JSON.parse(response.config.data))
  if (typeof response.config.data === 'string' && typeof JSON.parse(response.config.data) === 'object') {
    const config = JSON.parse(response.config.data)
    if (config.method !== 'getBbsUserInfo') {
      if (response.data.error && response.data.error.code === 4004) {
        setTimeout(() => {
          wlb.ready({
            app: function (mixins) {
              var time = new Date().getTime()
              mixins.loginApp({ url: window.location.href + '?t=' + time })
            },
            other: function () {
              window.location.href = currentHost + '/wechat/verify?next=' + window.location.href + '?source=app'
            }
          })
        }, 1000)
      }
    }
  }
  return response
}, function (error) {
  store.dispatch({type: 'loading hidden'})
  return Promise.reject(error)
})

function http () {
  if (arguments[0] instanceof Array) {
    var resultArr = []
    for (let i in arguments[0]) {
      resultArr.push(fetchData(arguments[0][i]))
    }
    return axios.all(resultArr)
  } else {
    let params = arguments[0]
    return fetchData(params)
  }
}

function fetchData (params) {
  params.type = params.type ? params.type : 'post'
  var header = params.header ? params.header : ''
  params['params'] = params['params'] ? params['params'] : []
  let jsonObj = {
    jsonrpc: '2.0',
    method: params['method'],
    params: params['params'],
    id: 1
  }
  let json = JSON.stringify(jsonObj)
  return axios({
    url: params.url,
    method: params.type,
    header: header,
    data: json,
    timeout: 10000,
    withCredentials: isCrossDomain || !isPro
  })
}

// 获取帖子板块
export const getTopicAllType = (cb) => {
  simulate = false
  return simulate ? http({
    type: 'get',
    url: '/types.json',
    method: 'getBbsThreadSectionList',
    params: [{}]
  }).then(res => res.data) : http({
    url: apiList,
    method: 'getBbsThreadSectionList',
    params: [{}]
  }).then(res => {
    setTimeout(() => {
      cb && cb()
    }, 0)
    return res.data
  })
}

export default http
