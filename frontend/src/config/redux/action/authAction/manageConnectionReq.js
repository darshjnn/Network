import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const manageConnectionReq = createAsyncThunk(
    "user/manage_request",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/connections/manage_connection", {
                token: localStorage.getItem("token"),
                requestId: user.requestId,
                action: user.action
            });
            
            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);