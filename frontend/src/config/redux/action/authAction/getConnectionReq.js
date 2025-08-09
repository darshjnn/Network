import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getConnectionReq = createAsyncThunk(
    "user/get_requests",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/connections/get_requests", {
                token: localStorage.getItem("token")
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);