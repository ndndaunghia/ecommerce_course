import {
  all, fork,
  put,
  takeLatest
} from "redux-saga/effects";
import { setErrorLogin, startRequestGetMe, startRequestGetMeSuccess, startRequestLoginFail, startRequestLoginSuccess } from "../auth";
import { setAuthToken, setUserId } from "@/utils/localStorage";
import { handleNotification } from "@/utils/helper";
import { setIsLoginModal } from ".";
import _ from "lodash";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.data.token;
    let userId = action.payload.data.data.user.id;
    setAuthToken(token);
    setUserId(userId);
    
    yield put(startRequestGetMe());
    yield handleNotification('success', 'Đăng nhập thành công.');
    yield put(setIsLoginModal(false))
  });

  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.status

    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorLogin({
        email: _.get(errors, 'email', ''),
        password: _.get(errors, 'password', '')
      }));
      handleNotification('error', action.payload.data.detail);
    } else if (statusError === 401) {
      handleNotification('error', action.payload.data.message);
    } else {
      handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
