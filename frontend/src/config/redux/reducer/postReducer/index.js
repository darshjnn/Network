import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../action/postAction/getPosts";
import { createPost } from "../../action/postAction/createPost";
import { getUserPosts } from "../../action/postAction/getUserPosts";
import { deletePost } from "../../action/postAction/deletePost";
import { toggleArchivePost } from "../../action/postAction/toggleArchivePost";
import { toggleLikePost } from "../../action/postAction/toggleLikePost";
import { getComments } from "../../action/postAction/getComments";
import { postComment } from "../../action/postAction/postComment";

const initialState = {
    loggedIn: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    postFetched: false,
    message: "",
    posts: undefined,
    comment: undefined,
    postId: ""
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: () => initialState,
        resetComment: (state) => {
            state.comment = undefined;
            state.postId = "";
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
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while fetching the comments...";
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postId = action.payload.postId;
                state.comment = action.payload.comments;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(postComment.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while posting the comments...";
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(postComment.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, resetComment } = postSlice.actions;

export default postSlice.reducer;