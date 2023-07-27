import React, { useEffect } from 'react'
import TabBar from '@/components/TabBar'
import css from './index.module'
import setting from '@/assets/png/setting.png'
import recharge from '@/assets/png/recharge.png'
import task from '@/assets/png/task.png'
import { useNavigate } from 'react-router-dom'
import { queryCoins } from '@/api/integration/integration.js'
const integration = () => {
  const navigate = useNavigate()
  const getBalance = async () => {
    const res = await queryCoins()
    console.log(res)
  }
  useEffect(() => {
    getBalance()
  }, [])
  return (
    <div className={css.box}>
      <div className="top">
        <div className="title">
          <div className="name">
            <img src={setting} />
            <span>Jegotrip</span>
          </div>
          <div
            className="setting"
            onClick={() => {
              navigate('/setting')
            }}
          >
            <img src={setting} />
          </div>
        </div>
        <div className="main">
          <span>无忧积分余额</span>
          <div className="price">{new Intl.NumberFormat().format(88889999)}</div>
          <p className="detail-view">查看明细</p>
        </div>
        <div className="button-group">
          <div className="button">
            <img src={recharge} />
            充值获取积分
          </div>
          <div className="button">
            <img src={task} />
            任务获取积分
          </div>
        </div>
      </div>
      <div className="coin-price"></div>
      <TabBar />
    </div>
  )
}
export default integration
