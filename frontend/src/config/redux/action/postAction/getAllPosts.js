import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk(
    "/posts",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/posts", {
                token: localStorage.getItem("token")
            });
            
            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);