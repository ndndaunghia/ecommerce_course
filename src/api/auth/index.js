import callApi from "@/api/callApi";
import {
  startRequestForgotPassword,
  startRequestForgotPasswordFail,
  startRequestForgotPasswordSuccess,
  startRequestGetMe,
  startRequestGetMeFail,
  startRequestGetMeSuccess,
  startRequestLogin,
  startRequestLoginFail,
  startRequestLoginSuccess,
  startRequestResetPassword,
  startRequestResetPasswordSuccess,
  startRequestResetPasswordFail,
  startRequestSignUp,
  startRequestSignUpSuccess,
  startRequestSignUpFail,
} from "@/states/modules/auth";

export const login = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: '/login',
    actionTypes: [
      startRequestLogin,
      startRequestLoginSuccess,
      startRequestLoginFail,
      // startRequestGetMe,
      // startRequestGetMeSuccess,
      // startRequestGetMeFail
    ],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}

export const getMe = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: 'auth/me',
    actionTypes: [
      startRequestGetMe,
      startRequestGetMeSuccess,
      startRequestGetMeFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const forgotPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: 'auth/forgot-password',
    actionTypes: [
      startRequestForgotPassword,
      startRequestForgotPasswordSuccess,
      startRequestForgotPasswordFail
    ],
    variables: {
      email: data.email
    },
    dispatch,
    getState
  })
}

export const resetPassword = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: 'auth/reset-password',
    actionTypes: [
      startRequestResetPassword,
      startRequestResetPasswordSuccess,
      startRequestResetPasswordFail
    ],
    variables: {
      password: data.password,
      confirm_password: data.confirmPassword,
    },
    dispatch,
    getState,
    tokenOther: data.token
  })
}

export const userDetail = (id) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `user-detail/${id}`,
    actionTypes: [
      startRequestGetMe,
      startRequestGetMeSuccess,
      startRequestGetMeFail
    ],
    variables: {},
    dispatch,
    getState
  })
}

export const signUp = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: 'register',
    actionTypes: [
     startRequestSignUp,
     startRequestSignUpSuccess,
     startRequestSignUpFail
    ],
    variables: {
      email: data.email,
      password: data.password,
    },
    dispatch,
    getState
  })
}