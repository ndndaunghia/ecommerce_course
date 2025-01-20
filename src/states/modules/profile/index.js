import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'profile',
  initialState: {
    errorInformation: {
      name: '',
      email: '',
      phone: '',
      avatar: '',
    },
    isLoadingBtnInformation: false,
    dataChangePassword: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    errorChangePassword: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    isLoadingBtnChangePassword: false,
  },
  reducers: {
    setErrorInformation: (state, action) => ({
      ...state,
      errorInformation: action.payload,
    }),
    startRequestUpdateInformation: (state) => ({
      ...state,
      isLoadingBtnInformation: true,
    }),
    startRequestUpdateInformationSuccess: (state) => ({
      ...state,
      isLoadingBtnInformation: false,
    }),
    startRequestUpdateInformationFail: (state) => ({
      ...state,
      isLoadingBtnInformation: false,
    }),
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload,
    }),
    setDataChangePassword: (state, action) => ({
      ...state,
      dataChangePassword: action.payload,
    }),
    startRequestChangePassword: (state) => ({
      ...state,
      isLoadingBtnChangePassword: true,
    }),
    requestChangePasswordSuccess: (state) => ({
      ...state,
      isLoadingBtnChangePassword: false,
    }),
    requestChangePasswordFail: (state) => ({
      ...state,
      isLoadingBtnChangePassword: false,
    }),
  },
});

export const {
  setErrorInformation,
  setErrorChangePassword,
  setDataChangePassword,
  startRequestUpdateInformation,
  startRequestUpdateInformationSuccess,
  startRequestUpdateInformationFail,
  startRequestChangePassword,
  requestChangePasswordSuccess,
  requestChangePasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
