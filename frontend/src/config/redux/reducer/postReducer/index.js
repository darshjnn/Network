import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../action/postAction/getPosts";
import { createPost } from "../../action/postAction/createPost";
import { getUserPosts } from "../../action/postAction/getUserPosts";
import { deletePost } from "../../action/postAction/deletePost";
import { toggleArchivePost } from "../../action/postAction/toggleArchivePost";
import { toggleLikePost } from "../../action/postAction/toggleLikePost";

const initialState = {
    loggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    postFetched: false,
    message: "",
    posts: [],
    comment: [],
    postId: ""
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching Posts...";
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching Posts...";
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getUserPosts.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while creating a new post...";
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postFetched = true;
                state.message = action.payload
            })
            .addCase(createPost.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while post is deleting...";
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(deletePost.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(toggleArchivePost.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while archiving a new post...";
            })
            .addCase(toggleArchivePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(toggleArchivePost.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(toggleLikePost.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while liking the post...";
            })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(toggleLikePost.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, resetPostId } = postSlice.actions;

export default postSlice.reducer;