if (process.env.NODE_ENV != 'PRODUCTION') {
    await import('dotenv/config');
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import profileRoute from "./routes/profile.routes.js";
import searchRoutes from "./routes/search.routes.js";

const app = express();
const port = 8080;

// Fetching URL for connecting with the DB
const MONGO_URL = process.env.MONGO_URL;
const ATLAS_URL = process.env.ATLAS_URL;

// console.log(process.env.MONGO_URL);
// console.log(process.env.ATLAS_URL);

// Starting the App and connect to Local/Cloud DB
const start = async () => {
    const connectDB = await mongoose.connect(MONGO_URL);
    console.log('Connected to Network Application Database');

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    });
}
start();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Root
app.get('/', (req, res) => {
    res.redirect('/posts');
})

// Routing to Post Route
app.use('/posts', postRoutes);

// Routing to User Route
app.use('/user', userRoutes);

// Routing to User Profile Route
app.use('/profile', profileRoute);

// Routing to Search Route
app.use('/search', searchRoutes);