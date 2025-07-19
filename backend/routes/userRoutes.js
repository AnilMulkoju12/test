import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

// 🏠 Protected dashboard route
userRouter.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your Dashboard 🎉",
    user: req.user, // Decoded JWT info
  });
});

// // 👤 Protected profile route
// userRouter.get("/profile", verifyToken, (req, res) => {
//   res.json({
//     message: "This is your profile page.",
//     user: req.user,
//   });
// });

export default userRouter;
