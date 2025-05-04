import { all, fork, put, takeLatest } from "redux-saga/effects";
import { startAddCourseSuccess } from ".";
import { handleNotification } from "@/utils/helper";
import { getMyCourses } from "@/api/courses";
import { getUserId } from "@/utils/localStorage";

function* handleAddCourseSuccess(action) {
    yield handleNotification('success', 'Thêm khóa học thành công.');
  
    // Gọi getMyCourses trong background để đồng bộ dữ liệu
    const userId = getUserId();
    if (userId) {
      yield put(getMyCourses(userId));
    }
  }
  
  function* handleActions() {
    yield takeLatest(startAddCourseSuccess, handleAddCourseSuccess);
  }

export default function* courseSaga() {
    yield all([
        fork(handleActions)
    ]);
}