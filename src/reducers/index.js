import { combineReducers } from 'redux'
import common from './common'
import topic from './topic'
import user from './user'
import demo1 from './demo1'
export default combineReducers({
  common,
  topic,
  user,
  demo1
})
