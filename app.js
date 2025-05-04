import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(
  cors({
    origin: "https://amritamlatur.netlify.app", // ✅ CORS fixed
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("https://mernstack-p8ts.onrender.com", reservationRouter);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;

