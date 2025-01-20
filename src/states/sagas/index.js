import {fork, all} from 'redux-saga/effects';
import appSaga from '@/states/modules/app/saga.js';
import profileSaga from '@/states/modules/profile/saga.js';
import routeSaga from '@/states/modules/routing/saga';

export default function* sagas() {
  yield all([
    fork(routeSaga),
    fork(profileSaga),
    fork(appSaga),
  ]);
}
