import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePost = createAsyncThunk(
    "posts/delete_post",
    async (post, thunkApi) => {
        try {
            const response = await clientServer.post("/posts/delete_post", {
                token: localStorage.getItem("token"),
                postId: post.postId
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);