import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postComment = createAsyncThunk(
  "posts/post_comment",
    async (commentData, thunkApi) => {
        try {
            const response = await clientServer.post("/post/comment/post_comment", {
                token: localStorage.getItem("token"),
                postId: commentData.postId,
                body: commentData.body
            });

            return thunkApi.fulfillWithValue(response.data);
            
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }  
);