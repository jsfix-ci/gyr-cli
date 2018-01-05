import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducers from '@/reducers'
import mySaga from '@/actions/demo1'
const sagaMiddleware = createSagaMiddleware()
let middleware = [thunkMiddleware, sagaMiddleware]
let store = createStore(reducers, applyMiddleware(...middleware))
sagaMiddleware.run(mySaga)
export default store
