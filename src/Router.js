import React, { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
const Wallet = lazy(() => import('@/pages/Wallet'))
const Integration = lazy(() => import('@/pages/Integration'))
const Setting = lazy(() => import('@/pages/Setting'))
export default createHashRouter([
  {
    path: '*',
    element: <Integration />
  },
  {
    path: '/',
    element: <Integration />
  },
  {
    path: '/wallet',
    element: <Wallet />
  },
  {
    path: '/setting',
    element: <Setting />
  }
])
