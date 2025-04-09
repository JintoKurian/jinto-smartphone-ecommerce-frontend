import { createSlice } from "@reduxjs/toolkit";
import { getToken, getUser } from "../../utils/auth";


const initialState = {
    token: getToken() || null,
    user: getUser() || null,
    isAuthenticated: !!getToken(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
          },
          logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.clear();
          },
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;