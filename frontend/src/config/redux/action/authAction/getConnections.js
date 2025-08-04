import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getConnections = createAsyncThunk(
    "user/get_connections",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/connections/connections_list", {
                token: localStorage.getItem("token"),
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);