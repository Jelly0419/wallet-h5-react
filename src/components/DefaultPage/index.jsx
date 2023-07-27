import React from 'react'
import { SpinLoading } from 'antd-mobile'
import css from './index.module'
import retryLogo from '@/assets/png/retryLogo.png'
import Method from '@/utils/Method'
const defaultPage = props => {
  const { status, msg, maxHeight } = props
  const render = () => {
    switch (status) {
      case 'load':
        return (
          <div
            className={css.load}
            style={{ height: maxHeight }}
          >
            <SpinLoading
              style={{ '--size': '32px' }}
              color="#ef2780"
            ></SpinLoading>
            <p>{msg || '页面加载中'}</p>
          </div>
        )
      case 'retry':
        return (
          <div className={css.load}>
            <img src={retryLogo} />
            <div className={css.text}>{msg || '信号可能发生了异常'}</div>
            <div
              className={css.btn}
              onClick={() => window.location.reload()}
            >
              刷新试试
            </div>
          </div>
        )

      case 'login':
        return (
          <div className={css.load}>
            <div
              className={css.btn}
              onClick={() => Method.login()}
            >
              请登录查看
            </div>
          </div>
        )
    }
  }
  return render()
}
export default defaultPage
