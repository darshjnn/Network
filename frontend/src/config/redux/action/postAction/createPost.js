import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
    "/posts/create_post",
    async (userData, thunkApi) => {
        const { file, body } = userData;
        try {
            const formData = new FormData();
            formData.append("token", localStorage.getItem("token"));
            formData.append("body", body);
            formData.append("media", file);

            const response = await clientServer.post("/posts/create_post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                return thunkApi.fulfillWithValue({ status: response.status });
            } else {
                return thunkApi.rejectWithValue(response.data);
            }

        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);