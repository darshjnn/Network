import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../action/postAction/getPosts";
import { createPost } from "../../action/postAction/createPost";

const initialState = {
    loggedIn: false,
    isError: false,
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
                state.postFetched = true;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.message = "Wait while creating a new post...";
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.postFetched = true;
            })
            .addCase(createPost.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset, resetPostId } = postSlice.actions;

export default postSlice.reducer;