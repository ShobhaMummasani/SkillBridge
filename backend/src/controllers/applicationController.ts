import { Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth";

// student applies to a job
export const applyToJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId, resumeLink, coverNote } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = await Application.create({
      job: jobId,
      applicant: req.user!.id,
      resumeLink,
      coverNote,
    });
    res.status(201).json(application);
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "You already applied to this job" });
    }
    res.status(500).json({ message: "Could not apply", error: err.message });
  }
};

// student: my applications, with job details populated
export const getMyApplications = async (req: AuthRequest, res: Response) => {
  const applications = await Application.find({ applicant: req.user!.id })
    .populate("job")
    .sort({ createdAt: -1 });
  res.json(applications);
};

// recruiter: applicants for one of their jobs
export const getApplicantsForJob = async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.postedBy.toString() !== req.user!.id) {
    return res.status(403).json({ message: "Not your job posting" });
  }
  const applications = await Application.find({ job: req.params.jobId })
    .populate("applicant", "name email resumeLink bio")
    .sort({ createdAt: -1 });
  res.json(applications);
};

// recruiter updates an applicant's status
export const updateApplicationStatus = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate("job");
  if (!application) return res.status(404).json({ message: "Application not found" });

  const job = application.job as any;
  if (job.postedBy.toString() !== req.user!.id) {
    return res.status(403).json({ message: "Not your job posting" });
  }
  application.status = status;
  await application.save();
  res.json(application);
};
