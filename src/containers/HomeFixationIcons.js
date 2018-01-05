/**
 * 首页固定的菜单
 */

import React, { Component } from 'react'

import GoTop from '@/components/common/GoTop'
import Service from '@/components/common/Service'
import Test from '@/components/Test'
export default class extends Component {
  render () {
    const { className } = this.props
    return (
      <div className={className}>
        <Test />
        <Service />
        <GoTop />
      </div>
    )
  }
}
