import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Posts by Username
export const getUsernamePosts = createAsyncThunk(
    "posts/user_posts",
    async (user, thunkApi) => {
        try {
            const response = await clientServer.post("/posts/user_posts", {
                token: localStorage.getItem("token"),
                username: user.username
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);