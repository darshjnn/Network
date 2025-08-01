import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Posts of Current User
export const getCurrUserPosts = createAsyncThunk(
    "posts/my_posts",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/posts/my_posts", {
                token: localStorage.getItem("token")
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);
