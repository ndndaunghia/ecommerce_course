import {all, fork, takeLatest, put, call} from "redux-saga/effects";
import {
  setErrorForgotPassword,
  setErrorLogin,
  setErrorResetPassword,
  startRequestForgotPasswordFail,
  startRequestForgotPasswordSuccess,
  startRequestGetMe,
  startRequestGetMeFail,
  startRequestGetMeSuccess,
  startRequestLoginFail,
  startRequestLoginSuccess,
  startRequestResetPasswordFail,
  startRequestResetPasswordSuccess
} from "./index.js";
import {setAuthToken} from "@/utils/localStorage";
import { handleNotification } from "@/utils/helper.js";
import _ from "lodash";
import {goToPage} from "@/states/modules/app/index.js";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.token;
    setAuthToken(token);
    yield handleNotification('success', 'Đăng nhập thành công.');

    // yield put(goToPage({
    //   path: "/"
    // }))
  });
  
  yield takeLatest(startRequestLoginFail, function* (action) {
    let statusError = action.payload.status
    
    if (statusError === 400) {
      let errors = action.payload.data.detail
      console.log(action.payload.data);
      
      yield put(setErrorLogin({
        email: _.get(errors, 'email', ''),
        password: _.get(errors, 'password', '')
      }));
      handleNotification('error', action.payload.data);
    } else if (statusError === 401) {
      handleNotification('error', action.payload.data.message);
    } else {
      handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
  
  yield takeLatest(startRequestGetMeFail, function (action) {
    let status = action.payload.data.code
    if (status === 401) {
      handleNotification('error', action.payload.data.message)
    }
  });
  
  yield takeLatest(startRequestForgotPasswordSuccess, function* () {
    handleNotification('success', 'Vui lòng kiểm tra email.');
    yield put(goToPage({
      path: "/login"
    }))
  });
  
  yield takeLatest(startRequestForgotPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorForgotPassword({
        email: _.get(errors, 'email', ''),
      }));
    } else if (statusError === 401) {
      handleNotification('error', 'Thông tin email không chính xác.');
    } else {
      handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
  
  yield takeLatest(startRequestResetPasswordSuccess, function* () {
    handleNotification('success', 'Đặt lại mật khẩu thành công.');
    yield put(goToPage({
      path: "/"
    }))
  });
  
  yield takeLatest(startRequestResetPasswordFail, function* (action) {
    let statusError = action.payload.status
    if (statusError === 400) {
      let errors = action.payload.data.detail
      yield put(setErrorResetPassword({
        password: _.get(errors, 'password', ''),
        confirmPassword: _.get(errors, 'confirm_password', ''),
      }));
    } else if (statusError === 401) {
      const message = action.payload.data.message;
      handleNotification('error', (message ? message : 'Thông tin mật khẩu không hợp lệ.'));
    } else {
      handleNotification('error', 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
  });
}

export default function* loadAuthSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
