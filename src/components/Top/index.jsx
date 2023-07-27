import React from 'react'
import css from './index.module'
import { NavBar } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'

const TopNav = props => {
  const { title, goback } = props
  const goBack = () => {
    if (goback) {
      goback()
    }
    window.history.go(-1)
  }
  return (
    <div className={css.topNav}>
      <NavBar
        onBack={goBack}
        backArrow={
          <div className="navbar-icon">
            <LeftOutline />
          </div>
        }
      >
        {title}
      </NavBar>
    </div>
  )
}
export default TopNav
