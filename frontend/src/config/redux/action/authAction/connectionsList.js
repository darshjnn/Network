import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectionsList = createAsyncThunk(
    "user/connections_list",
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