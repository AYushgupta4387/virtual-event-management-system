import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import eventRoutes from "./routes/event.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING || "", {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/events", eventRoutes);
