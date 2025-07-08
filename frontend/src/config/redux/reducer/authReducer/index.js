import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../../action/authAction";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    profileFetched: false,
    connections: [],
    connectioRequest: []
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
    }
});

export const { reset, handleUserLogin, clearMessage } = authSlice.actions;

export default authSlice.reducer;