import express from "express";
import { changePassword, forgotPassword, resetPassword } from "./auth.controller.js";
import { verifyToken } from "./auth.middleware.js";

const router = express.Router();

router.put("/change-password", verifyToken, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
