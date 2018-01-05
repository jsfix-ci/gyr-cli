/**
 * user actions
 */
import { createActions } from 'redux-actions'
import { loginStateRequest, bbsUserInfoRequest } from '@/util/api'

export const fetchUserInfo = payload => dispatch => {
  bbsUserInfoRequest().then(res => {
    if (res.result) {
      dispatch({type: 'change user info', userinfo: res.result.data})
    }
  })
}

export const fetchLoginState = (payload) => dispatch => {
  loginStateRequest().then(res => {
    if (res.result) {
      var loginState = res.result.status === 1 ? 'logined' : 'nologin'
      dispatch({type: 'change login state', loginState})
    }
  })
}
