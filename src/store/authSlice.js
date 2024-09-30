import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false }, // исправлено на isAuthenticated
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setLoggedOut(state) {
      state.isAuthenticated = false;
    },
  },
});


export const authActions = authSlice.actions
export default authSlice