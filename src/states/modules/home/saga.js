import {
  all, fork
} from "redux-saga/effects";

function* loadRouteData() {
  //
}

function* handleActions() {

}

export default function* homeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
