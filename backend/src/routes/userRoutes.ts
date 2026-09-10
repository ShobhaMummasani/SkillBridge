import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController";
import { protect } from "../middleware/auth";

const router = Router();
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
