import React from 'react'
import { Alert } from 'antd'
import P from '@/plugins/alert/index'
import { connect } from 'react-redux'
class Demo1 extends React.Component {
  constructor (props) {
    super(props)
    console.log('constructor')
  }
  handleClick () {
    const { dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: 1})
    // P.show({
    //   content: '确认跳转到demo2吗',
    //   confirm: () => {
    //     this.props.history.push('demo2')
    //   }
    // })
  }
  render () {
    const { userInfo, loading } = this.props
    console.log(loading, 'loading')
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}> demo 1</button>{loading !== undefined ? (loading ? '请求中...' : '请求成功') : ''}
        <div>name: {userInfo.name}</div>
        <Alert message="Warning text" type="warning" closable onClose={this.handleClick.bind(this)}/>
      </div>
    )
  }
}
export default connect(({demo1, common}) => {
  console.log(demo1, common)
  return {
    ...demo1,
    ...common
  }
})(Demo1)
