import { loginSubmit } from '../reducers/auth';
import { takeLatest } from '@redux-saga/core/effects';
function* handleLoginSubmit() {}

function* authSaga() {
  yield takeLatest(loginSubmit.type, handleLoginSubmit);
}

export default authSaga;
