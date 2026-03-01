import { Router } from "express"
import {loginUser,registerUser,forgotPassword, verifyToken, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login",loginUser);
router.post("/register", registerUser);  
router.post("/forgot_password", forgotPassword);
router.get("/verify_token/:token", verifyToken);
router.post("/reset_password", resetPassword);

export default router;
