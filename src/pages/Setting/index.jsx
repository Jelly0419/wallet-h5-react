import React from 'react'
import css from './index.module'
import TopNav from '@/components/Top'
import { RightOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import Method from '@/utils/Method'
import cookie from 'react-cookies'
import { Dialog } from 'antd-mobile'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { bindWallet } from '@/api/setting/setting'
const Setting = () => {
  const { account, disconnect } = useWallet()
  const settingList = [
    {
      title: '绑定/解绑钱包',
      fn: () => bindWalletFn(),
      show: account ? true : false
    },
    {
      title: '断开连接钱包',
      fn: () => {
        disconnect()
        navigate('/wallet')
      },
      show: account ? true : false
    },
    {
      title: '积分明细',
      show: true
    },
    {
      title: '兑换',
      show: true
    }
  ]
  const navigate = useNavigate()
  const settingFn = item => {
    console.log(item)
    if (item.fn) {
      item.fn()
    }
  }
  const bindWalletFn = async () => {
    if (account) {
      const res = await bindWallet({
        accAddress: account.address
      })
    }
  }
  const logOut = () => {
    Dialog.show({
      title: '确认退出登录吗？',
      content: '退出登录后，将无法接收会话与系统消息提醒。',
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
            key: 'logout',
            text: '退出登录'
          }
        ]
      ],
      style: {
        '--border-radius': '20px'
      },
      bodyStyle: {
        textAlign: 'center'
      },
      onAction: res => {
        switch (res.key) {
          case 'logout':
            cookie.remove('htoken')
            Method.login()
            break
          case 'cancel':
            break
          default:
            break
        }
      }
    })
  }
  return (
    <div className={css.box}>
      <div className="top">
        <TopNav title={'无忧积分'} />
      </div>
      <main>
        {settingList.map((item, idx) => {
          if (item.show) {
            return (
              <div
                className="list"
                key={idx}
                onClick={() => settingFn(item)}
              >
                <div className="left">{item.title}</div>
                <div className="right">
                  <RightOutline />
                </div>
              </div>
            )
          }
        })}
      </main>
      <footer>
        <div
          className="button"
          onClick={logOut}
        >
          退出登录
        </div>
      </footer>
    </div>
  )
}
export default Setting
