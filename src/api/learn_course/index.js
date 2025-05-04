import { startAnswerQuestion, startAnswerQuestionFail, startAnswerQuestionSuccess, startCheckLesson, startCheckLessonFail, startCheckLessonSuccess } from "@/states/modules/learn_course";
import callApi from "../callApi";

export const checkedLesson = (lessonId) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `/lessons/${lessonId}/check`,
    actionTypes: [
      startCheckLesson,
      startCheckLessonSuccess,
      startCheckLessonFail,
    ],
    variables: {},
    dispatch,
    getState,
  });
}

export const answerQuestion = (questionId, options) => async (dispatch, getState) => {
  return callApi({
    method: "post",
    apiPath: `/questions/${questionId}/answer`,
    actionTypes: [
      startAnswerQuestion,
      startAnswerQuestionSuccess,
      startAnswerQuestionFail,
    ],
    variables: { options },
    dispatch,
    getState,
  });
}