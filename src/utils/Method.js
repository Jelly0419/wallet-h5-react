import Env from '@/api/Env' //环境
import { Dialog } from 'antd-mobile'
import cookie from 'react-cookies'
//多币种
function getCurrency(currency) {
  let value = {
    symbol: '',
    text: ''
  }
  switch (currency) {
    case 'CNY':
      value = {
        symbol: '¥',
        text: '元'
      }
      break
    case 'HKD':
      value = {
        symbol: 'HKD',
        text: '港元'
      }
      break
    case 'USD':
      value = {
        symbol: '$',
        text: '美元'
      }
      break
  }
  return value
}

//获取地址栏参数-从search读取
function getSearchValue(text) {
  let search = window.location.search.slice(1).split('&')
  let value = ''
  let len = search.length
  for (let i = 0; i < len; i++) {
    let left = text + '='
    if (search[i].indexOf(left) === 0) {
      let right = search[i].slice(left.length)
      if (right) {
        value = right
      }
    }
  }
  return value
}

//获取地址栏参数-从hash读取
function getHashValue(text) {
  let value = ''
  let hash = window.location.hash
  let index = hash.indexOf('?')
  if (index <= 0) {
    return value
  }
  let search = hash.slice(index + 1).split('&')
  let len = search.length
  for (let i = 0; i < len; i++) {
    let left = text + '='
    if (search[i].indexOf(left) === 0) {
      let right = search[i].slice(left.length)
      if (right) {
        value = right
      }
    }
  }
  return value
}

//获取地址栏参数
function getUrlValue(text) {
  let value = getSearchValue(text) || getHashValue(text)
  return value
}
//去登录
function login() {
  window.removeEventListener('pageshow', pageshow, false)

  let { protocol, host } = window.location
  let returnUrl = getReturnUrl()
  let loginUrl
  if (Env.key == 'dev') {
    loginUrl = protocol + '//sztoss.jegotrip.com.cn/partners/mallh5test/user/signin.html?env=' + Env.key
  } else {
    loginUrl = protocol + '//cp.jegotrip.com.cn/static/user/signin.html?env=' + Env.key
  }

  if (host === 'cp.jegotrip.com.cn') {
    window.backFromHistory = true
    window.addEventListener('pageshow', pageshow, false)
    window.history.replaceState(null, '', returnUrl)
    window.location.href = loginUrl
  } else {
    let toUrl = loginUrl + '&returnUrl=' + window.encodeURIComponent(returnUrl)
    window.location.href = toUrl
  }
}
function getReturnUrl() {
  let { protocol, host, pathname, search, hash } = window.location
  let path = protocol + '//' + host + pathname

  let i = search.indexOf('?')
  let searchLeft = i >= 0 ? search.slice(0, i + 1) : search
  let searchRight = i >= 0 ? search.slice(i + 1) : ''
  let searchArr = searchRight ? searchRight.split('&') : []
  let searchLen = searchArr.length
  let searchParam = []

  let j = hash.indexOf('?')
  let hashLeft = j >= 0 ? hash.slice(0, j + 1) : hash
  let hashRight = j >= 0 ? hash.slice(j + 1) : ''
  let hashArr = hashRight ? hashRight.split('&') : []
  let hashLen = hashArr.length
  let hashParam = []

  let key = ['htoken', 'h_token', 'jtptoken', 'apptoken', 'token', 'tt', 't']

  for (let k = 0; k < searchLen; k++) {
    let item = searchArr[k]
    let left = item.split('=')[0]
    if (!key.includes(left)) {
      searchParam.push(item)
    }
  }

  for (let t = 0; t < hashLen; t++) {
    let item = hashArr[t]
    let left = item.split('=')[0]
    if (!key.includes(left)) {
      hashParam.push(item)
    }
  }

  let newSearch = searchLeft + searchParam.join('&')
  let newHash = hashLeft + hashParam.join('&')
  let result = path + newSearch + newHash

  return result
}
//解决登录成功后，某些浏览器从历史记录返回不刷新的问题
function pageshow() {
  window.removeEventListener('pageshow', pageshow, false)
  if (window.backFromHistory) {
    window.backFromHistory = false
    window.location.reload()
  }
}
//去掉url上的token参数
function removeUrlToken() {
  let url = getReturnUrl()
  let token = getUrlValue('htoken')
  cookie.save('htoken', token)
  window.history.replaceState(null, '', url)
}

function getJS(url, success, error) {
  let script = document.createElement('script')
  script.onload = script.onreadystatechange = function () {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      this.onload = this.onreadystatechange = null
      if (success) {
        success()
      }
    }
  }
  script.onerror = error || null
  script.src = url
  document.body.appendChild(script)
}
function desensitization(str, beginLen, endLen) {
  var len = str.length
  var firstStr = str.substr(0, beginLen)
  var lastStr = str.substr(endLen)
  var middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/gi, '*')
  return firstStr + '...' + lastStr
}

function toLogin() {
  let text = '您还未登录，请先登录'
  if (cookie.load('htoken')) {
    text = '您的登录信息已过期，请重新登录'
  }
  Dialog.show({
    title: '提示',
    content: text,
    closeOnAction: true,
    actions: [
      [
        {
          key: 'cancel',
          text: '取消',
          style: {
            color: '#999'
          }
        },
        {
          key: 'login',
          text: '登录'
        }
      ]
    ],
    style: {
      '--border-radius': '20px'
    },

    onAction: res => {
      switch (res.key) {
        case 'login':
          login()
          break
        case 'cancel':
          break
        default:
          break
      }
    }
  })
}
export default {
  getUrlValue,
  getCurrency,
  login,
  removeUrlToken,
  getReturnUrl,
  getJS,
  desensitization,
  toLogin
}
