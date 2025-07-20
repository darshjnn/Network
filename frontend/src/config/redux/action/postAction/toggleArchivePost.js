import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleArchivePost = createAsyncThunk(
    "posts/toggle_archive_post",
    async (post, thunkApi) => {
        try {
            const response = await clientServer.post("/posts/toggle_archive_post", {
                token: localStorage.getItem("token"),
                postId: post.postId
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);