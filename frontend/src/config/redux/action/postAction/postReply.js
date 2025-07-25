import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postReply = createAsyncThunk(
    "posts/reply_comment",
    async (commentData, thunkApi) => {
        try {
            const response = await clientServer.post("/post/comment/reply_comment", {
                token: localStorage.getItem("token"),
                postId: commentData.postId,
                parentComment: commentData.parentComment,
                replyBody: commentData.body
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);