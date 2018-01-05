import React from 'react'

import Bundle from '@/components/common/Bundle'

import loadIndex from 'bundle-loader?lazy&name=[name]!@/pages/index'
import loadDemo1 from 'bundle-loader?lazy&name=[name]!@/pages/demo1'
import loadDemo2 from 'bundle-loader?lazy&name=[name]!@/pages/demo2'
import loadDemo3 from 'bundle-loader?lazy&name=[name]!@/pages/demo3'
import loadLogin from 'bundle-loader?lazy&name=[name]!@/pages/login'

export const Index = (props) => (
  <Bundle load={loadIndex}>
    {(Index) => <Index {...props}/>}
  </Bundle>
)
export const Demo1 = (props) => (
  <Bundle load={loadDemo1}>
    {(Demo1) => <Demo1 {...props}/>}
  </Bundle>
)
export const Demo2 = (props) => (
  <Bundle load={loadDemo2}>
    {(Demo2) => <Demo2 {...props}/>}
  </Bundle>
)
export const Demo3 = (props) => (
  <Bundle load={loadDemo3}>
    {(Demo3) => <Demo3 {...props}/>}
  </Bundle>
)
export const Login = (props) => (
  <Bundle load={loadLogin}>
    {(Login) => <Login {...props}/>}
  </Bundle>
)
