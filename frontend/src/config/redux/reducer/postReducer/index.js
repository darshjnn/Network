import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts } from "../../action/postAction/getAllPosts";
import { createPost } from "../../action/postAction/createPost";
import { getCurrUserPosts } from "../../action/postAction/getCurrUserPosts";
import { getUsernamePosts } from "../../action/postAction/getUsernamePosts";
import { deletePost } from "../../action/postAction/deletePost";
import { toggleArchivePost } from "../../action/postAction/toggleArchivePost";
import { getAllComments } from "../../action/postAction/getAllComments";
import { postComment } from "../../action/postAction/postComment";
import { postReply } from "../../action/postAction/postReply";

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
        clearPostMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching Posts...";
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCurrUserPosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching Posts...";
            })
            .addCase(getCurrUserPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getCurrUserPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsernamePosts.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching Posts...";
            })
            .addCase(getUsernamePosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getUsernamePosts.rejected, (state, action) => {
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
                state.message = action.payload;
            })
            .addCase(createPost.rejected, (state, action) => {
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
            .addCase(deletePost.rejected, (state, action) => {
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
            .addCase(toggleArchivePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAllComments.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while fetching the comments...";
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.postId = action.payload.postId;
                state.comment = action.payload.comments;
            })
            .addCase(getAllComments.rejected, (state, action) => {
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
            .addCase(postReply.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while posting the reply...";
            })
            .addCase(postReply.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
            })
            .addCase(postReply.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, resetComment, clearPostMessage } = postSlice.actions;

export default postSlice.reducer;