import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../../action/authAction/loginUser";
import { currentUser } from "../../action/authAction/currentUser";
import { logout } from "../../action/authAction/logout";
import { registerUser } from "../../action/authAction/registerUser";

const initialState = {
    user: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    userFetched: false,
    profileFetched: false,
    connections: undefined,
    connectioRequest: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleUserLogin: (state) => {
            state.message = "What's upp!!!";
        },
        clearMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Knocking the door...";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Welcome!!!";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to create a room for you..."
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Welcome to the family!!!";
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(currentUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to fetch User information...";
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "User information fetched!!!";
                state.userFetched = true;
                state.user = action.payload;
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.userFetched = false;
                state.message = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to fetch User information...";
            })
            .addCase(logout.fulfilled, () => {
                return initialState;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, handleUserLogin, clearMessage } = authSlice.actions;

export default authSlice.reducer;