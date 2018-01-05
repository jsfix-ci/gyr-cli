import React from 'react'

declare function require(path: string): any

// import * as styles from '../stylus/login'
const styles = require('@/stylus/login')

console.log(styles, 'style')

class Login extends React.Component {
  public render() {
    return (
      <div>
        login
      </div>
    )
  }
}

export default Login
