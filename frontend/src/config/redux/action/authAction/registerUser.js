import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    "user/signup",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/user/signup", {
                username: user.username,
                password: user.password,
                email: user.email,
                name: user.name
            });

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);