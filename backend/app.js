import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  console.log("Serving React frontend...");
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} else {
  console.log("Running in development mode...");
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

export default app;
