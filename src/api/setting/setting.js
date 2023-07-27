import { request } from '../request'
export function bindWallet(data) {
  return request({
    method: 'post',
    url: '/api/web3/bind',
    data
  })
}
