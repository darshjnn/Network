import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const currentUser = createAsyncThunk(
    "user/current_user",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/user/current_user", {
                token: user.token
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);