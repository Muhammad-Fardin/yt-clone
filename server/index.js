import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/comments", commentRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const runServer = () => {
  mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => {
      console.log("Database Engaged");
    })
    .then(() => {
      app.listen(process.env.PORT);
    })
    .then(() => {
      console.log(`Server Running at http://localhost:${process.env.PORT}`);
    })
    .catch((err) => {
      throw err;
    });
};

runServer();
