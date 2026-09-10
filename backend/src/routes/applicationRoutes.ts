import { Router } from "express";
import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/applicationController";
import { protect, requireRole } from "../middleware/auth";

const router = Router();

router.post("/", protect, requireRole("student"), applyToJob);
router.get("/mine", protect, requireRole("student"), getMyApplications);
router.get("/job/:jobId", protect, requireRole("recruiter"), getApplicantsForJob);
router.put("/:id/status", protect, requireRole("recruiter"), updateApplicationStatus);

export default router;
