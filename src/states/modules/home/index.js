import {createSlice} from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isOpenLoginModal: false
  },
  reducers: {
    setIsLoginModal: (state, action) => ({
      ...state,
      isOpenLoginModal: action.payload
    }),
  }
})

export const {
    setIsLoginModal,
} = homeSlice.actions

export default homeSlice.reducer;
