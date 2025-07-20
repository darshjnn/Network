import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleLikePost = createAsyncThunk(
    "/posts/toggle_post_like",
    async (post, thunkApi) => {
        try {
            const response = await clientServer.post("/posts/toggle_post_like", {
                token: localStorage.getItem("token"),
                postId: post.postId
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
)