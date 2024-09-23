import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null, 
    loading: false,
    token: localStorage.getItem('token') || null 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.token = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

export const { setUser, setToken, clearUser, setLoading } = authSlice.actions;

export default authSlice.reducer;