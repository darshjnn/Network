import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const acceptedConnections = createAsyncThunk(
    "user/accepted_connections",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/connections/accepted_connections", {
                token: localStorage.getItem("token")
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);