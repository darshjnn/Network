import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendConnectioReq = createAsyncThunk(
    "user/send_request",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/connections/send_request", {
                token: localStorage.getItem("token"),
                connectionId: user.userId
            });
            
            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);