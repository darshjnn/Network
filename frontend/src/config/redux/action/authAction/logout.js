import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
    "user/logout",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/user/logout", {
                token: user.token
            });

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);

        }
    }
);