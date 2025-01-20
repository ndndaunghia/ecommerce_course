import {
  all, fork,
  put,
  takeLatest
} from "redux-saga/effects";
import { startRequestLoginSuccess } from "../auth";
import { setAuthToken } from "@/utils/localStorage";
import { handleNotification } from "@/utils/helper";
import { setIsLoginModal } from ".";

function* loadRouteData() {
  //
}

function* handleActions() {
  yield takeLatest(startRequestLoginSuccess, function* (action) {
    let token = action.payload.data.data.token;
    setAuthToken(token);
    yield handleNotification('success', 'Đăng nhập thành công.');
    yield put(setIsLoginModal(false))
  });
}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
