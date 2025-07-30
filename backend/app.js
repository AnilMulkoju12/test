import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import clientRoutes from "./routes/clientManagementRoutes.js"
import cors from 'cors';

dotenv.config();

const app = express();
// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // if using cookies/auth headers
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use('/api/clients', clientRoutes); 

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
