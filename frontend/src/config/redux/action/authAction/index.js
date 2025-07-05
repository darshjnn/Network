import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/user/login", {
                email: user.email,
                password: user.password
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            } else {
                return thunkApi.rejectWithValue({
                    message: "Token not provided..."
                });
            }

            return thunkApi.fulfillWithValue(response.data.token);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/signup",
    async (user, thunkApi) => {
        
    }
)