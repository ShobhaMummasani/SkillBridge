import { Router } from "express";
import { getJobs, getJobById, createJob, updateJob, deleteJob, getMyJobs } from "../controllers/jobController";
import { protect, requireRole } from "../middleware/auth";

const router = Router();

router.get("/", getJobs);
router.get("/mine", protect, requireRole("recruiter"), getMyJobs);
router.get("/:id", getJobById);
router.post("/", protect, requireRole("recruiter"), createJob);
router.put("/:id", protect, requireRole("recruiter"), updateJob);
router.delete("/:id", protect, requireRole("recruiter"), deleteJob);

export default router;
