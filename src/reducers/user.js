/**
 * user reducer
 */
import { handleActions } from 'redux-actions'
export default handleActions({
  'change user info': (state, payload) => {
    const { userinfo } = payload
    return {
      ...state,
      userinfo
    }
  },
  'change login state': (state, {loginState}) => {
    return {
      ...state,
      loginState
    }
  }
}, {
  userinfo: {},
  loginState: 'unknown' // 登录状态 unknown logined nologin
})
