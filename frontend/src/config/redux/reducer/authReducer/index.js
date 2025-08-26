import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "../../action/authAction/loginUser";
import { currentUser } from "../../action/authAction/currentUser";
import { logout } from "../../action/authAction/logout";
import { registerUser } from "../../action/authAction/registerUser";
import { connectionsList } from "../../action/authAction/connectionsList";
import { sendConnectionReq } from "../../action/authAction/sendConnectionReq";
import { manageConnectionReq } from "../../action/authAction/manageConnectionReq";
import { getConnectionReq } from "../../action/authAction/getConnectionReq";
import { acceptedConnections } from "../../action/authAction/acceptedConnections";
import { updateProfilePicture } from "../../action/authAction/updateProfilePicture";

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
    connectionRequest: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleUserLogin: (state) => {
            state.message = "What's upp!!!";
        },
        clearAuthMessage: (state) => {
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
            .addCase(connectionsList.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to fetch Connections...";
            })
            .addCase(connectionsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.connections = action.payload;
            })
            .addCase(connectionsList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.connections = false;
                state.message = action.payload;
            })
            .addCase(sendConnectionReq.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to send connection...";
            })
            .addCase(sendConnectionReq.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(sendConnectionReq.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(manageConnectionReq.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to update connection status...";
            })
            .addCase(manageConnectionReq.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(manageConnectionReq.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getConnectionReq.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to fetch connection requests...";
            })
            .addCase(getConnectionReq.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.connectionRequest = action.payload;
            })
            .addCase(getConnectionReq.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(acceptedConnections.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to fetch accepted connection...";
            })
            .addCase(acceptedConnections.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.connections = action.payload;
            })
            .addCase(acceptedConnections.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProfilePicture.pending, (state) => {
                state.isLoading = true;
                state.message = "Trying to change Profile Picture...";
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, handleUserLogin, clearAuthMessage } = authSlice.actions;

export default authSlice.reducer;