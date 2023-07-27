/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 * create by lvzhiyang
 */
import axios from 'axios'
import Method from '@/utils/Method'
import Env from './Env' //环境
import { Dialog } from 'antd-mobile'
import cookie from 'react-cookies'
// 创建axios实例
axios.defaults.baseURL = Env.domain // 测试环境用dev 生产环境用pro
axios.defaults.timeout = 30000

// 设置允许带cookie
// axios.defaults.withCredentials = true

// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 设置请求头
// 节流计时器
let throttleTimer = null

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  config => {
    const type = config.type === 'file' ? 'file' : 'json'
    const headers = {
      json: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      file: {
        'Content-Type': 'multipart/form-data'
      }
    }
    if (config.type) {
      config.headers['Content-Type'] = headers[type]
    }

    if (!config.noToken) {
      const token = cookie.load('htoken')
      if (!token) {
        Method.toLogin()
      }
      const query = 'h_token=' + token
      if (config.url.indexOf('token') === -1) {
        if (config.url.indexOf('?') === -1) {
          config.url += '?' + query
        } else {
          config.url += '&' + query
        }
      }
    }
    if (config.isThrottle) {
      if (throttleTimer) {
        return Promise.reject({
          data: { msg: '请勿频繁操作～' }
        })
      } else {
        throttleTimer = setTimeout(() => {
          throttleTimer && clearTimeout(throttleTimer)
          throttleTimer = null
        }, 3000)
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  res => {
    if (res.data.status == 429 || res.data.code == 429) {
      Method.toLogin()
    }

    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export function request(options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        if (options.responseType) {
          return resolve(res)
        } else {
          if (res.data || res.body) {
            return resolve(res.data)
          }
          return reject(res)
        }
      })
      .catch(err => {
        return reject(err)
      })
  })
}
