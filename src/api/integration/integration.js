import { request } from '../request'
export function queryCoins(data) {
  return request({
    method: 'post',
    url: '/api/web3/queryTokenCoins',
    data
  })
}
