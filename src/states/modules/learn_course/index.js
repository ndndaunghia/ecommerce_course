import { createSlice } from "@reduxjs/toolkit";

const learnCourseSlice = createSlice({
    name: "learnCourse",
    initialState: {
        isCheckingLesson: false,
        isAnsweringQuestion: false,
        checkedLesson: null,
        answeredQuestion: null, 
    },
    reducers: {
        startCheckLesson(state) {
            state.isCheckingLesson = true;
        },
        startCheckLessonSuccess(state, action) {
            state.isCheckingLesson = false;
            state.checkedLesson = action.payload;
        },
        startCheckLessonFail(state) {
            state.isCheckingLesson = false;
            state.checkedLesson = null;
        },
        startAnswerQuestion(state) {
            state.isAnsweringQuestion = true;
        },
        startAnswerQuestionSuccess(state, action) {
            state.isAnsweringQuestion = false;
            state.answeredQuestion = action.payload;
        },
        startAnswerQuestionFail(state) {
            state.isAnsweringQuestion = false;
            state.answeredQuestion = null;
        },
    }
})

export const {
    startCheckLesson,
    startCheckLessonSuccess,
    startCheckLessonFail,
    startAnswerQuestion,
    startAnswerQuestionSuccess,
    startAnswerQuestionFail
} = learnCourseSlice.actions;

export default learnCourseSlice.reducer;