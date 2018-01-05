import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'

class App extends Component {
  componentWillMount () {
  }
  render () {
    const { loading, ajaxCount } = this.props
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}
export default withRouter(connect(({common}) => {
  return common
})(App))
