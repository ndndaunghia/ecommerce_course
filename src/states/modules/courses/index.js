import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [], // Danh sách tất cả khóa học
    pagination: { // Thông tin phân trang
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      has_more_pages: false,
    },
    course: null, // Chi tiết khóa học
    myCourses: { courses: [], pagination: {} },
    isLoading: false,
    error: null,
    paymentUrl: null,
  },
  reducers: {
    // Lấy danh sách khóa học
    startRequestCourses(state) {
      state.isLoading = true;
      state.error = null;
    },
    startRequestCoursesSuccess(state, action) {
      state.courses = action.payload.data.data.courses.data;
      state.pagination = {
        total: action.payload.data.data.courses.total,
        per_page: action.payload.data.data.courses.per_page,
        current_page: action.payload.data.data.courses.current_page,
        last_page: action.payload.data.data.courses.last_page,
        has_more_pages: action.payload.data.data.courses.has_more_pages,
      };
      state.isLoading = false;
    },
    startRequestCoursesFail(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Lấy chi tiết khóa học
    startRequestCourse(state) {
      state.isLoading = true;
      state.error = null;
    },
    startRequestCourseSuccess(state, action) {
      state.course = action.payload.data.data;
      state.isLoading = false;
    },
    startRequestCourseFail(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Thêm khóa học vào "khóa học của tôi"
    startAddCourse(state) {
      state.isLoading = true;
      state.error = null;
    },
    startAddCourseSuccess(state, action) {
      // state.myCourses.courses.push(action.payload.data.data);
      state.isLoading = false;
    },
    startAddCourseFail(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    startPurchaseCourse(state) {
      state.isLoading = true;
      state.error = null;
      state.paymentUrl = null; // Reset URL khi bắt đầu
    },
    startPurchaseCourseSuccess(state, action) {
      state.paymentUrl = action.payload.data.data.payment_url; // Giả sử API trả về URL thanh toán
      state.isLoading = false;
    },
    startPurchaseCourseFail(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Reset payment URL sau khi sử dụng (tùy chọn)
    resetPaymentUrl(state) {
      state.paymentUrl = null;
    },

    startGetMyCourses(state) {
      state.isLoading = true;
      state.error = null;
    },
    startGetMyCoursesSuccess(state, action) {
      state.myCourses = action.payload.data.data;
      state.isLoading = false;
    },
    startGetMyCoursesFail(state, action) {
      state.error = action.payload;
      state.isLoading = false
    },
  },
});

export const {
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
  resetPaymentUrl,
  startGetMyCourses,
  startGetMyCoursesSuccess,
  startGetMyCoursesFail,
} = courseSlice.actions;

export default courseSlice.reducer;