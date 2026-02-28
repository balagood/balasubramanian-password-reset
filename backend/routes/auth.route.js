import { Router } from "express"
import { registerUser,forgotPassword, verifyToken, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", registerUser);  
router.post("/forgot-password", forgotPassword);
router.get("/verify_token/:token", verifyToken);
router.post("/reset_password", resetPassword);

export default router;
