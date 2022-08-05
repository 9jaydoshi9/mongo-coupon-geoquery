import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Global version 1 route
app.use("/api/v1", routes);

// Connect to db
await mongoose
  .connect(process?.env?.MongodbUrl)
  .then((res) => {
    // DB connection success, start express app
    console.log("DB connection successful !");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to database");
  });
