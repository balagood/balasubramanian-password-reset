import { Router } from "express"
import { registerUser,forgotPassword, verifyToken, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);  
router.post("/forgot-password", forgotPassword);
router.get("/verify-token/:token", verifyToken);
router.post("/reset-password", resetPassword);

export default router;
