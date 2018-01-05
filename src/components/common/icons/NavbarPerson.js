import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styles from '@/stylus/icons/navbar-person'
class NavbarPerson extends Component {
  render () {
    const { style, history } = this.props
    return (
      <div onClick={() => history.push('/mine')} style={style} className={styles.person}></div>
    )
  }
}
export default withRouter(NavbarPerson)
