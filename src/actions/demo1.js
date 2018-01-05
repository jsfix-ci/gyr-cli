import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// 此处可替换为数据请求
function fetch () {
  var p = new Promise(function (resolve, reject) {
    var arr = ['fangbao', 'lichenglong', 'hanxinran', 'jiaxiangheng']
    var index = parseInt(Math.random() * 3)
    setTimeout(() => {
      resolve({result: {name: arr[index]}})
    }, 1000)
  })
  return p
}

function * fetchUser (action) {
  yield put({type: 'loading show'})
  try {
    const user = yield call(fetch, action.payload.userId)
    yield put({type: 'USER_FETCH_SUCCEEDED', user: user})
    yield put({type: 'loading hidden'})
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message})
    yield put({type: 'loading hidden'})
  }
}
function * mySaga () {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}
export default mySaga
