import { Response } from "express";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth";

// GET /api/jobs?search=&location=&type=&page=&limit=
export const getJobs = async (req: AuthRequest, res: Response) => {
  const { search = "", location = "", type = "", page = "1", limit = "6" } = req.query;

  const filter: Record<string, unknown> = {};
  if (search) filter.title = { $regex: search as string, $options: "i" };
  if (location) filter.location = { $regex: location as string, $options: "i" };
  if (type) filter.type = type;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Job.countDocuments(filter),
  ]);

  res.json({ jobs, total, page: pageNum, totalPages: Math.ceil(total / limitNum) });
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};

// recruiter only
export const createJob = async (req: AuthRequest, res: Response) => {
  const { title, company, location, type, description, skills } = req.body;
  const job = await Job.create({
    title,
    company,
    location,
    type,
    description,
    skills,
    postedBy: req.user!.id,
  });
  res.status(201).json(job);
};

// recruiter only, and only their own job
export const updateJob = async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.postedBy.toString() !== req.user!.id) {
    return res.status(403).json({ message: "You can only edit your own jobs" });
  }
  Object.assign(job, req.body);
  await job.save();
  res.json(job);
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  if (job.postedBy.toString() !== req.user!.id) {
    return res.status(403).json({ message: "You can only delete your own jobs" });
  }
  await job.deleteOne();
  res.json({ message: "Job deleted" });
};

// recruiter dashboard: jobs they posted
export const getMyJobs = async (req: AuthRequest, res: Response) => {
  const jobs = await Job.find({ postedBy: req.user!.id }).sort({ createdAt: -1 });
  res.json(jobs);
};
