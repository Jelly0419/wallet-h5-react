import React from 'react'
import { TabBar } from 'antd-mobile'
import { useNavigate, useLocation } from 'react-router-dom'
import css from './index.module'
import inteBlack from '@/assets/png/inte-black-icon.png'
import inteGrey from '@/assets/png/inte-grey-icon.png'
import walletGrey from '@/assets/png/wallet-grey-icon.png'
import walletBlack from '@/assets/png/wallet-black-icon.png'
const WTabBar = () => {
  const tabs = [
    {
      key: '/',
      title: '无忧积分',
      greyIcon: (
        <img
          className={css.icon}
          src={inteGrey}
        />
      ),
      blackIcon: (
        <img
          className={css.icon}
          src={inteBlack}
        />
      )
    },
    {
      key: '/wallet',
      title: '钱包',
      greyIcon: (
        <img
          className={css.icon}
          src={walletGrey}
        />
      ),
      blackIcon: (
        <img
          className={css.icon}
          src={walletBlack}
        />
      )
    }
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const setRouteActive = value => {
    navigate(value)
  }
  return (
    <div className={css.bottom}>
      <TabBar
        activeKey={pathname}
        onChange={value => setRouteActive(value)}
      >
        {tabs.map(item => (
          <TabBar.Item
            key={item.key}
            icon={item.key === pathname ? item.blackIcon : item.greyIcon}
            title={item.title}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default WTabBar
