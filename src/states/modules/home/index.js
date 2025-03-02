import {createSlice} from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isOpenLoginModal: false,
    isOpenSignUpModal: false,
  },
  reducers: {
    setIsLoginModal: (state, action) => ({
      ...state,
      isOpenLoginModal: action.payload
    }),
    setIsSignUpModal: (state, action) => ({
      ...state,
      isOpenSignUpModal: action.payload
    }),
  }
})

export const {
    setIsLoginModal,
    setIsSignUpModal
} = homeSlice.actions

export default homeSlice.reducer;
