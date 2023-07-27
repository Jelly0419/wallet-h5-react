import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Mask, SpinLoading } from 'antd-mobile'
class Loading {
  constructor() {
    this.div = document.createElement('div')
    this.div.id = 'app-loading'
  }

  showLoading = msg => {
    const root = ReactDOM.createRoot(this.div)
    root.render(
      <Mask
        visible={true}
        opacity="thin"
      >
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ef2780',
            flexDirection: 'column'
          }}
        >
          <SpinLoading
            style={{ '--size': '32px' }}
            color="#ef2780"
          ></SpinLoading>
          <p style={{ marginTop: '20px', fontSize: 14 }}>{msg || '页面加载中'}</p>
        </div>
      </Mask>
    )
    document.body.appendChild(this.div)
  }

  hideLoading = () => {
    const root = document.getElementById('app-loading')
    if (root) {
      document.body.removeChild(this.div)
    }
  }
}

const loading = new Loading()
export default loading
