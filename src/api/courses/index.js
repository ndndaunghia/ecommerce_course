import {
    startRequestCourses,
    startRequestCoursesSuccess,
    startRequestCoursesFail,
    startRequestCourse,
    startRequestCourseSuccess,
    startRequestCourseFail,
    startAddCourse,
    startAddCourseSuccess,
    startAddCourseFail,
    startPurchaseCourse,
    startPurchaseCourseSuccess,
    startPurchaseCourseFail,
    startGetMyCourses,
    startGetMyCoursesSuccess,
    startGetMyCoursesFail,
} from "@/states/modules/courses";
import callApi from '../callApi'

export const getCourses =
    ({ page = 1, limit = 10, subject_id = "" }) =>
        async (dispatch, getState) => {
            return callApi({
                method: "get",
                apiPath: "courses",
                actionTypes: [
                    startRequestCourses,
                    startRequestCoursesSuccess,
                    startRequestCoursesFail,
                ],
                variables: { page, limit, subject_id },
                dispatch,
                getState,
            });
        };

export const getCourse = (id) => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `courses/${id}/detail`,
        actionTypes: [
            startRequestCourse,
            startRequestCourseSuccess,
            startRequestCourseFail,
        ],
        variables: {},
        dispatch,
        getState,
    });
};

export const addCourse = (courseId) => async (dispatch, getState) => {
    return callApi({
        method: "post",
        apiPath: "save-purchased-course",
        actionTypes: [startAddCourse, startAddCourseSuccess, startAddCourseFail],
        variables: { course_id: courseId },
        dispatch,
        getState,
    });
};

export const purchaseCourse =
    ({ courseId, amount }) =>
        async (dispatch, getState) => {
            return callApi({
                method: "post",
                apiPath: "vnpay-payment",
                actionTypes: [
                    startPurchaseCourse,
                    startPurchaseCourseSuccess,
                    startPurchaseCourseFail,
                ],
                variables: {
                    course_id: courseId,
                    amount: Math.floor(Number(amount)) * 100,
                },
                dispatch,
                getState,
            });
        };

export const getMyCourses = (id) => async (dispatch, getState) => {
    return callApi({
        method: "get",
        apiPath: `my-courses/${id}`,
        actionTypes: [
            startGetMyCourses,
            startGetMyCoursesSuccess,
            startGetMyCoursesFail,
        ],
        variables: {},
        dispatch,
        getState,
    });
}