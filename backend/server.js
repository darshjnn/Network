if (process.env.NODE_ENV != 'PRODUCTION') {
    await import('dotenv/config');
}

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = 8080;

app.use(cors);
app.use(express.json());

// Fetching URL for connecting with the DB
const MONGO_URL = process.env.MONGO_URL;
const ATLAS_URL = process.env.ATLAS_URL;

// console.log(process.env.MONGO_URL);
// console.log(process.env.ATLAS_URL);

// Starting the App and connect to Local/Cloud DB
const start = async () => {
    const connectDB = await mongoose.connect(MONGO_URL);
    console.log('Connected to Network Application Database')

    app.listen(port, () => {
        console.log(`Listening on ${port}`);
    })
}

start();
