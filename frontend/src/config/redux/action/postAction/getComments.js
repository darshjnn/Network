import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
    "posts/comments",
    async (post, thunkApi) => {
        try {
            const response = await clientServer.post("/post/comment/comments", {
                token: localStorage.getItem("token"),
                postId: post.postId
            });

            return thunkApi.fulfillWithValue(response.data);
            
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);