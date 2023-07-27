import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/styles/main.scss'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import 'lib-flexible'
import Method from '@/utils/Method'
import store from './store/store'
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css'
import DefaultPage from './components/DefaultPage'

import { PetraWallet } from 'petra-plugin-wallet-adapter'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'

window.store = store
// 创建app根节点
const appEl = document.createElement('div')
// 设置id
appEl.id = 'app'
// 追加节点到body中
document.body.appendChild(appEl)

// 最新版本使用的是ReactDOM.createRoot
// 如果使用ReactDOM.render()控制台会报warnning错误
const root = ReactDOM.createRoot(appEl)
let token = Method.getUrlValue('htoken')
if (token) {
  Method.removeUrlToken()
}

// 渲染
const wallets = [new PetraWallet()]
root.render(
  <React.Suspense
    fallback={
      <DefaultPage
        status={'load'}
        maxHeight={'100vh'}
      />
    }
  >
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={error => {
        console.log('error', error)
      }}
    >
      <RouterProvider router={router} />
    </AptosWalletAdapterProvider>
  </React.Suspense>
)
