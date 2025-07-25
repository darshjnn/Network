import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleLikeComment = createAsyncThunk(
    "/posts/toggle_comment_like",
    async (comment, thunkApi) => {
        try {
            const response = await clientServer.post("/post/comment/toggle_comment_like", {
                token: localStorage.getItem("token"),
                commentId: comment.commentId
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);