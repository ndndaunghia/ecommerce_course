// Thêm vào learnCourseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const learnCourseSlice = createSlice({
    name: "learnCourse",
    initialState: {
        isCheckingLesson: false,
        isAnsweringQuestion: false,
        isUnlockingModule: false,
        checkedLesson: null,
        answeredQuestion: null,
        unlockedModule: null,
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
        startUnlockModule(state) {
            state.isUnlockingModule = true;
        },
        startUnlockModuleSuccess(state, action) {
            state.isUnlockingModule = false;
            state.unlockedModule = action.payload;
        },
        startUnlockModuleFail(state) {
            state.isUnlockingModule = false;
            state.unlockedModule = null;
        },
    }
})

export const {
    startCheckLesson,
    startCheckLessonSuccess,
    startCheckLessonFail,
    startAnswerQuestion,
    startAnswerQuestionSuccess,
    startAnswerQuestionFail,
    startUnlockModule,
    startUnlockModuleSuccess,
    startUnlockModuleFail
} = learnCourseSlice.actions;

export default learnCourseSlice.reducer;