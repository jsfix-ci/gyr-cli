import React, { Component } from 'react'
import store from '@/stores'
export default class extends Component {
  handleClick () {
    const index = store.getState().topic.selectedNavbarIndex
    mui('#refreshContainer_' + index).pullRefresh().scrollTo(0, 0, 100)
  }
  render () {
    const { className, onClick } = this.props
    return (
      <div onClick={this.handleClick.bind(this)} className={className} style={styles.icon}></div>
    )
  }
}
const styles = {
  icon: {
    background: 'url("' + require('@/imgs/bt_sq_top@2x.png') + '") center / 1.4rem 1.4rem no-repeat',
    width: '1.4rem',
    height: '1.4rem'
  }
}
