import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProfilePicture = createAsyncThunk(
    "user/update_profile",
    async (profile, thunkApi) => {
        const formData = new FormData();

        formData.append("profilePicture", profile.profilePicture);
        formData.append("token", localStorage.getItem("token"));

        try {
            const response = await clientServer.post("/user/update_profile_picture", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return thunkApi.fulfillWithValue(response.data);

        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
);